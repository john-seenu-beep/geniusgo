"use client";

import React, { useState } from 'react';
import { Sparkles, Briefcase, GraduationCap, Clock, Code, Target, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

// Define types for form input
interface FormData {
  currentStatus: string;
  targetRole: string;
  currentSkills: string;
  experienceLevel: string;
}

// Define types for the generated roadmap
interface RoadmapData {
  title: string;
  thirtyDay: string[];
  ninetyDay: string[];
  skillsToLearn: string[];
  projects: { name: string; desc: string }[];
}

export default function CareerRoadmap() {
  const [formData, setFormData] = useState<FormData>({
    currentStatus: '',
    targetRole: '',
    currentSkills: '',
    experienceLevel: 'Entry Level',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulating an AI generation or API response delay
    setTimeout(() => {
      // Mocked data generation logic based on user input
      const generatedRoadmap: RoadmapData = {
        title: `${formData.targetRole} Roadmap`,
        thirtyDay: [
          `Master the core fundamentals required for ${formData.targetRole}.`,
          `Bridge the gap in your foundational knowledge base, focusing heavily on modern architectures.`,
          `Set up a professional local development workflow and version control system.`
        ],
        ninetyDay: [
          `Deep dive into advanced topics and ecosystem libraries related to ${formData.targetRole}.`,
          `Build end-to-end applications integrating authentication, databases, and deployment pipelines.`,
          `Optimize performance, write automated tests, and contribute to open-source or team projects.`
        ],
        skillsToLearn: [
          ...formData.currentSkills.split(',').map(s => s.trim() + ' (Advanced)'),
          'System Design & Architecture',
          'CI/CD Pipelines & Cloud Deployment',
          'Automated Testing (Jest/Playwright)'
        ].filter(Boolean).slice(0, 5),
        projects: [
          { 
            name: "The Capstone Ecosystem", 
            desc: `A full-stack, real-time application tailored to showcase ${formData.targetRole} capabilities, featuring clean architecture.` 
          },
          { 
            name: "Open Source Tooling Component", 
            desc: "A reusable npm package or microservice addressing a performance problem in modern web applications." 
          }
        ]
      };

      setRoadmap(generatedRoadmap);
      setLoading(false);
    }, 1200);
  };

  const resetForm = () => {
    setRoadmap(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Background decorative glow elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <main className="w-full max-w-4xl z-10 my-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> AI-Powered Career Navigator
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Architect Your Future
          </h1>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
            Input your current engineering profile to generate a highly focused, actionable step-by-step career acceleration roadmap.
          </p>
        </div>

        {!roadmap ? (
          /* INPUT FORM CARD */
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl transition-all duration-300 hover:border-slate-700/60">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Current Status */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-400" /> Current Status / Title
                  </label>
                  <input
                    type="text"
                    name="currentStatus"
                    required
                    placeholder="e.g., Junior Frontend Developer, Student"
                    value={formData.currentStatus}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Target Role */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" /> Target Role
                  </label>
                  <input
                    type="text"
                    name="targetRole"
                    required
                    placeholder="e.g., Senior Full-Stack Engineer"
                    value={formData.targetRole}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Experience Level */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" /> Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    <option value="Entry Level">Entry Level (0-1 years)</option>
                    <option value="Junior">Junior (1-3 years)</option>
                    <option value="Mid-Level">Mid-Level (3-5 years)</option>
                    <option value="Senior">Senior (5+ years)</option>
                  </select>
                </div>

                {/* Current Skills */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-400" /> Current Skills
                  </label>
                  <textarea
                    name="currentSkills"
                    required
                    rows={3}
                    placeholder="e.g., JavaScript, React, HTML, CSS (Comma-separated)"
                    value={formData.currentSkills}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Generating Custom Roadmap...
                  </>
                ) : (
                  <>
                    Generate Blueprint <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* ROADMAP RESULTS CARD */
          <div className="space-y-6 animate-fade-in">
            {/* Header / Actions Panel */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Generated Blueprint</p>
                <h2 className="text-xl font-bold text-slate-200">{roadmap.title}</h2>
              </div>
              <button
                onClick={resetForm}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:text-white px-4 py-2 rounded-lg transition-all text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" /> Build Another Roadmap
              </button>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Timeline (30 & 90 Days) */}
              <div className="md:col-span-2 space-y-6">
                
                {/* 30 Day Plan */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-cyan-500" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-xs font-bold tracking-wider uppercase">
                      Days 1-30
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">Foundation & Gap Liquidation</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {roadmap.thirtyDay.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 90 Day Plan */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-pink-500" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-bold tracking-wider uppercase">
                      Days 31-90
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">Execution & Advanced Mastery</h3>
                  </div>
                  <ul className="space-y-3.5">
                    {roadmap.ninetyDay.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar Metrics (Skills & Projects) */}
              <div className="space-y-6">
                
                {/* Skills Stack */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Code className="w-4 h-4 text-emerald-400" /> Core Target Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.skillsToLearn.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg hover:border-slate-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Projects */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Required Artifacts
                  </h3>
                  {roadmap.projects.map((project, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1">
                      <h4 className="text-sm font-bold text-indigo-300">{project.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{project.desc}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}