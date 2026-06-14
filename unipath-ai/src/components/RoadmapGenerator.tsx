import React, { useState } from 'react';
import { Screen, TransitionType, RoadmapStep } from '../types';
import { Header, BottomNav } from './Navigation';
import { Sparkles, Calendar, Check, Bell, BellOff, MessageSquare, Play, HelpCircle, Loader2 } from 'lucide-react';
import { initialRoadmapSteps } from '../data';

interface RoadmapGeneratorProps {
  onNavigate: (screen: Screen, transitionType: TransitionType) => void;
  steps: RoadmapStep[];
  onToggleStep: (stepId: string) => void;
}

export default function RoadmapGenerator({ onNavigate, steps, onToggleStep }: RoadmapGeneratorProps) {
  const [reminderSet, setReminderSet] = useState(false);

  // Calculate dynamic overall completion rate based on completed steps
  const completedCount = steps.filter(s => s.status === 'COMPLETED').length;
  const totalCount = steps.length;
  const overallPercentage = Math.round((completedCount / totalCount) * 100);

  const handleToggleReminder = () => {
    setReminderSet(!reminderSet);
    if (!reminderSet) {
      alert("Application date alert saved! We will notify you via email 30 days and 7 days prior to Oct 15.");
    }
  };

  return (
    <div className="bg-background min-h-screen text-on-surface font-sans pb-24">
      {/* Top App Bar */}
      <Header currentScreen="Roadmap Generator" onNavigate={onNavigate} />

      <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg pb-32 pt-6">
        {/* Hero Section */}
        <section className="mb-stack-lg relative overflow-hidden rounded-xl p-gutter glass-panel shadow-sm pt-8">
          <div className="relative z-10 animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>spark</span>
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest">AI Generated Plan</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-primary mb-2 tracking-tight">
              Your Path to NUS Data Science
            </h2>
            <p className="text-sm font-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              We've analyzed 4,500+ successful admissions to National University of Singapore. This optimized roadmap bridges your current Grade 12 status to a competitive Data Science candidate profile.
            </p>
          </div>
          <div className="absolute -right-10 -top-10 opacity-10 pointer-events-none text-primary">
            <span className="material-symbols-outlined text-[160px]">school</span>
          </div>
        </section>

        {/* Progress Overview Section */}
        <div className="mb-stack-lg grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 flex flex-col gap-1 shadow-xs">
            <span className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider">Overall Completion</span>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-display font-bold text-primary">{overallPercentage}%</span>
              <span className="text-xs font-mono text-secondary mb-1 uppercase font-bold tracking-wider">On Track</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2">
              <div 
                className="bg-secondary h-full rounded-full transition-all duration-1000" 
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 flex flex-col gap-1 shadow-xs">
            <span className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider">Next Milestone</span>
            <span className="text-sm font-bold text-on-surface">Kaggle Competition</span>
            <span className="text-xs font-mono text-on-surface-variant font-medium italic">Due in 14 days</span>
          </div>

          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 flex flex-col gap-1 shadow-xs">
            <span className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider">AI Confidence</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-on-surface">High (89%)</span>
              <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <span className="text-xs font-mono text-on-surface-variant font-medium">Based on profile match</span>
          </div>
        </div>

        {/* Vertical Timeline Roadmap */}
        <div className="relative pl-8 md:pl-12 mt-8">
          {/* Continuous Line */}
          <div className="absolute left-4 md:left-6 top-4 bottom-4 w-1 bg-gradient-to-b from-primary to-secondary-container rounded-full opacity-20"></div>

          {steps.map((step) => {
            const isCompleted = step.status === 'COMPLETED';
            
            // Icon customization
            let nodeIcon = <span className="material-symbols-outlined text-sm md:text-base">check</span>;
            let themeClass = "bg-primary text-on-primary border-primary ring-primary/20";
            
            if (step.stepNumber === 2) {
              nodeIcon = <span className="material-symbols-outlined text-sm md:text-base" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>;
              themeClass = "bg-secondary-container text-on-secondary-container border-secondary ring-secondary/20";
            } else if (!isCompleted) {
              themeClass = "bg-surface-container-highest text-outline border-outline-variant";
            }

            if (step.id === 'step-3') {
              nodeIcon = <span className="material-symbols-outlined text-sm md:text-base">analytics</span>;
            } else if (step.id === 'step-4') {
              nodeIcon = <span className="material-symbols-outlined text-sm md:text-base">emoji_events</span>;
            } else if (step.id === 'step-5') {
              nodeIcon = <span className="material-symbols-outlined text-sm md:text-base">biotech</span>;
            } else if (step.id === 'step-6') {
              nodeIcon = <span className="material-symbols-outlined text-sm md:text-base">web</span>;
            }

            return (
              <div key={step.id} className="relative mb-12 animate-fadeIn">
                {/* Node circle */}
                <div className={`absolute -left-8 md:-left-12 top-1 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10 border-4 border-background ring-4 ${themeClass}`}>
                  {isCompleted ? <span className="material-symbols-outlined text-sm md:text-base">check</span> : nodeIcon}
                </div>

                {/* Card Container */}
                {step.aiRecommended ? (
                  // Custom AI recommendation card styling
                  <div className="glass-panel p-stack-md rounded-xl border border-secondary/20 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-secondary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>sparkle</span>
                      <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest">AI Recommended Hack</span>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-mono text-on-surface-variant font-bold uppercase tracking-wide">Research</span>
                        <h3 className="text-lg font-display font-bold text-on-surface">{step.title}</h3>
                      </div>
                      <button 
                        onClick={() => onToggleStep(step.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                          isCompleted 
                            ? 'bg-green-100 text-green-700 pointer-events-none' 
                            : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        {isCompleted ? "Completed" : "Complete"}
                      </button>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                  </div>
                ) : (
                  // Normal card styling
                  <div className={`p-stack-md rounded-xl border border-outline-variant/30 shadow-xs transition-all hover:shadow-sm ${
                    isCompleted 
                      ? 'bg-surface-container-lowest/70' 
                      : 'bg-surface-container-lowest border-l-4 border-l-secondary shadow-sm'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className={`text-xs font-mono font-bold uppercase tracking-wide ${isCompleted ? 'text-primary' : 'text-secondary'}`}>
                          {step.type}
                        </span>
                        <h3 className={`text-lg font-display font-bold ${isCompleted ? 'text-on-surface/70' : 'text-on-surface'}`}>{step.title}</h3>
                      </div>
                      
                      <button 
                        onClick={() => onToggleStep(step.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                          isCompleted 
                            ? 'bg-primary/10 text-primary pointer-events-none' 
                            : 'bg-primary text-white hover:bg-primary-container'
                        }`}
                      >
                        {isCompleted ? "Completed" : "Complete"}
                      </button>
                    </div>
                    
                    {step.progress && !isCompleted && (
                      <div className="space-y-3 my-3">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-on-surface-variant">Course Progress: Harvard CS50</span>
                          <span className="font-bold text-primary">{step.progress}%</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-primary to-secondary h-full" style={{ width: `${step.progress}%` }}></div>
                        </div>
                      </div>
                    )}

                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {step.desc}
                    </p>

                    {step.tags && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {step.tags.map(t => (
                          <span key={t} className="bg-surface-container text-on-surface-variant text-[10px] font-bold tracking-wider rounded px-2.5 py-1 uppercase font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Goal Achievement - Oct 15 */}
          <div className="relative animate-fadeIn">
            <div className="absolute -left-8 md:-left-12 top-1 w-8 h-8 md:w-12 md:h-12 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center z-10 border-4 border-background shadow-lg">
              <span className="material-symbols-outlined text-sm md:text-base">send</span>
            </div>
            <div className="bg-primary text-white p-gutter rounded-xl shadow-lg border border-primary-container">
              <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-primary-fixed uppercase tracking-wider">Goal Achievement</span>
                  <h3 className="text-xl font-display font-extrabold text-white mt-1 leading-tight">
                    Apply: Application window opens Oct 15
                  </h3>
                </div>
                <div className="text-right sm:self-center pr-4">
                  <span className="block text-4xl font-display font-extrabold leading-none text-secondary-container">124</span>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-primary-fixed opacity-80">Days Left</span>
                </div>
              </div>

              <button 
                onClick={handleToggleReminder}
                className="w-full mt-6 bg-white text-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-surface-bright active:scale-[0.98] transition-all cursor-pointer"
              >
                {reminderSet ? "Reminder Saved" : "Set Reminder"}
                {reminderSet ? <BellOff className="w-4 h-4 text-primary" /> : <Bell className="w-4 h-4 text-primary" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mentorship Upsell Card */}
        <div className="mt-stack-lg p-gutter rounded-xl bg-gradient-to-br from-primary-container via-primary-container to-secondary overflow-hidden relative group shadow-md text-white">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-gutter">
            <div className="text-center md:text-left">
              <h4 className="text-xl font-display font-bold text-white mb-2">Stuck on your roadmap?</h4>
              <p className="text-primary-fixed-dim text-sm max-w-lg leading-relaxed">
                Connect with a current NUS Data Science senior for a 30-min strategy call. Get personalized tips on personal statement crafting!
              </p>
            </div>
            <button 
              onClick={() => alert("Searching for active NUS Data Science mentors online... Found 2 matches. Scheduling invitation sent.")}
              className="bg-secondary-container text-on-secondary-container hover:shadow-lg border.5 border-transparent hover:border-white px-gutter py-3 rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider font-mono cursor-pointer"
            >
              Find a Mentor
            </button>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        </div>
      </main>

      {/* Embedded Nav */}
      <BottomNav currentScreen="Roadmap Generator" onNavigate={onNavigate} />
    </div>
  );
}
