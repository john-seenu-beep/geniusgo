"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is GeniusGo?",
    answer:
      "GeniusGo is an AI-powered career copilot that helps you plan your professional growth. It generates personalized roadmaps, identifies skill gaps, recommends projects, and prepares you for interviews — all tailored to your goals.",
  },
  {
    question: "How does the AI roadmap generator work?",
    answer:
      "Simply enter your current role, target role, and available hours per day. Our AI analyzes your profile against industry requirements and creates a step-by-step roadmap with milestones, learning resources, and timelines.",
  },
  {
    question: "Is GeniusGo free to use?",
    answer:
      "GeniusGo offers a free tier to get started with basic roadmap generation. Premium plans unlock advanced features like detailed skill gap analysis, unlimited project recommendations, and full interview prep modules.",
  },
  {
    question: "What roles and industries does GeniusGo support?",
    answer:
      "GeniusGo supports a wide range of tech and business roles including software engineering, data science, product management, design, marketing, and more. Our AI adapts to any career transition you define.",
  },
  {
    question: "How accurate are the skill gap recommendations?",
    answer:
      "Our AI is trained on real job market data, industry standards, and hiring trends. Recommendations are continuously updated to reflect current demand, ensuring you focus on skills that employers actually value.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="glass-card overflow-hidden rounded-xl transition-colors hover:border-white/15"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
