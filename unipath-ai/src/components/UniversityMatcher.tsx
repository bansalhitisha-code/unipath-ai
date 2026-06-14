import React, { useState } from 'react';
import { Screen, TransitionType } from '../types';
import { Header, BottomNav } from './Navigation';
import { Info, HelpCircle, CheckCircle2, TrendingUp, Sparkles, Award, MapPin, ChevronRight, ArrowRight, PlusCircle, Check } from 'lucide-react';

interface UniversityMatcherProps {
  onNavigate: (screen: Screen, transitionType: TransitionType) => void;
  grades: string;
  subjects: string;
  maxBudget: number;
}

export default function UniversityMatcher({ onNavigate, grades, subjects, maxBudget }: UniversityMatcherProps) {
  // Tooltip visibility state
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const toggleTooltip = (key: string) => {
    setActiveTooltip(activeTooltip === key ? null : key);
  };

  return (
    <div className="bg-background min-h-screen text-on-surface font-sans pb-24">
      {/* Top App Bar */}
      <Header currentScreen="University Matcher" onNavigate={onNavigate} />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-32 pt-8">
        {/* Section 1: Input Summary (Asymmetric Bento Style) */}
        <section className="mb-stack-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8 glass-panel p-gutter rounded-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-9xl">analytics</span>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-primary mb-4">Your Profile Strength</h2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-lg border border-outline-variant/30">
                    <span className="material-symbols-outlined text-primary">grade</span>
                    <div>
                      <p className="text-xs font-mono font-semibold text-on-surface-variant uppercase tracking-wider">Grades</p>
                      <p className="text-sm font-bold text-primary">{grades}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-lg border border-outline-variant/30">
                    <span className="material-symbols-outlined text-secondary">menu_book</span>
                    <div>
                      <p className="text-xs font-mono font-semibold text-on-surface-variant uppercase tracking-wider">Subjects</p>
                      <p className="text-sm font-bold text-secondary">{subjects}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-lg border border-outline-variant/30">
                    <span className="material-symbols-outlined text-on-tertiary-fixed-variant">payments</span>
                    <div>
                      <p className="text-xs font-mono font-semibold text-on-surface-variant uppercase tracking-wider">Max Budget</p>
                      <p className="text-sm font-bold text-on-tertiary-fixed-variant">${maxBudget.toLocaleString()} /yr</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-primary-container text-on-primary-container p-gutter rounded-xl flex flex-col justify-between shadow-md">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-primary-fixed-dim opacity-90 mb-2">
                  AI Matching Status
                </p>
                <h3 className="text-2xl font-display font-bold leading-tight text-white">Engine Optimized</h3>
              </div>
              <div className="mt-4">
                <div className="h-2.5 w-full bg-on-primary-container/20 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-secondary-container w-[92%] transition-all duration-1000"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite'
                    }}
                  ></div>
                </div>
                <p className="text-xs font-mono text-primary-fixed-dim mt-2 font-bold uppercase tracking-wider">
                  92% Profile Completeness
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Results Categories */}
        <div className="space-y-stack-lg">
          {/* Reach Schools */}
          <section>
            <div className="flex items-center justify-between mb-stack-md pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error">trending_up</span>
                <h2 className="text-xl font-display font-bold text-on-surface">Reach Schools</h2>
              </div>
              <span className="text-xs font-mono text-on-surface-variant font-bold uppercase tracking-wider">
                Competitive ( &lt; 15% Admit )
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* MIT Card */}
              <div className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden ai-glow-hover transition-all duration-300 shadow-sm">
                <div className="h-40 overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt="MIT" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn_ke9ZHlp5uAoQZi0GB1Zp2Xe6zlTQYp0qTeqaEhwdeRMKFFHqpIdAlOfcowaXzEVLL5BIg5A7YREivWvE7R4EeSQL1ZBZfdUgGUefn6UmOILl-l66iqnZmUSpJ5_OuPKXJ2GF1CMHq6cHKficzbHpXlG2SNNhuQu2Ead5zOqIo7QBFWef0S-PTHd_5yzRJv3QgNHkzUcLZD-FuV-t_4eCt5hNV89oqd--s-Z55ibMYJabbgbeYqOQcd1CCIucLzPp_4jLcmhAmDA" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-primary/95 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md">
                    78% Match
                  </div>
                </div>
                <div className="p-gutter">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-display font-bold text-primary">MIT</h3>
                      <p className="text-sm font-mono text-on-surface-variant">Cambridge, MA</p>
                    </div>
                    <button 
                      onClick={() => toggleTooltip('mit-logic')}
                      className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer"
                      title="AI Logic Explanation"
                    >
                      <span className="material-symbols-outlined text-primary text-sm">info</span>
                    </button>
                  </div>

                  {/* AI Logic Tooltip */}
                  {activeTooltip === 'mit-logic' && (
                    <div className="mb-4 p-4 rounded-lg bg-primary-container/10 border-l-4 border-primary glass-panel transition-all animate-fadeIn">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-sm text-primary">spark</span>
                        <p className="text-xs font-mono font-bold text-primary tracking-wider uppercase">AI Analysis</p>
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                        Your A* in Physics and CS project on 'Quantum Logic' perfectly aligns with MIT’s freshman research track. Financial gap covered by merit scholarship projection.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-secondary-container/10 text-secondary text-xs rounded-md font-bold uppercase font-mono">
                      Research Tier 1
                    </span>
                    <span className="px-2 py-1 bg-secondary-container/10 text-secondary text-xs rounded-md font-bold uppercase font-mono">
                      QS Rank #1
                    </span>
                  </div>
                </div>
              </div>

              {/* NUS Card (NAVIGATES TO ROADMAP GENERATOR ON CLICK) */}
              <div 
                onClick={() => onNavigate('Roadmap Generator', 'push')}
                className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden ai-glow-hover transition-all duration-300 shadow-sm cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt="NUS" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt257BfIUY5kXrfwmfZoYI3PRPSZnTF99B5mtVvpULgLozF7Zd3yAMVZajjriizLeXYgbWrr02BarqOTChz71G4aHOJ72z_rcWNhyfZNFCfPei-lgHTKcYpSjgKokqg9ZWNyT12Qqv2JRPdSg1g4ViiU8EBMOU42ixowEL_lcRD0Sn0YLl9LqLuERc6uGaqKu0GbBV7WmbQoLmLEg0kMRFd5sKbIxy5SHGeF4EpMO8v9hrN46LTI27U3UqIXhq0PKcjXD2rzKrmbLR" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-primary/95 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md">
                    82% Match
                  </div>
                </div>
                <div className="p-gutter">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {/* Strictly layout exact NUS matching h3 and class group ancestor */}
                      <h3 className="text-xl font-display font-bold text-primary">NUS</h3>
                      <p className="text-sm font-mono text-on-surface-variant">Singapore</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleTooltip('nus-logic'); }}
                      className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer"
                      title="AI Logic Explanation"
                    >
                      <span className="material-symbols-outlined text-primary text-sm">info</span>
                    </button>
                  </div>

                  {/* AI Logic Tooltip */}
                  {activeTooltip === 'nus-logic' && (
                    <div className="mb-4 p-4 rounded-lg bg-primary-container/10 border-l-4 border-primary glass-panel transition-all animate-fadeIn">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-sm text-primary">spark</span>
                        <p className="text-xs font-mono font-bold text-primary tracking-wider uppercase">AI Analysis</p>
                      </div>
                      <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                        Exceptional fit for the CS & Business double degree. Budget aligns well with ASEAN tuition grants for international applicants with your grade profile. Click card to view custom roadmap.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-secondary-container/10 text-secondary text-xs rounded-md font-bold uppercase font-mono">
                      Global Leader
                    </span>
                    <span className="px-2 py-1 bg-secondary-container/10 text-secondary text-xs rounded-md font-bold uppercase font-mono">
                      Tech Hub
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Target Schools */}
          <section>
            <div className="flex items-center justify-between mb-stack-md pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check_circle</span>
                <h2 className="text-xl font-display font-bold text-on-surface">Target Schools</h2>
              </div>
              <span className="text-xs font-mono text-on-surface-variant font-bold uppercase tracking-wider">
                High Probability ( 30-50% Admit )
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {/* Georgia Tech Card */}
              <div className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden ai-glow-hover transition-all duration-300 md:col-span-2 shadow-sm">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 h-44 md:h-full overflow-hidden relative">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      alt="Georgia Tech" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_xBPwgTsEs9UpBEbeoQ0HB9bXd-vDma_sJRChMwMSI8Hyv_xdeTooR8xv8F6-xf6r7Ac1QVyQbcPDLRmh4uj3N6QEJJBUZAiSg_CvGpdZL9-jJWq6P2mPnMql37uX5cQ_hCheAT0pIXbtwACBoUSoi1p-MDATwV5CXjref3BwYtUsZf76p0gQHhuB5kProPiSetpElDu95lVPnoowRjwjSVNrlymiSFFmsJ1jQUzkB9jMhByLDrmbujv3eQTSaXjWlXTDD15dkq5v" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-secondary/95 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md">
                      94% Match
                    </div>
                  </div>
                  <div className="md:w-1/2 p-gutter flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-bold text-primary leading-tight">
                          Georgia Institute of Technology
                        </h3>
                        <button 
                          onClick={() => toggleTooltip('gt-logic')}
                          className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors cursor-pointer flex-shrink-0"
                          title="AI Analysis"
                        >
                          <span className="material-symbols-outlined text-primary text-sm">info</span>
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-on-surface-variant font-mono mb-4">Atlanta, GA</p>

                      {/* AI Logic logic panel */}
                      {activeTooltip === 'gt-logic' && (
                        <div className="mb-4 p-4 rounded-lg bg-secondary-container/10 border-l-4 border-secondary glass-panel animate-fadeIn">
                          <p className="text-xs text-on-surface-variant font-medium italic">
                            "Top choice for Computer Science. Your profile exceeds 90% of current freshman applicant benchmarks for STEM scores."
                          </p>
                        </div>
                      )}

                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2 text-sm text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-primary text-lg">science</span>
                          Strong AI Research Lab
                        </li>
                        <li className="flex items-center gap-2 text-sm text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-primary text-lg">groups</span>
                          Vibrant Startup Culture
                        </li>
                      </ul>
                    </div>

                    <button 
                      onClick={() => alert('Launching Application Review Tool... Handing off to custom draft builder.')}
                      className="w-full py-3 bg-primary text-on-primary rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      Review Application
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar card for Target */}
              <div className="bg-surface-container-high/30 p-gutter rounded-xl border border-dashed border-outline-variant flex flex-col justify-center items-center text-center">
                <span className="material-symbols-outlined text-4xl text-primary/45 mb-4">add_location_alt</span>
                <h4 className="text-base font-display font-medium text-primary mb-2">Add More Targets?</h4>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Explore schools in Europe or Canada for diverse engineering cultures.
                </p>
                <button 
                  onClick={() => alert("Exploring custom programs in TU Munich, Toronto, and Waterloo for foreign applications...")}
                  className="px-6 py-2 border.5 border-primary text-primary rounded-full text-xs font-bold hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  Explore Recommendations
                </button>
              </div>
            </div>
          </section>

          {/* Safety Schools */}
          <section>
            <div className="flex items-center justify-between mb-stack-md pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-on-secondary-fixed-variant">verified</span>
                <h2 className="text-xl font-display font-bold text-on-surface">Safety Schools</h2>
              </div>
              <span className="text-xs font-mono text-on-surface-variant font-bold uppercase tracking-wider">
                Guaranteed Fit ( &gt; 60% Admit )
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
              {/* Purdue */}
              <div className="glass-panel p-stack-lg rounded-xl border border-outline-variant ai-glow-hover transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-display font-bold text-primary">98%</p>
                      <p className="text-xs font-mono font-bold text-on-surface-variant uppercase">Match</p>
                    </div>
                  </div>
                  <h3 className="text-base font-display font-bold mb-1">Purdue University</h3>
                  <p className="text-xs font-mono text-on-surface-variant mb-4 font-semibold">West Lafayette, IN</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] rounded uppercase font-bold tracking-wider font-mono">
                      Top 10 Engineering
                    </span>
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => toggleTooltip('purdue-logic')}
                    className="w-full text-center py-2 text-xs font-mono font-bold text-primary border-t border-outline-variant/30 mt-2 hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    View AI Logic
                  </button>
                  {activeTooltip === 'purdue-logic' && (
                    <div className="mt-2 p-3 bg-surface-container-low rounded text-[11px] text-on-surface-variant font-mono leading-relaxed border border-outline-variant/20 animate-fadeIn">
                      Solid academic safety. Cost is significantly below your $40k cap with out-of-state merit aid.
                    </div>
                  )}
                </div>
              </div>

              {/* Waterloo */}
              <div className="glass-panel p-stack-lg rounded-xl border border-outline-variant ai-glow-hover transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">engineering</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-display font-bold text-primary">96%</p>
                      <p className="text-xs font-mono font-bold text-on-surface-variant uppercase">Match</p>
                    </div>
                  </div>
                  <h3 className="text-base font-display font-bold mb-1">University of Waterloo</h3>
                  <p className="text-xs font-mono text-on-surface-variant mb-4 font-semibold">Ontario, Canada</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] rounded uppercase font-bold tracking-wider font-mono">
                      Co-op Leader
                    </span>
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => toggleTooltip('waterloo-logic')}
                    className="w-full text-center py-2 text-xs font-mono font-bold text-primary border-t border-outline-variant/30 mt-2 hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    View AI Logic
                  </button>
                  {activeTooltip === 'waterloo-logic' && (
                    <div className="mt-2 p-3 bg-surface-container-low rounded text-[11px] text-on-surface-variant font-mono leading-relaxed border border-outline-variant/20 animate-fadeIn">
                      Your CS extracurriculars guarantee admission. Co-op earnings will likely reduce total net cost to $25k.
                    </div>
                  )}
                </div>
              </div>

              {/* TU Delft */}
              <div className="glass-panel p-stack-lg rounded-xl border border-outline-variant ai-glow-hover transition-all flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">biotech</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-display font-bold text-primary">95%</p>
                      <p className="text-xs font-mono font-bold text-on-surface-variant uppercase">Match</p>
                    </div>
                  </div>
                  <h3 className="text-base font-display font-bold mb-1">TU Delft</h3>
                  <p className="text-xs font-mono text-on-surface-variant mb-4 font-semibold">Delft, Netherlands</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] rounded uppercase font-bold tracking-wider font-mono">
                      EU Top Tier
                    </span>
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => toggleTooltip('delft-logic')}
                    className="w-full text-center py-2 text-xs font-mono font-bold text-primary border-t border-outline-variant/30 mt-2 hover:bg-primary/5 transition-colors cursor-pointer"
                  >
                    View AI Logic
                  </button>
                  {activeTooltip === 'delft-logic' && (
                    <div className="mt-2 p-3 bg-surface-container-low rounded text-[11px] text-on-surface-variant font-mono leading-relaxed border border-outline-variant/20 animate-fadeIn">
                      Competitive admission but your Math/Phys A* scores meet the strict entry requirements easily.
                    </div>
                  )}
                </div>
              </div>

              {/* Add Safety Placeholder */}
              <div 
                onClick={() => {
                  alert("Opening Search console... Suggesting: University of Maryland, University of Massachusetts, and University of Iowa.");
                }}
                className="border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-stack-lg text-on-surface-variant/60 hover:text-primary hover:border-primary transition-all cursor-pointer group shadow-sm bg-surface-container-low/20"
              >
                <PlusCircle className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform text-outline" />
                <p className="text-xs font-mono font-bold uppercase tracking-wider">Add Another Safety</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Embedded Nav */}
      <BottomNav currentScreen="University Matcher" onNavigate={onNavigate} />
    </div>
  );
}
