import HeroForm from "./HeroForm";

export default function CareerRoadmap() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300">
            AI Career Roadmap Generator
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Build your personalized{" "}
            <span className="gradient-text">career roadmap</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Share your goal, skills, experience level, and timeline. GeniusGo
            will create a custom 30-day and 90-day plan using Gemini.
          </p>
        </div>

        <HeroForm />
      </div>
    </main>
  );
}
