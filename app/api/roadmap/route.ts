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
};

function cleanJsonResponse(text: string) {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function validateRoadmap(value: unknown): RoadmapResponse {
  if (!value || typeof value !== "object") {
    throw new Error("Gemini returned an invalid roadmap payload.");
  }

  const roadmap = value as Partial<RoadmapResponse>;

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
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RoadmapRequest;
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

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing in .env.local." },
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
- Recommend different skills and projects when the user profile changes.
- Keep the roadmap practical for someone following it from today.
- Return only valid JSON. Do not wrap it in Markdown.

JSON schema:
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
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const roadmap = validateRoadmap(JSON.parse(cleanJsonResponse(text)));

    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error("Roadmap API error:", error);

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
      { error: "Failed to generate a personalized roadmap." },
      { status: 500 }
    );
  }
}
