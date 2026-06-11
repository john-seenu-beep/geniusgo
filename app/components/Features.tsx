const features = [
  {
    title: "Career Roadmap Generator",
    description:
      "Get a step-by-step plan tailored to your current skills, target role, and available time.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
      />
    ),
    gradient: "from-violet-500/20 to-violet-600/5",
    iconColor: "text-violet-400",
  },
  {
    title: "Skill Gap Analyzer",
    description:
      "Instantly identify the skills you need to develop and prioritize what matters most.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
      />
    ),
    gradient: "from-cyan-500/20 to-cyan-600/5",
    iconColor: "text-cyan-400",
  },
  {
    title: "Project Recommender",
    description:
      "Discover hands-on projects that build real-world experience and strengthen your portfolio.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m2.5 0a48.255 48.255 0 01-3.413-.387 4.5 4.5 0 00-3.976 0 48.255 48.255 0 01-3.413.387c-1.07.16-1.837 1.094-1.837 2.175v3.783a2.18 2.18 0 00.75 1.661m16.5 0h.008v.008h-.008V14.15zm-3.375 0h.008v.008h-.008V14.15z"
      />
    ),
    gradient: "from-fuchsia-500/20 to-fuchsia-600/5",
    iconColor: "text-fuchsia-400",
  },
  {
    title: "Interview Preparation",
    description:
      "Practice with AI-generated questions, mock scenarios, and feedback to ace your interviews.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    ),
    gradient: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to{" "}
            <span className="gradient-text">level up</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Powerful AI tools designed to accelerate every stage of your career
            journey.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card rounded-2xl p-6 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] sm:p-8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3 ring-1 ring-white/10`}
              >
                <svg
                  className={`h-6 w-6 ${feature.iconColor}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
