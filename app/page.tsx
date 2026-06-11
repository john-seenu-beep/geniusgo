import Navbar from "./components/Navbar";
import HeroForm from "./components/HeroForm";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section
          id="hero"
          className="relative min-h-screen overflow-hidden pt-16"
        >
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0 grid-bg" />
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px] animate-pulse-glow" />
          <div className="pointer-events-none absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/15 blur-[100px] animate-float" />
          <div className="pointer-events-none absolute bottom-0 -left-32 h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[100px] animate-float animate-delay-300" />

          <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                </span>
                Your AI Career Copilot
              </div>

              <h1 className="animate-fade-in-up animate-delay-100 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Accelerate Your Career{" "}
                <span className="gradient-text">With AI</span>
              </h1>

              <p className="animate-fade-in-up animate-delay-200 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
                Generate personalized career roadmaps, identify skill gaps,
                discover projects, and prepare for interviews using AI.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-4xl">
              <HeroForm />
            </div>

            {/* Social proof */}
            <div className="animate-fade-in animate-delay-500 mx-auto mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-zinc-600">
              <span>Trusted by professionals at</span>
              <div className="flex flex-wrap items-center justify-center gap-6 font-semibold tracking-wide text-zinc-500">
                <span>Google</span>
                <span className="hidden sm:inline">·</span>
                <span>Meta</span>
                <span className="hidden sm:inline">·</span>
                <span>Amazon</span>
                <span className="hidden sm:inline">·</span>
                <span>Microsoft</span>
              </div>
            </div>
          </div>
        </section>

        <Features />
        <HowItWorks />
        <FAQ />

        {/* CTA Banner */}
        <section className="relative py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/20 via-background to-cyan-600/20 p-px">
              <div className="relative rounded-[calc(1.5rem-1px)] bg-background/80 px-8 py-16 text-center backdrop-blur-xl sm:px-16">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5" />
                <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to transform your career?
                </h2>
                <p className="relative mx-auto mt-4 max-w-xl text-zinc-400">
                  Join thousands of professionals using GeniusGo to reach their
                  career goals faster.
                </p>
                <a
                  href="#hero"
                  className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:brightness-110"
                >
                  Generate My Roadmap
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
