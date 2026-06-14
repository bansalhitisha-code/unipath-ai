import React, { useState } from 'react';
import { Screen, TransitionType, Achievement } from '../types';
import { Header, BottomNav } from './Navigation';
import { Plus, Check, Award, Flame, Terminal, Cpu, Landmark, ChevronRight, Upload, AlertCircle, Lightbulb, BookOpen, Loader2 } from 'lucide-react';
import { initialAchievements } from '../data';

interface CVAnalyzerProps {
  onNavigate: (screen: Screen, transitionType: TransitionType) => void;
  achievements: Achievement[];
  onAddAchievement: (achievement: Achievement) => void;
}

export default function CVAnalyzer({ onNavigate, achievements, onAddAchievement }: CVAnalyzerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'Technical' | 'Leadership' | 'Academic' | 'Other'>('Technical');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newYear, setNewYear] = useState('');

  // Simulating CV file upload with loaders and interactive response
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [readinessScore, setReadinessScore] = useState(68);

  const handleUploadCV = () => {
    setIsUploading(true);
    setUploadSuccess(false);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      // Boost readiness slightly to show dynamic reaction to the uploaded CV
      setReadinessScore(74);
      alert("CV analyzed successfully! Found new match signals for Computer Science courses. Analysis results updated.");
    }, 2000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSubtitle || !newYear) {
      alert("Please fill in all details.");
      return;
    }
    const newlyCreated: Achievement = {
      id: 'ach-' + Date.now(),
      title: newTitle,
      type: newType,
      subtitle: newSubtitle,
      year: newYear,
      verified: true
    };
    onAddAchievement(newlyCreated);
    setShowAddForm(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewYear('');
    // Also increase score due to more achievements!
    setReadinessScore(prev => Math.min(prev + 5, 100));
  };

  return (
    <div className="bg-background min-h-screen text-on-surface font-sans pb-24">
      {/* Top App Bar */}
      <Header currentScreen="CV Analyzer" onNavigate={onNavigate} />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-gutter mb-24">
        {/* Header Section */}
        <section className="mb-stack-lg pt-4 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-primary-container bg-primary-fixed rounded-full px-3 py-1 uppercase tracking-wider">
                Academic Analysis
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mt-2 text-on-surface leading-tight">
                Profile Strength: Strong
              </h2>
              <p className="text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                Your profile is in the top 15% of applicants for Data Science tracks. Let's refine the remaining gaps to ensure maximum scholarship eligibility.
              </p>
            </div>
            
            <div className="flex gap-stack-sm">
              <button 
                onClick={handleUploadCV}
                disabled={isUploading}
                className="bg-primary hover:bg-primary-container disabled:opacity-50 text-on-primary font-body-md px-6 py-2.5 rounded-xl shadow-md hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer active:scale-95 text-sm font-bold"
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                )}
                {isUploading ? "Analyzing..." : "Update CV"}
              </button>
            </div>
          </div>
          {uploadSuccess && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 text-xs rounded-lg flex items-center gap-2 border border-green-200">
              <Check className="w-4 h-4 text-green-600" />
              CV file uploaded successfully. Scholarship readiness increased to {readinessScore}%!
            </div>
          )}
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Section 1: Achievements (Bento Large, left side) */}
          <div className="md:col-span-7 flex flex-col gap-stack-md">
            <div className="bg-surface-container-lowest border border-outline-variant p-gutter rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-gutter border-b border-outline-variant/10 pb-3">
                <h3 className="text-xl font-display font-bold text-on-surface">Verified Achievements</h3>
                <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                  {achievements.length} RECENT
                </span>
              </div>

              <div className="space-y-stack-md">
                {achievements.map((ach) => {
                  let badgeIcon = <span className="material-symbols-outlined">terminal</span>;
                  let bgClass = "bg-primary-container text-on-primary-container";

                  if (ach.type === 'Leadership') {
                    badgeIcon = <span className="material-symbols-outlined">smart_toy</span>;
                    bgClass = "bg-secondary-container text-on-secondary-container";
                  } else if (ach.type === 'Academic') {
                    badgeIcon = <span className="material-symbols-outlined">calculate</span>;
                    bgClass = "bg-tertiary-container text-on-tertiary-container";
                  }

                  return (
                    <div 
                      key={ach.id} 
                      className="flex items-start gap-4 p-4 rounded-lg bg-surface-container-low border border-transparent hover:border-primary-container transition-all group shadow-xs"
                    >
                      <div className={`${bgClass} p-3 rounded-xl`}>
                        {badgeIcon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-on-surface text-base group-hover:text-primary transition-colors">
                          {ach.title}
                        </h4>
                        <p className="text-sm font-medium text-on-surface-variant">
                          {ach.subtitle}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <span className="text-xs bg-secondary-container/20 text-secondary font-semibold px-2 py-0.5 rounded font-mono">
                            {ach.type}
                          </span>
                          <span className="text-xs bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded font-mono">
                            {ach.year}
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Inline dynamic manual add form */}
              {showAddForm ? (
                <form onSubmit={handleAddSubmit} className="mt-6 p-4 rounded-xl border border-outline bg-surface-container-low animate-fadeIn space-y-3">
                  <h4 className="text-sm font-bold text-primary font-mono uppercase">Add Manual Achievement</h4>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1 font-mono">Achievement Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. AWS Certified Practitioner" 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1 font-mono">Type</label>
                      <select 
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm bg-white border border-outline-variant rounded-lg outline-none"
                      >
                        <option value="Technical">Technical</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Academic">Academic</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1 font-mono">Year</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 2024" 
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-outline-variant rounded-lg outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1 font-mono">Credential Source / Issuer</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Amazon Web Services / Udacity" 
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-outline-variant rounded-lg outline-none"
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <button 
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-3 py-1.5 text-xs text-on-surface-variant border border-outline-variant rounded-lg hover:bg-surface"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-1.5 text-xs text-white bg-primary rounded-lg hover:bg-primary-container"
                    >
                      Save Entry
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="w-full mt-gutter py-3 border border-dashed border-outline-variant rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors font-semibold text-sm cursor-pointer"
                >
                  + Add Manual Entry
                </button>
              )}
            </div>
          </div>

          {/* Section 2: AI Analysis (Glassmorphic, right side) */}
          <div className="md:col-span-5 flex flex-col gap-gutter">
            <div className="glass-panel p-gutter rounded-xl ai-glow relative overflow-hidden h-full border-t-2 border-primary-container flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-stack-md">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  <h3 className="text-lg font-display font-bold text-primary">AI Insight Analysis</h3>
                </div>
                <p className="text-sm text-on-surface-variant mb-gutter leading-relaxed">
                  Our engine analyzed 1,200 successful IVY League and T20 applications to find your profile's unique optimization path.
                </p>

                <div className="space-y-gutter">
                  {/* Research opportunities card */}
                  <div className="p-4 rounded-xl bg-error-container/30 border border-error/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-error text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>error_outline</span>
                      <span className="font-bold text-error text-xs font-mono uppercase tracking-wider">Missing: Research Opportunities</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Top-tier tech programs look for peer-reviewed research or independent projects. You currently have 0 entries in this category.
                    </p>
                  </div>

                  {/* Non-STEM card */}
                  <div className="p-4 rounded-xl bg-secondary-container/10 border border-secondary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                      <span className="font-bold text-secondary text-xs font-mono uppercase tracking-wider">Gap: Leadership in Non-STEM</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Your profile is "Spiky" in STEM but lacks social versatility. Consider community outreach or humanities-led initiatives.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-gutter pt-gutter border-t border-outline-variant/30">
                <div className="flex justify-between items-center text-xs font-bold font-mono text-on-surface-variant uppercase mb-2">
                  <span>Scholarship Readiness</span>
                  <span>{readinessScore}%</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary-container rounded-full transition-all duration-1000"
                    style={{ width: `${readinessScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Recommended Actions */}
        <div className="md:col-span-12 mt-stack-lg pt-4">
          <h3 className="text-xl font-display font-bold text-on-surface mb-stack-lg">Priority Actions for You</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Act Card 1 */}
            <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col group shadow-xs">
              <div className="mb-stack-md relative h-40 rounded-lg overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="PhD collaboration" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK6rTdCoC1ZYSU1OgvWhnRV2-oc3ZJvRRjQpzAe-s8n5DdwmGXBST9tpfQkp-XGs1yC28nr540-MkLk7QpIC97LKSnInBMCZeAvX5huXknyRCxM6_uQ2mhfg-P4Z9ScqahrzJyC38kFaOWsa_Wg1jDK2wmAlOQIn3uggX6HzXUlbesoFiUG7fAR6oQWT6JOV700GO8RqpO3xJi7UfP_LgCKJE7OUwoK5-UYjhoz8mGGenD0BAG6q8Y9JA_Ccp2t1Brb5UBL6_H2-rl" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-on-primary font-bold text-sm">Research Mentor</span>
              </div>
              <h4 className="text-base font-display font-bold text-on-surface mb-2">Find a Research Mentor</h4>
              <p className="text-xs text-on-surface-variant flex-grow mb-stack-lg leading-relaxed">
                Connect with PhD candidates from MIT and Stanford for guided research projects.
              </p>
              <a 
                onClick={(e) => { e.preventDefault(); alert("Opening Mentoring Dashboard... Browsing 14 pre-registered PhD fellows."); }}
                className="flex items-center justify-between text-primary font-bold text-sm tracking-wide group-hover:text-secondary transition-colors cursor-pointer"
              >
                Browse Mentors
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            {/* Act Card 2 */}
            <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col group shadow-xs">
              <div className="mb-stack-md relative h-40 rounded-lg overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Circle conference" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLlEiwWF1ZR3hjKnbBWbvbyatY81aSKCMpdHr5gPJLkpSzRxzHUJ8mAX47B4mSCQ_F53RLQ4wIzh9ZXyMqGsQfnTfTRC8YiGKdsOqmImNPHK6bIUEiRzITLL5SglrpFjp4jCYvwYVy80nKDaEclXtAJ5BwmQB2DSkDPbff--tegyYDJIFm1-zXmPNY8-cF-fS1SgN27LYzWRNBaW-FOkqR5NfvL-6QflmwBHHjfxqF_vzbX6QtUswCQvO1cOtlg5r9sijKxbD24VjI" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-on-primary font-bold text-sm">Workshops</span>
              </div>
              <h4 className="text-base font-display font-bold text-on-surface mb-2">Leadership Workshops</h4>
              <p className="text-xs text-on-surface-variant flex-grow mb-stack-lg leading-relaxed">
                Interactive sessions on non-profit management and emotional intelligence.
              </p>
              <a 
                onClick={(e) => { e.preventDefault(); alert("Viewing Leadership schedules. 2 sessions open on Jun 22 and Jul 05."); }}
                className="flex items-center justify-between text-primary font-bold text-sm tracking-wide group-hover:text-secondary transition-colors cursor-pointer"
              >
                View Schedule
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            {/* Act Card 3 */}
            <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col group shadow-xs">
              <div className="mb-stack-md relative h-40 rounded-lg overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Historic library walk" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3EufEZe6SKdID6ooEpUj61yhFK85UB4XJJqkjNlP4yFQ1eqa5J1pg4YD_q8CmPJittMUC-weQ5uhodapq2zNT_NgMVaTlkZLu8F98HpleOYIL_ByxyhVpAIE0qF9FyxO40ZMTEIn2DyQStyDneG000klqoAuaIQ4VRFiW563W4WZkhRnjSZPTxDH-sMtf1SqqC2u9mrBFsvNfzNOiZybxds0ANdLt82uM9V4yb8W0THPdZI_UxvA9HLezMLCbagKv2DijTMwUQiyC" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tertiary/60 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-on-primary font-bold text-sm">Community</span>
              </div>
              <h4 className="text-base font-display font-bold text-on-surface mb-2">Volunteer Opportunities</h4>
              <p className="text-xs text-on-surface-variant flex-grow mb-stack-lg leading-relaxed">
                High-impact social projects curated for STEM students to show versatility.
              </p>
              <a 
                onClick={(e) => { e.preventDefault(); onNavigate('Career Explorer', 'push'); }}
                className="flex items-center justify-between text-primary font-bold text-sm tracking-wide group-hover:text-secondary transition-colors cursor-pointer"
              >
                Explore Projects
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Embedded Nav */}
      <BottomNav currentScreen="CV Analyzer" onNavigate={onNavigate} />
    </div>
  );
}
