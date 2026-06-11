"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type CurrentStatus = "student" | "professional" | "switcher";
type ExperienceLevel = "beginner" | "intermediate" | "advanced";
type FormState = "idle" | "loading" | "result";

const currentStatusOptions: { value: CurrentStatus; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "professional", label: "Working Professional" },
  { value: "switcher", label: "Career Switcher" },
];

const experienceLevelOptions: { value: ExperienceLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50";

const labelClassName =
  "block text-xs font-medium uppercase tracking-wider text-zinc-500";

function LoadingSpinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function RoadmapResultCard() {
  return (
    <div className="glass-card animate-fade-in mt-6 rounded-2xl p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 ring-1 ring-violet-500/30">
          <svg
            className="h-5 w-5 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Your Career Roadmap</h3>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-violet-300">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/20 text-xs font-bold text-violet-400">
              30
            </span>
            30-Day Plan
          </h4>
          <ul className="space-y-3">
            {["Learn fundamentals", "Complete one project"].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-zinc-300"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/20 text-xs font-bold text-cyan-400">
              90
            </span>
            90-Day Plan
          </h4>
          <ul className="space-y-3">
            {["Build portfolio", "Prepare for interviews"].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-zinc-300"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function HeroForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [currentStatus, setCurrentStatus] = useState<CurrentStatus>("student");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("beginner");
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");

    loadingTimeoutRef.current = setTimeout(() => {
      setFormState("result");
    }, 1500);
  }

  const isLoading = formState === "loading";
  const showResult = formState === "result";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="glass-card animate-fade-in-up animate-delay-400 rounded-2xl p-6 sm:p-8"
      >
        <div className="space-y-6">
          {/* Current Status */}
          <fieldset
            disabled={isLoading}
            className="min-w-0 space-y-3 border-0 p-0"
          >
            <legend className={labelClassName}>Current Status</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {currentStatusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    currentStatus === option.value
                      ? "border-violet-500/50 bg-violet-500/10 text-white ring-2 ring-violet-500/20"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="currentStatus"
                    value={option.value}
                    checked={currentStatus === option.value}
                    onChange={() => setCurrentStatus(option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Target Role */}
          <div className="space-y-2">
            <label htmlFor="target-role" className={labelClassName}>
              Target Role
            </label>
            <input
              id="target-role"
              name="targetRole"
              type="text"
              required
              disabled={isLoading}
              placeholder="e.g. Senior Software Engineer"
              className={inputClassName}
            />
          </div>

          {/* Current Skills */}
          <div className="space-y-2">
            <label htmlFor="current-skills" className={labelClassName}>
              Current Skills
            </label>
            <textarea
              id="current-skills"
              name="currentSkills"
              required
              rows={4}
              disabled={isLoading}
              placeholder="e.g. JavaScript, React, HTML/CSS, basic Git..."
              className={`${inputClassName} resize-none`}
            />
          </div>

          {/* Experience Level */}
          <fieldset
            disabled={isLoading}
            className="min-w-0 space-y-3 border-0 p-0"
          >
            <legend className={labelClassName}>Experience Level</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {experienceLevelOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    experienceLevel === option.value
                      ? "border-cyan-500/50 bg-cyan-500/10 text-white ring-2 ring-cyan-500/20"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="experienceLevel"
                    value={option.value}
                    checked={experienceLevel === option.value}
                    onChange={() => setExperienceLevel(option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group relative mt-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <LoadingSpinner />
                Generating Roadmap...
              </>
            ) : (
              <>
                Generate Roadmap
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </>
            )}
          </span>
          {!isLoading && (
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          )}
        </button>
      </form>

      {showResult && <RoadmapResultCard />}
    </div>
  );
}
