"use client";

import { FormEvent, useState } from "react";

export default function HeroForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="glass-card animate-fade-in rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 ring-1 ring-violet-500/30">
          <svg
            className="h-7 w-7 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">
          Roadmap generation started!
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          Our AI is analyzing your profile. Your personalized career roadmap
          will be ready shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card animate-fade-in-up animate-delay-400 rounded-2xl p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label
            htmlFor="current-role"
            className="block text-xs font-medium uppercase tracking-wider text-zinc-500"
          >
            Current Role
          </label>
          <input
            id="current-role"
            name="currentRole"
            type="text"
            required
            placeholder="e.g. Junior Developer"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="target-role"
            className="block text-xs font-medium uppercase tracking-wider text-zinc-500"
          >
            Target Role
          </label>
          <input
            id="target-role"
            name="targetRole"
            type="text"
            required
            placeholder="e.g. Senior Engineer"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="hours"
            className="block text-xs font-medium uppercase tracking-wider text-zinc-500"
          >
            Hours Available Per Day
          </label>
          <input
            id="hours"
            name="hours"
            type="number"
            min={1}
            max={24}
            required
            placeholder="e.g. 2"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>
      </div>

      <button
        type="submit"
        className="group relative mt-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Generate My Roadmap
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </span>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    </form>
  );
}
