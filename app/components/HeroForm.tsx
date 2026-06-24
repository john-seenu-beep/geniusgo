"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  GraduationCap,
  Loader2,
  RefreshCw,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

type CurrentStatus = "Student" | "Working Professional" | "Career Switcher";
type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";

type Roadmap = {
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

const currentStatusOptions: CurrentStatus[] = [
  "Student",
  "Working Professional",
  "Career Switcher",
];

const experienceLevelOptions: ExperienceLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-60";

const labelClassName =
  "flex items-center gap-2 text-xs font-semibold uppercase text-zinc-400";

function PlanCard({
  title,
  icon,
  items,
  accent,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
  accent: string;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20">
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <span>{item}</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-zinc-400">No plan items were returned for this case.</li>
        )}
      </ul>
    </section>
  );
}

function RoadmapResults({
  roadmap,
  onReset,
}: {
  roadmap: Roadmap;
  onReset: () => void;
}) {
  const readinessColor =
    roadmap.estimatedHiringReadinessScore >= 75
      ? "from-emerald-400 to-cyan-400"
      : roadmap.estimatedHiringReadinessScore >= 50
        ? "from-amber-400 to-orange-400"
        : "from-rose-400 to-red-500";

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
      <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6 shadow-2xl shadow-cyan-950/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              Personalized by Gemini
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {roadmap.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
              {roadmap.summary}
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" />
            New Roadmap
          </button>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Hiring Readiness</h3>
              <p className="text-sm text-zinc-400">Estimated score from Gemini</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-end justify-between">
              <span className="text-3xl font-semibold text-white">
                {roadmap.estimatedHiringReadinessScore}/100
              </span>
              <span className="text-sm text-zinc-400">
                {roadmap.isRealistic === false ? "Needs more time" : "On track"}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${readinessColor}`}
                style={{ width: `${roadmap.estimatedHiringReadinessScore}%` }}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Reality Check</h3>
              <p className="text-sm text-zinc-400">Timeline realism from Gemini</p>
            </div>
          </div>
          {roadmap.isRealistic === false ? (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
              <p className="font-semibold">This target looks too ambitious for the selected timeline.</p>
              <p className="mt-2">{roadmap.reason}</p>
              <p className="mt-2">
                Recommended duration: <span className="font-semibold">{roadmap.recommendedDuration}</span>
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-100">
              The plan is designed to be practical for your chosen timeline and current profile.
            </div>
          )}
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <PlanCard
          title="30 Day Plan"
          icon={<Clock className="h-5 w-5 text-cyan-200" />}
          items={roadmap.thirtyDayPlan}
          accent="bg-cyan-500/15 text-cyan-300"
        />
        <PlanCard
          title="90 Day Plan"
          icon={<Rocket className="h-5 w-5 text-violet-200" />}
          items={roadmap.ninetyDayPlan}
          accent="bg-violet-500/15 text-violet-300"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Skills To Learn</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {roadmap.skillsToLearn.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Recommended Projects</h3>
          </div>
          <div className="space-y-4">
            {roadmap.recommendedProjects.map((project) => (
              <article
                key={project.name}
                className="rounded-xl border border-white/10 bg-black/15 p-4"
              >
                <h4 className="font-semibold text-white">{project.name}</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.skillsPracticed.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function HeroForm() {
  const [currentStatus, setCurrentStatus] =
    useState<CurrentStatus>("Student");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("Beginner");
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [duration, setDuration] = useState("90 days");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setRoadmap(null);

    const payload = {
      currentStatus,
      targetRole,
      currentSkills,
      experienceLevel,
      duration,
    };

    console.log("[Roadmap Form] Before fetch:", payload);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      console.log("[Roadmap Form] After fetch:", response);

      const data = await response.json();
      console.log("[Roadmap Form] After response.json():", data);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate roadmap.");
      }

      if (!data?.roadmap) {
        throw new Error("The API did not return a roadmap payload.");
      }

      setRoadmap(data.roadmap);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("The roadmap request timed out. Please try again.");
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to generate a personalized roadmap."
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  const isFormIncomplete =
    !targetRole.trim() || !currentSkills.trim() || !duration.trim();

  return (
    <div className="mx-auto w-full max-w-5xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <fieldset disabled={loading} className="space-y-3 border-0 p-0">
            <legend className={labelClassName}>
              <GraduationCap className="h-4 w-4 text-cyan-300" />
              Current Status
            </legend>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {currentStatusOptions.map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    currentStatus === option
                      ? "border-cyan-400/50 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="currentStatus"
                    value={option}
                    checked={currentStatus === option}
                    onChange={() => setCurrentStatus(option)}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset disabled={loading} className="space-y-3 border-0 p-0">
            <legend className={labelClassName}>
              <Target className="h-4 w-4 text-violet-300" />
              Experience Level
            </legend>
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {experienceLevelOptions.map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    experienceLevel === option
                      ? "border-violet-400/50 bg-violet-400/10 text-white"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={option}
                    checked={experienceLevel === option}
                    onChange={() => setExperienceLevel(option)}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <label htmlFor="target-role" className={labelClassName}>
              <Target className="h-4 w-4 text-emerald-300" />
              Target Role
            </label>
            <input
              id="target-role"
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="AI Engineer, Data Analyst, Full Stack Developer"
              disabled={loading}
              className={inputClassName}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="duration" className={labelClassName}>
              <Clock className="h-4 w-4 text-amber-300" />
              Timeline
            </label>
            <input
              id="duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="30 days, 90 days, 6 months"
              disabled={loading}
              className={inputClassName}
              required
            />
          </div>

          <div className="space-y-2 lg:col-span-2">
            <label htmlFor="current-skills" className={labelClassName}>
              <BookOpen className="h-4 w-4 text-cyan-300" />
              Current Skills
            </label>
            <textarea
              id="current-skills"
              value={currentSkills}
              onChange={(event) => setCurrentSkills(event.target.value)}
              placeholder="JavaScript basics, HTML, CSS, Python beginner, communication skills..."
              rows={4}
              disabled={loading}
              className={`${inputClassName} resize-none`}
              required
            />
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || isFormIncomplete}
          className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Personalized Roadmap...
            </>
          ) : (
            <>
              Generate Custom Roadmap
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {roadmap && (
        <RoadmapResults roadmap={roadmap} onReset={() => setRoadmap(null)} />
      )}
    </div>
  );
}
