import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

type RoadmapRequest = {
  currentStatus?: string;
  targetRole?: string;
  currentSkills?: string;
  experienceLevel?: string;
  duration?: string;
};

type RoadmapResponse = {
  title: string;
  summary: string;
  thirtyDayPlan: string[];
  ninetyDayPlan: string[];
  skillsToLearn: string[];
  recommendedProjects: {
    name: string;
    description: string;
    skillsPracticed: string[];
  }[];
  estimatedHiringReadinessScore: number;
  isRealistic?: boolean;
  reason?: string;
  recommendedDuration?: string;
};

function cleanJsonResponse(text: string) {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function parseGeminiJson(text: string) {
  const cleaned = cleanJsonResponse(text);
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    throw new Error("Gemini response did not include a JSON object.");
  }

  const candidate = cleaned.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(candidate);
  } catch (error) {
    console.error("[Roadmap API] Failed to parse Gemini JSON payload:", error);
    throw new Error("Gemini returned a malformed JSON payload.");
  }
}

function validateRoadmap(value: unknown): RoadmapResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Gemini returned an invalid roadmap payload.");
  }

  const roadmap = value as Partial<RoadmapResponse>;

  if (roadmap.isRealistic === false) {
    return {
      title:
        typeof roadmap.title === "string"
          ? roadmap.title
          : "Roadmap is not realistic for this timeline",
      summary:
        typeof roadmap.summary === "string"
          ? roadmap.summary
          : "This goal needs a longer timeline to be approached realistically.",
      thirtyDayPlan: [],
      ninetyDayPlan: [],
      skillsToLearn: [],
      recommendedProjects: [],
      estimatedHiringReadinessScore: 0,
      isRealistic: false,
      reason:
        typeof roadmap.reason === "string"
          ? roadmap.reason
          : "The selected timeline is too short for this goal.",
      recommendedDuration:
        typeof roadmap.recommendedDuration === "string"
          ? roadmap.recommendedDuration
          : "6 months",
    };
  }

  if (
    typeof roadmap.title !== "string" ||
    typeof roadmap.summary !== "string" ||
    !Array.isArray(roadmap.thirtyDayPlan) ||
    !Array.isArray(roadmap.ninetyDayPlan) ||
    !Array.isArray(roadmap.skillsToLearn) ||
    !Array.isArray(roadmap.recommendedProjects)
  ) {
    throw new Error("Gemini roadmap payload is missing required sections.");
  }

  return {
    title: roadmap.title,
    summary: roadmap.summary,
    thirtyDayPlan: roadmap.thirtyDayPlan.map(String),
    ninetyDayPlan: roadmap.ninetyDayPlan.map(String),
    skillsToLearn: roadmap.skillsToLearn.map(String),
    recommendedProjects: roadmap.recommendedProjects.map((project) => ({
      name:
        typeof project?.name === "string"
          ? project.name
          : "Recommended project",
      description:
        typeof project?.description === "string"
          ? project.description
          : "Build a project that proves the skills in this roadmap.",
      skillsPracticed: Array.isArray(project?.skillsPracticed)
        ? project.skillsPracticed.map(String)
        : [],
    })),
    estimatedHiringReadinessScore:
      typeof roadmap.estimatedHiringReadinessScore === "number"
        ? Math.max(0, Math.min(100, Math.round(roadmap.estimatedHiringReadinessScore)))
        : 0,
    isRealistic: true,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RoadmapRequest;
    console.log("[Roadmap API] Received request body:", body);

    const {
      currentStatus,
      targetRole,
      currentSkills,
      experienceLevel,
      duration,
    } = body;

    if (
      !currentStatus?.trim() ||
      !targetRole?.trim() ||
      !currentSkills?.trim() ||
      !experienceLevel?.trim() ||
      !duration?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Current status, target role, current skills, experience level, and timeline are required.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "A Gemini API key is missing. Set GEMINI_API_KEY or GOOGLE_API_KEY in your environment.",
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    });

    const prompt = `
You are GeniusGo, an expert AI career mentor.

Create a personalized career roadmap for this exact user profile:

Current status: ${currentStatus}
Target role: ${targetRole}
Current skills: ${currentSkills}
Experience level: ${experienceLevel}
Timeline: ${duration}

Rules:
- Do not return a generic roadmap.
- Use the user's exact current status, skills, target role, level, and timeline.
- Make the roadmap noticeably different for different users and different goals.
- Keep the roadmap practical and realistic for someone following it from today.
- Consider whether the goal is realistic for the selected timeline. If the goal is unrealistic, return a JSON object with:
  {
    "isRealistic": false,
    "reason": "why it is unrealistic",
    "recommendedDuration": "a more realistic timeline"
  }
- Use these realism checks:
  - Product Manager in 90 days = realistic.
  - Doctor in 90 days = unrealistic.
  - Pilot in 30 days = unrealistic.
  - Software Engineer in 6 months = realistic.
- If the plan is realistic, return a roadmap with:
  {
    "title": "short personalized roadmap title",
    "summary": "2 sentence summary personalized to the user",
    "thirtyDayPlan": ["5 specific actions for days 1-30"],
    "ninetyDayPlan": ["5 specific actions for days 31-90"],
    "skillsToLearn": ["6 specific skills or tools"],
    "recommendedProjects": [
      {
        "name": "project name",
        "description": "what to build and why it helps this target role",
        "skillsPracticed": ["skill 1", "skill 2", "skill 3"]
      }
    ],
    "estimatedHiringReadinessScore": 0-100
  }
- Return only JSON. Do not wrap it in Markdown and do not include extra prose.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log("[Roadmap API] Gemini raw response:", text);

    const parsed = parseGeminiJson(text);
    const roadmap = validateRoadmap(parsed);

    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error("[Roadmap API] Roadmap error:", error);

    const message = error instanceof Error ? error.message : "";

    if (message.includes("API key not valid")) {
      return NextResponse.json(
        {
          error:
            "Your GEMINI_API_KEY is invalid. Create a new Gemini API key, update .env.local, and restart npm run dev.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error:
          message || "Failed to generate a personalized roadmap.",
      },
      { status: 500 }
    );
  }
}
