const steps = [
  {
    number: "01",
    title: "Enter career goal",
    description:
      "Tell us your current role, target position, and how much time you can invest each day.",
  },
  {
    number: "02",
    title: "AI analyzes profile",
    description:
      "Our AI evaluates your skills, experience, and goals to build a personalized strategy.",
  },
  {
    number: "03",
    title: "Get roadmap instantly",
    description:
      "Receive a detailed career roadmap with milestones, projects, and interview prep.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-400">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three steps to your{" "}
            <span className="gradient-text">dream career</span>
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/50 to-transparent sm:left-1/2 sm:block sm:-translate-x-1/2" />

          <div className="space-y-12 sm:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col gap-6 sm:flex-row sm:items-center ${
                  index % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex-1 ${index % 2 === 1 ? "sm:text-right" : ""}`}
                >
                  <div
                    className={`glass-card rounded-2xl p-6 sm:p-8 ${
                      index % 2 === 1 ? "sm:ml-auto" : "sm:mr-auto"
                    } max-w-md`}
                  >
                    <span className="text-xs font-mono font-medium text-violet-400">
                      Step {step.number}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mx-8 hidden sm:flex sm:w-16 sm:shrink-0 sm:items-center sm:justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 text-sm font-bold text-white shadow-lg shadow-violet-500/30 ring-4 ring-background">
                    {index + 1}
                  </div>
                </div>

                <div className="hidden flex-1 sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
