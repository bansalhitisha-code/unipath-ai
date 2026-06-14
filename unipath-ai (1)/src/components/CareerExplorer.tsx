import React, { useState } from 'react';
import { Screen, TransitionType, CareerInfo } from '../types';
import { Header, BottomNav } from './Navigation';
import { Search, Compass, Lightbulb, TrendingUp, Cpu, Award, Milestone, GraduationCap, Shield, HelpCircle, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';
import { initialCareers } from '../data';

interface CareerExplorerProps {
  onNavigate: (screen: Screen, transitionType: TransitionType) => void;
  careers: CareerInfo[];
}

export default function CareerExplorer({ onNavigate, careers }: CareerExplorerProps) {
  const [selectedCareerId, setSelectedCareerId] = useState<string>('car-2'); // default to Quantitative Finance
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeCareer = careers.find(c => c.id === selectedCareerId) || careers[1];

  // Simple filter based on query
  const filteredCareers = careers.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHashtagClick = (tag: string) => {
    setSearchQuery(tag);
    if (tag.toLowerCase().includes('finance')) {
      setSelectedCareerId('car-2');
    } else if (tag.toLowerCase().includes('ethics') || tag.toLowerCase().includes('science')) {
      setSelectedCareerId('car-1');
    }
  };

  return (
    <div className="bg-background text-on-background font-sans min-h-screen pb-32">
      {/* Top App Bar */}
      <Header currentScreen="Career Explorer" onNavigate={onNavigate} />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-stack-lg pt-4">
        
        {/* Search Hero Section */}
        <section className="relative overflow-hidden rounded-xl bg-primary-container p-gutter mb-stack-lg text-white shadow-md animate-fadeIn">
          <div className="relative z-10 max-w-2xl pt-2">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-stack-md leading-tight">
              Chart Your Future
            </h2>
            <div className="relative group mt-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-white transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder="What interests you? (e.g. Finance, Machine Learning, Stats)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-secondary-container focus:border-transparent transition-all outline-none text-base"
              />
            </div>
            <div className="flex flex-wrap gap-stack-sm mt-stack-md pb-2">
              <span 
                onClick={() => handleHashtagClick('#QuantitativeFinance')}
                className="text-xs font-mono font-bold bg-white/15 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/25 transition-colors border border-white/10"
              >
                Trending: #QuantitativeFinance
              </span>
              <span 
                onClick={() => handleHashtagClick('#DataEthics')}
                className="text-xs font-mono font-bold bg-white/15 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/25 transition-colors border border-white/10"
              >
                #DataEthics
              </span>
              <span 
                onClick={() => handleHashtagClick('#GreenEnergy')}
                className="text-xs font-mono font-bold bg-white/15 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/25 transition-colors border border-white/10"
              >
                #GreenEnergy
              </span>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none text-white">
            <Compass className="w-96 h-96" />
          </div>
        </section>

        {/* Suggested Section */}
        <section className="mb-stack-lg animate-fadeIn">
          <div className="flex items-center gap-2 mb-stack-md pt-2">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            <h3 className="text-xl font-display font-bold text-on-surface">Because you like Math &amp; Economics</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {filteredCareers.map((c) => {
              const isSelected = c.id === selectedCareerId;
              
              let iconSpan = <span className="material-symbols-outlined text-secondary">database</span>;
              if (c.id === 'car-2') iconSpan = <span className="material-symbols-outlined text-secondary-fixed">monitoring</span>;
              if (c.id === 'car-3') iconSpan = <span className="material-symbols-outlined text-secondary">account_balance</span>;

              if (c.aiPick) {
                // Quantitative Finance card Top AI Pick Highlight style
                return (
                  <div 
                    key={c.id}
                    onClick={() => setSelectedCareerId(c.id)}
                    className={`career-card-hover group relative overflow-hidden p-gutter rounded-xl border flex flex-col justify-between transition-all cursor-pointer ring-4 shadow-sm ${
                      isSelected 
                        ? 'bg-primary-container border-primary text-white ring-primary-container/20' 
                        : 'bg-primary-container/90 border-transparent text-white opacity-85 hover:opacity-100 ring-transparent'
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-2">
                      <span className="bg-secondary-container text-on-secondary-container text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">
                        Top AI Pick
                      </span>
                    </div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-stack-md">
                        {iconSpan}
                      </div>
                      <h4 className="text-xl font-display font-bold mb-2">{c.title}</h4>
                      <p className={`text-sm line-clamp-2 leading-relaxed ${isSelected ? 'text-primary-fixed-dim' : 'text-white/80'}`}>
                        {c.desc}
                      </p>
                    </div>
                    <div className="relative z-10 mt-stack-lg flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white bg-white/20 px-3 py-1 rounded-full">
                        {c.matchScore}% Match
                      </span>
                      <span className="material-symbols-outlined text-secondary-fixed group-hover:translate-x-1 duration-150 transition-all text-xl">arrow_forward</span>
                    </div>
                  </div>
                );
              }

              // Normal display
              return (
                <div 
                  key={c.id}
                  onClick={() => setSelectedCareerId(c.id)}
                  className={`career-card-hover group bg-surface-container-lowest p-gutter rounded-xl border flex flex-col justify-between transition-all cursor-pointer shadow-xs ${
                    isSelected ? 'border-secondary ring-4 ring-secondary-container/10 bg-surface' : 'border-outline-variant/30 hover:border-outline'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-secondary-container/10 flex items-center justify-center mb-stack-md">
                      {iconSpan}
                    </div>
                    <h4 className="text-xl font-display font-bold mb-2 text-on-surface">{c.title}</h4>
                    <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="mt-stack-lg flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-secondary bg-secondary-container/10 px-3 py-1 rounded-full">
                      {c.matchScore}% Match
                    </span>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary group-hover:translate-x-1 duration-150 transition-all text-xl">
                      arrow_forward
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Career Path deep-dive Section */}
        <section className="mb-stack-lg pt-2 animate-fadeIn">
          <div className="glass-panel p-gutter rounded-2xl border border-outline-variant/30 relative overflow-hidden shadow-sm">
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="flex flex-col md:flex-row gap-gutter relative z-10">
              {/* Left column: stats spotlight */}
              <div className="md:w-1/3 flex flex-col gap-stack-md justify-between border-r border-outline-variant/10 pr-6">
                <div>
                  <div className="flex items-center gap-1.5 text-primary mb-stack-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">AI Deep Dive</span>
                  </div>
                  <h2 className="text-2xl font-display font-extrabold text-on-surface tracking-tight">
                    {activeCareer.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-surface-container-low p-stack-md rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-on-surface-variant text-xs font-mono font-bold uppercase">Salary Range</span>
                      <TrendingUp className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="text-2xl font-display font-bold text-primary">{activeCareer.salaryRange}</div>
                    <div className="w-full bg-outline-variant/30 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-secondary-container h-full rounded-full w-3/4 shadow-sm animate-pulse"></div>
                    </div>
                    <p className="text-[10px] text-on-surface-variant mt-2 uppercase font-mono tracking-wide">
                      90th Percentile after 5 years
                    </p>
                  </div>

                  <div className="bg-surface-container-low p-stack-md rounded-xl flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-on-surface-variant text-[10px] uppercase font-mono font-bold block">Required Degree</span>
                      <span className="text-xs font-bold font-mono text-on-surface">{activeCareer.degree}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: key skills & custom CTA button */}
              <div className="md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-stack-md border-b border-outline-variant/10 pb-2">
                    <h4 className="font-bold text-sm uppercase tracking-wider font-mono text-on-surface">Key Skills Portfolio</h4>
                    <span className="material-symbols-outlined text-secondary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>sparkle</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md mb-stack-lg">
                    {activeCareer.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/50 transition-colors border border-transparent hover:border-outline-variant/20 shadow-xs bg-surface-container-lowest">
                        <div className="w-10 h-10 bg-primary-fixed rounded-lg flex items-center justify-center font-display text-primary font-bold text-sm shadow-xs select-none">
                          {skill.levelSymbol}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-on-surface">{skill.name}</div>
                          <div className="text-xs text-on-surface-variant font-mono">Complexity: {skill.complexity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personalized CTA Roadmap button with specific text and slide_up transition */}
                <div className="p-gutter rounded-xl bg-gradient-to-r from-primary-container to-secondary flex flex-col sm:flex-row items-center justify-between gap-stack-md text-white shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-white">timeline</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm">Generate Personalized Path</div>
                      <div className="text-white/70 text-xs">AI will draft a 4-year curriculum template</div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onNavigate('Roadmap Generator', 'slide_up')}
                    className="bg-white text-primary hover:bg-surface-bright border border-transparent hover:border-white px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-mono font-extrabold hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    Start Roadmap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Career Analytics section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-stack-lg animate-fadeIn">
          {/* Growth bar graph */}
          <div className="bg-surface-container-low p-gutter rounded-xl border border-outline-variant/20 shadow-xs">
            <h5 className="text-on-surface font-bold text-sm uppercase tracking-wide font-mono mb-stack-md">Market Growth Trends</h5>
            
            {/* CSS-led dynamic bars */}
            <div className="h-32 flex items-end gap-3 px-stack-md mt-6">
              <div className="w-full bg-primary/20 rounded-t h-1/2 relative group">
                <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-mono px-1 rounded shadow-md">$85k</div>
              </div>
              <div className="w-full bg-primary/30 rounded-t h-2/3 relative group">
                <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-mono px-1 rounded shadow-md">$98k</div>
              </div>
              <div className="w-full bg-primary/45 rounded-t h-[75%] relative group animate-pulse">
                <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-mono px-1 rounded shadow-md">$112k</div>
              </div>
              <div className="w-full bg-primary/60 rounded-t h-[60%] relative group">
                <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-mono px-1 rounded shadow-md">$130k</div>
              </div>
              <div className="w-full bg-secondary rounded-t h-[90%] relative group">
                <div className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-mono px-1 rounded shadow-md">$164k</div>
              </div>
            </div>

            <div className="flex justify-between mt-2.5 text-[10px] text-on-surface-variant font-mono">
              <span>2021</span>
              <span>2022</span>
              <span>2023</span>
              <span>2024</span>
              <span>2025 EST</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-stack-md">
              The Quant sector is expected to grow by <span className="text-secondary font-bold font-mono text-sm">+12%</span> next year due to algorithmic trading & AI adoption.
            </p>
          </div>

          {/* Jane Street Spotlight Card */}
          <div className="bg-surface-container-low p-gutter rounded-xl border border-outline-variant/20 flex gap-stack-md items-center shadow-xs">
            <img 
              alt="Wall Street Trading Room" 
              className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover shadow-sm bg-surface-container" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2wQkSo35P-JTfPZEsYCPRQQUnQ17UomCREifEDv5Dlxbobw8lFGBCILKOc2wphAUaUwTTFTUxjL9U52kV74FV7G4kftHEJQ-e3upoa2QxEpt3XOZBh33zGmVKdF0MVk8-cEf66RNKBb6j_oZAJkSGgrDY4eqNibYPzotCV1zqXgV5eRiray-ZZWAsYxVHpKNu-wFYQskckBVmL2e8opaxC9_YgYLZrACAZc9qUXFQ85VQfacU6-ZtXAEt5AkPU6x9i_Qm-5xO57yi" 
              referrerPolicy="no-referrer"
            />
            <div className="flex-1">
              <h5 className="text-on-surface font-extrabold text-sm font-mono uppercase tracking-wide mb-1">Top Recruiter: Jane Street</h5>
              <p className="text-xs text-on-surface-variant mb-stack-md leading-relaxed pr-2">
                Currently hiring Summer 2026 quantitative developers. Competency in strong systems like C++ and advanced stats is critical.
              </p>
              <button 
                onClick={() => alert("Visiting Jane Street Recruitment Desk... Loading external browser wrapper safely.")}
                className="text-primary hover:text-secondary font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer"
              >
                View Internship Details <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Embedded Nav */}
      <BottomNav currentScreen="Career Explorer" onNavigate={onNavigate} />

      {/* Floating Action Chat Button */}
      <button 
        onClick={() => alert("UniPath AI Assistant: Hello! How can I help refine your career targets? Ask me about 'Kaggle registration' or 'Jane Street coding test prep'!")}
        className="fixed right-margin-mobile bottom-24 w-14 h-14 bg-primary text-white hover:bg-secondary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 duration-150 transition-all z-40 cursor-pointer"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
