import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  FileText,
  Compass,
  DollarSign,
  LayoutDashboard,
  Milestone,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Menu,
  ChevronRight,
  User,
  Plus,
  Search,
  BookOpen,
  Info,
  Brain,
  ShieldAlert,
  Loader2,
  Upload,
  ThumbsUp,
  X,
  PlusCircle,
  ExternalLink
} from "lucide-react";
import { StudentProfile, UniversityMatch, CareerOption, RoadmapStep, CVAnalysisResult, EssayReviewResult } from "./types";

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<"home" | "matcher" | "roadmap" | "careers" | "profile">("home");

  // Profile State initialization (Alex as default)
  const [profile, setProfile] = useState<StudentProfile>({
    name: "Alex",
    grade: "Grade 12",
    targetMajor: "Data Science",
    school: "Palo Alto High",
    gpa: "3.90",
    satAct: "1540 SAT",
    extracurriculars: "President of Coding Club, Volunteer STEM robotics tutor, Built a high school parking analysis web app in Python"
  });

  // Edited profile buffer state for form edits
  const [profileForm, setProfileForm] = useState<StudentProfile>({ ...profile });

  // Main Dashboard/Backend States
  const [insight, setInsight] = useState<{
    insightHeadline: string;
    insightText: string;
    primaryActionText: string;
    alternativeActionText: string;
    isDemo?: boolean;
  }>({
    insightHeadline: "Strengthen your Portfolio with \"Data Ethics\"",
    insightText: "Based on your interest in Data Science and top-tier university requirements, completing a certified course in Data Ethics would increase your Match Score for Stanford by +4%.",
    primaryActionText: "Explore Courses",
    alternativeActionText: "Remind Me Later",
    isDemo: true
  });

  const [matches, setMatches] = useState<UniversityMatch[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
  const [careers, setCareers] = useState<CareerOption[]>([]);
  
  // Loading status
  const [isLoadingMain, setIsLoadingMain] = useState(false);
  const [isDemoActive, setIsDemoActive] = useState(false);

  // CV Analyzer State
  const [showCvModal, setShowCvModal] = useState(false);
  const [cvText, setCvText] = useState("");
  const [isAnalyzingCv, setIsAnalyzingCv] = useState(false);
  const [cvAnalysis, setCvAnalysis] = useState<CVAnalysisResult | null>(null);

  // Essay Review State
  const [showEssayModal, setShowEssayModal] = useState(false);
  const [essayText, setEssayText] = useState("");
  const [essayPrompt, setEssayPrompt] = useState("");
  const [isReviewingEssay, setIsReviewingEssay] = useState(false);
  const [essayAnalysis, setEssayAnalysis] = useState<EssayReviewResult | null>(null);

  // Custom User University addition for Matcher
  const [customUniQuery, setCustomUniQuery] = useState("");
  const [addingCustomUni, setAddingCustomUni] = useState(false);

  // Custom roadmap generation state
  const [generatingCustomRoadmap, setGeneratingCustomRoadmap] = useState(false);
  const [roadmapConfig, setRoadmapConfig] = useState("Ivy League Admissions");

  // Fetch all intelligence data when profile updates
  const fetchIntelligenceData = async (targetProfile: StudentProfile) => {
    setIsLoadingMain(true);
    try {
      // Parallel requests from backend Express proxy services
      const [insightsRes, matchRes, roadmapRes, careersRes] = await Promise.all([
        fetch("/api/insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: targetProfile }),
        }).then(r => r.json()),
        fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: targetProfile }),
        }).then(r => r.json()),
        fetch("/api/roadmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: targetProfile }),
        }).then(r => r.json()),
        fetch("/api/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: targetProfile }),
        }).then(r => r.json()),
      ]);

      if (insightsRes) setInsight(insightsRes);
      if (matchRes?.matches) setMatches(matchRes.matches);
      if (roadmapRes?.steps) setRoadmap(roadmapRes.steps);
      if (careersRes?.careers) setCareers(careersRes.careers);
      
      // Determine if backend endpoints successfully reached real API keys
      setIsDemoActive(!!(insightsRes?.isDemo || matchRes?.isDemo || roadmapRes?.isDemo));
    } catch (err) {
      console.error("Error standard fetch. Defaulting to high-quality fallback.", err);
      setIsDemoActive(true);
    } finally {
      setIsLoadingMain(false);
    }
  };

  // Initial Data population
  useEffect(() => {
    fetchIntelligenceData(profile);
  }, [profile]);

  // Handle Profile Form submit
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(profileForm);
    // Notify with nice UI action state
    alert(`Successfully synchronized ${profileForm.name}'s profile data with UniPath AI Engine!`);
    setCurrentTab("home");
  };

  // Trigger CV analysis POST
  const handleAnalyzeCv = async () => {
    if (!cvText.trim()) return;
    setIsAnalyzingCv(true);
    try {
      const res = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, profile }),
      });
      const data = await res.json();
      setCvAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingCv(false);
    }
  };

  // Trigger College Essay review POST
  const handleReviewEssay = async () => {
    if (!essayText.trim()) return;
    setIsReviewingEssay(true);
    try {
      const res = await fetch("/api/review-essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essayText, promptText: essayPrompt, profile }),
      });
      const data = await res.json();
      setEssayAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsReviewingEssay(false);
    }
  };

  // Interactive step roadmap checkmark toggling
  const handleToggleStep = (index: number) => {
    const updated = [...roadmap];
    updated[index].status = updated[index].status === "completed" ? "pending" : "completed";
    setRoadmap(updated);
  };

  // Compute live current profile progress metrics based on roadmap checks
  const totalStepsCount = roadmap.length || 5;
  const completedStepsCount = roadmap.filter(s => s.status === "completed").length;
  const computedProgressPercentage = Math.round((completedStepsCount / totalStepsCount) * 100);

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col relative pb-28 md:pb-8">
      
      {/* Top Warning Banner if API is in high-fidelity fallback mode */}
      {isDemoActive && (
        <div className="bg-[#1a237e] text-white text-xs py-2 px-4 shadow-sm flex items-center justify-between z-[60] bg-gradient-to-r from-[#000666] to-[#00677f]">
          <div className="flex items-center gap-2 max-w-lg">
            <Sparkles className="w-4 h-4 text-[#00d2ff] shrink-0" />
            <span>
              <strong>Smart Demonstration Mode Active:</strong> Seamless fallback data rendering. To request custom college prompts live, configure your <code>GEMINI_API_KEY</code> within Settings &gt; Secrets.
            </span>
          </div>
          <button 
            onClick={() => setIsDemoActive(false)}
            className="text-white/80 hover:text-white px-2 py-0.5 rounded border border-white/20 text-[10px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* TopAppBar header */}
      <header className="bg-[#f7f9fb]/85 backdrop-blur-md border-b border-[#c6c5d4]/30 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-16 flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#c6c5d4] shadow-inner shrink-0">
              <img 
                id="profile_avatar"
                alt="Student Profile Avatar" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmK4vgZUN8eJz0inZ54SFgwvLjRXFPx1UpdjR-V20FFsPpN11QzLLZp1UGUR_WgFfDCc1zNTM4pqxc5J6D2aFQBZpx0sv_BNsrMwkNBoEsDpHwpHIPYghAtPQlqHiElzMfa1_3qR5utn-29iEg_aI1UhJx9Ew5zaZIvfL5slDnZ4EFEAf7F8uXNU3c_FQP2hnXgmKWIlkd6Pfo9JIjF45gN7cUFI3fCrmHPIXu07RNHLyT9jkOeReG74WY2OdDGs0fmirYTcrvpL40"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-extrabold tracking-tight text-[#000666] flex items-center gap-1.5">
                UniPath AI <span className="text-[9px] font-mono tracking-widest bg-[#00677f]/10 text-[#00677f] px-1.5 py-0.5 rounded-full uppercase">CO-PILOT</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Items */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-1 bg-[#eceef0] p-1 rounded-full">
              <button 
                id="btn_tab_home"
                onClick={() => setCurrentTab("home")} 
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${currentTab === "home" ? "bg-[#000666] text-white shadow-md" : "text-[#454652] hover:text-[#000666] hover:bg-white/40"}`}
              >
                Home
              </button>
              <button 
                id="btn_tab_matcher"
                onClick={() => setCurrentTab("matcher")} 
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${currentTab === "matcher" ? "bg-[#000666] text-white shadow-md" : "text-[#454652] hover:text-[#000666] hover:bg-white/40"}`}
              >
                Matcher
              </button>
              <button 
                id="btn_tab_roadmap"
                onClick={() => setCurrentTab("roadmap")} 
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${currentTab === "roadmap" ? "bg-[#000666] text-white shadow-md" : "text-[#454652] hover:text-[#000666] hover:bg-white/40"}`}
              >
                Roadmap
              </button>
              <button 
                id="btn_tab_careers"
                onClick={() => setCurrentTab("careers")} 
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${currentTab === "careers" ? "bg-[#000666] text-white shadow-md" : "text-[#454652] hover:text-[#000666] hover:bg-white/40"}`}
              >
                Careers
              </button>
              <button 
                id="btn_tab_profile"
                onClick={() => setCurrentTab("profile")} 
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${currentTab === "profile" ? "bg-[#000666] text-white shadow-md" : "text-[#454652] hover:text-[#000666] hover:bg-white/40"}`}
              >
                Profile ({profile.name})
              </button>
            </nav>

            <button 
              onClick={() => {
                setCvText("GPA: " + profile.gpa + "\nExtracurriculars: " + profile.extracurriculars);
                setShowCvModal(true);
              }}
              className="px-3.5 py-1.5 rounded-full border border-[#00677f]/30 hover:border-[#00677f] text-xs font-semibold text-[#00677f] flex items-center gap-1.5 hover:bg-[#00677f]/5 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              Analyze CV
            </button>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button 
              onClick={() => setCurrentTab("profile")} 
              className="text-xs bg-[#000666]/10 text-[#000666] px-2.5 py-1 rounded-full font-bold flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              {profile.name}
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1280px] w-full mx-auto px-4 md:px-10 py-6 flex-grow flex flex-col justify-start">
        
        {/* Loading Indicator for profile recalculation */}
        {isLoadingMain && (
          <div className="mb-6 bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00566a] px-4 py-3 rounded-lg flex items-center gap-3 animate-pulse text-xs">
            <Loader2 className="w-4 h-4 animate-spin text-[#00677f]" />
            <span>AI model is recalibrating your score matching algorithm, predicting high-paying career credentials & college benchmarks...</span>
          </div>
        )}

        {/* Tab Views */}
        <AnimatePresence mode="wait">
          {currentTab === "home" && (
            <motion.div 
              key="home_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 anim-fade-in"
            >
              {/* Header: Student Profile Summary */}
              <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#eceef0] pb-6" id="sec_profile_summary">
                <div>
                  <h1 className="text-3xl md:text-5xl font-display font-extrabold text-[#000666] tracking-tight mb-2">
                    Welcome back, {profile.name}
                  </h1>
                  <p className="text-base md:text-lg text-[#454652] font-medium">
                    {profile.grade} • <span className="text-[#00677f] font-bold">{profile.targetMajor}</span> • {profile.school}
                  </p>
                </div>
                
                {/* Next Deadline badge component */}
                <div id="card_deadline" className="bg-white p-4 rounded-xl border border-[#c6c5d4]/40 shadow-sm flex items-center justify-between gap-5 self-start md:self-auto min-w-[280px]">
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wider text-[#454652] font-semibold font-mono">Next Deadline</p>
                    <p className="text-lg font-display font-extrabold text-[#380b00] tracking-tight">Oct 15: Early Action</p>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-[#ffdbd0] flex items-center justify-center text-[#390c00] shrink-0 shadow-inner">
                    <Calendar className="w-5.5 h-5.5" />
                  </div>
                </div>
              </section>

              {/* Bento Grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* AI Insight of the Day (Glassmorphism + custom glows) */}
                <div id="ai_insight_card" className="md:col-span-8 glass-panel rounded-2xl p-6 md:p-8 ai-glow relative overflow-hidden group border border-[#c6c5d4]/40 bg-gradient-to-br from-white/95 to-[#b6ebff]/10">
                  <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#00d2ff]/10 filter blur-2xl group-hover:bg-[#00d2ff]/20 transition-all duration-750" />
                  
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-full bg-[#00677f]/10 flex items-center justify-center text-[#00677f]">
                          <Sparkles className="w-4.5 h-4.5 font-bold" />
                        </div>
                        <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#00677f]">
                          AI Insight of the Day
                        </span>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-display font-extrabold text-[#000666] mb-3 leading-tight tracking-tight">
                        {insight.insightHeadline}
                      </h2>
                      
                      <p className="text-sm md:text-base text-[#454652] mb-6 leading-relaxed max-w-2xl">
                        {insight.insightText}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => setCurrentTab("careers")}
                        className="bg-[#000666] hover:bg-[#1a237e] text-white text-xs md:text-sm px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all active:scale-97 hover:shadow-lg group"
                      >
                        {insight.primaryActionText}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <button 
                        onClick={() => alert("We've added 'Data Ethics Course Review' to your calendar alerts.")}
                        className="border border-[#767683]/40 text-[#000666] hover:bg-[#eceef0] text-xs md:text-sm px-6 py-2.5 rounded-full font-bold transition-all active:scale-97"
                      >
                        {insight.alternativeActionText}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Your Journey Progress Panel */}
                <div id="journey_card" className="md:col-span-4 bg-white rounded-2xl p-6 border border-[#c6c5d4]/30 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-[#000666] mb-1">Your Journey</h3>
                    <p className="text-xs text-[#454652] uppercase font-bold tracking-wider mb-4">Admissions Complete Check</p>
                    
                    <div className="relative pt-1 pb-4 border-b border-[#eceef0] mb-4">
                      <div className="flex mb-2 items-center justify-between text-xs">
                        <div>
                          <span className="text-xs font-bold inline-block py-1 px-2.5 uppercase rounded-full text-[#00566a] bg-[#b6ebff]">
                            {computedProgressPercentage}% Complete
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-[#00566a] font-bold">
                            {completedStepsCount} of {totalStepsCount} Checked
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2.5 text-xs flex rounded-full bg-[#eceef0]">
                        <div 
                          style={{ width: `${computedProgressPercentage}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#000666] to-[#00d2ff] transition-all duration-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {roadmap.map((step, idx) => (
                      <li 
                        key={step.id || idx} 
                        onClick={() => handleToggleStep(idx)}
                        className="flex items-start gap-3 cursor-pointer group"
                      >
                        {step.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        ) : (
                          <Clock className="w-5 h-5 text-[#c6c5d4] shrink-0 mt-0.5 group-hover:text-[#00677f] transition-all" />
                        )}
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold ${step.status === "completed" ? "line-through text-[#454652]/70 font-normal" : "text-[#000666]"}`}>
                            {step.title}
                          </span>
                          <span className="text-[10px] text-[#454652] truncate max-w-[200px]" title={step.description}>
                            {step.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => setCurrentTab("roadmap")}
                    className="mt-4 text-xs font-bold text-[#00677f] hover:text-[#00566a] flex items-center justify-center gap-1 pt-3 border-t border-[#eceef0]"
                  >
                    Manage Roadmap <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

              </div>

              {/* Quick Actions Panel */}
              <section id="quick_actions_sec" className="space-y-4">
                <h3 className="text-xl font-display font-extrabold text-[#000666]">
                  Admissions Quick Tools
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  <button 
                    onClick={() => setCurrentTab("matcher")}
                    className="bg-white p-5 rounded-xl border border-[#c6c5d4]/30 shadow-sm hover:border-[#00677f] transition-all group text-center flex flex-col items-center hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 bg-[#e0e0ff] text-[#000666] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#000666] mb-0.5">University Matcher</span>
                    <span className="text-[10px] text-[#454652]">Explore score fits</span>
                  </button>

                  <button 
                    onClick={() => {
                      setCvText("PAST EXPERIENCE AND SCORE POINTS:\n• " + profile.extracurriculars + "\n• School: " + profile.school + "\n• GPA: " + profile.gpa);
                      setShowCvModal(true);
                    }}
                    className="bg-white p-5 rounded-xl border border-[#c6c5d4]/30 shadow-sm hover:border-[#00677f] transition-all group text-center flex flex-col items-center hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 bg-[#b6ebff] text-[#00677f] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#000666] mb-0.5">CV / Profile Analyzer</span>
                    <span className="text-[10px] text-[#454652]">Critique portfolio bullets</span>
                  </button>

                  <button 
                    onClick={() => {
                      setEssayText("Since childhood, I have loved solving puzzles. Translating that into computer science algorithms at " + profile.school + " has defined my perspective...");
                      setShowEssayModal(true);
                    }}
                    className="bg-white p-5 rounded-xl border border-[#c6c5d4]/30 shadow-sm hover:border-[#00677f] transition-all group text-center flex flex-col items-center hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 bg-[#ffdbd0] text-[#380b00] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Brain className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#000666] mb-0.5">Essay Critic</span>
                    <span className="text-[10px] text-[#454652]">Collegiate proofreading</span>
                  </button>

                  <button 
                    onClick={() => setCurrentTab("careers")}
                    className="bg-white p-5 rounded-xl border border-[#c6c5d4]/30 shadow-sm hover:border-[#00677f] transition-all group text-center flex flex-col items-center hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="w-12 h-12 bg-[#eceef0] text-[#191c1e] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Compass className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#000666] mb-0.5">Career Pathways</span>
                    <span className="text-[10px] text-[#454652]">High-demand majors</span>
                  </button>

                </div>
              </section>

              {/* Top Matches (Horizontal gallery list) */}
              <section id="top_matches_sec" className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-display font-extrabold text-[#000666]">
                      Top University Matches
                    </h3>
                    <p className="text-xs text-[#454652]">AI generated alignment based on GPA & extracurricular rigor</p>
                  </div>
                  <button 
                    onClick={() => setCurrentTab("matcher")}
                    className="text-xs font-bold text-[#00677f] flex items-center gap-1 hover:underline"
                  >
                    View Deep Mechanics <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x custom-scrollbar">
                  {matches.map((match, index) => (
                    <div 
                      key={match.name || index}
                      className="min-w-[290px] md:min-w-[370px] bg-white rounded-2xl border border-[#c6c5d4]/30 shadow-sm overflow-hidden snap-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="h-32 bg-slate-100 relative">
                        {/* Custom beautiful academic background illustration overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#000666]/65 to-[#00677f]/40 z-10" />
                        
                        <div className="absolute z-20 top-3 left-4 text-white text-[10px] uppercase font-mono font-bold tracking-widest bg-black/30 backdrop-blur-md px-2 py-0.5 rounded">
                          {match.location}
                        </div>

                        {/* Top-level match badge */}
                        <div className="absolute z-20 top-3 right-3 bg-[#00d2ff]/20 border border-[#00d2ff] backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                          {match.matchScore}% Match Score
                        </div>

                        {/* Symbolic elegant college emblem name */}
                        <div className="absolute bottom-3 left-4 z-20 text-white">
                          <h4 className="text-lg font-display font-extrabold leading-tight shadow-sm">
                            {match.name}
                          </h4>
                          <span className="text-[11px] opacity-90 font-mono">
                            {match.major} Recommendation
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <p className="text-xs text-[#454652] line-clamp-2">
                          {match.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {match.tags.map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[10px] font-bold bg-[#eceef0] text-[#454652] px-2.5 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-[#eceef0] flex justify-between items-center">
                          <span className="text-[10px] uppercase text-[#00677f] font-bold tracking-wider">
                            College Fit Analyzed
                          </span>
                          <button 
                            onClick={() => {
                              setCurrentTab("matcher");
                              // Smooth scroll to top
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="text-[11px] font-bold text-[#000666] hover:text-[#00677f] flex items-center gap-0.5"
                          >
                            Explore admission odds <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          )}

          {/* MATCHER TAB VIEW */}
          {currentTab === "matcher" && (
            <motion.div 
              key="matcher_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-b border-[#eceef0] pb-4">
                <span className="text-xs font-mono font-extrabold text-[#00677f] uppercase tracking-widest block mb-1">Interactive Match Simulator</span>
                <h2 className="text-3xl font-display font-bold text-[#000666]">University Match & Odds Matrix</h2>
                <p className="text-xs text-[#454652] mt-1">
                  Comparing your current credentials ({profile.gpa} GPA, {profile.satAct}) against institutional thresholds.
                </p>
              </div>

              {/* Add Custom University interactive form */}
              <div className="bg-[#e0e0ff]/20 border border-[#000666]/10 p-4 rounded-xl flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="text-left w-full sm:w-auto">
                  <h4 className="text-sm font-bold text-[#000666] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#00677f]" />
                    Want a specialized college analysis?
                  </h4>
                  <p className="text-[11px] text-[#454652]">Type any competitive university below to summon instant Gemini odds review.</p>
                </div>
                <div className="flex w-full sm:w-auto max-w-sm shrink-0 gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g., Caltech, Harvard" 
                    value={customUniQuery}
                    onChange={(e) => setCustomUniQuery(e.target.value)}
                    className="bg-white px-3 py-1.5 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none flex-grow"
                  />
                  <button 
                    onClick={async () => {
                      if (!customUniQuery.trim()) return;
                      setAddingCustomUni(true);
                      try {
                        const res = await fetch("/api/match", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ 
                            profile: { ...profile, targetMajor: `${profile.targetMajor} at ${customUniQuery}` } 
                          }),
                        });
                        const data = await res.json();
                        if (data?.matches?.[0]) {
                          setMatches([data.matches[0], ...matches]);
                          alert(`Summoned new live university analysis for ${data.matches[0].name}!`);
                          setCustomUniQuery("");
                        }
                      } catch (ex) {
                        alert("Could not extract live analysis. Check Gemini API authorization.");
                      } finally {
                        setAddingCustomUni(false);
                      }
                    }}
                    disabled={addingCustomUni}
                    className="bg-[#000666] text-white px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-[#1a237e] shrink-0"
                  >
                    {addingCustomUni ? "Analyzing..." : "Query Odds"}
                  </button>
                </div>
              </div>

              {/* Matches list expansion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matches.map((match, idx) => (
                  <div key={idx} className="bg-white border border-[#c6c5d4]/40 rounded-2xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-[#00677f] font-mono tracking-wider uppercase font-bold">{match.location}</span>
                        <h3 className="text-xl font-display font-extrabold text-[#000666]">{match.name}</h3>
                        <p className="text-xs text-[#454652]">{match.major} Admission focus</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-[#00d2ff]/10 text-[#00566a] px-3 py-1 rounded-full text-xs font-mono font-extrabold border border-[#00d2ff]/30">
                          {match.matchScore}% Match
                        </span>
                        <span className="text-[9px] text-[#454652] mt-1 uppercase font-bold tracking-wider">Estimated fit</span>
                      </div>
                    </div>

                    <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-[#eceef0] text-xs leading-relaxed text-[#454652]">
                      <strong className="text-[#000666] block mb-1 font-display">Admissions Insight:</strong>
                      {match.description}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-green-700 block">Advantages</span>
                        <ul className="text-xs space-y-1 font-medium text-[#454652]">
                          {match.pros.map((pro, pidx) => (
                            <li key={pidx} className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#380b00] block">Considerations</span>
                        <ul className="text-xs space-y-1 text-[#454652]">
                          {match.cons.map((con, cidx) => (
                            <li key={cidx} className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-[#ffdbd0] rounded-full shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#eceef0] text-xs">
                      <div className="flex gap-1">
                        {match.tags.map((t, tid) => (
                          <span key={tid} className="bg-[#eceef0] text-[#454652] text-[9px] px-2 py-0.5 rounded font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          setEssayPrompt(`Why do you want to attend ${match.name} and study ${match.major}?`);
                          setEssayText(`Ever since exploring ${profile.targetMajor}, studying at ${match.name} has been my primary goal due to their world-leading academic excellence in computational analysis...`);
                          setShowEssayModal(true);
                        }}
                        className="text-[#000666] font-bold hover:underline"
                      >
                        Write Supplement
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ROADMAP TAB VIEW */}
          {currentTab === "roadmap" && (
            <motion.div 
              key="roadmap_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-b border-[#eceef0] pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#00677f] uppercase tracking-widest block mb-1">Collegiate Milestone Checklist</span>
                  <h2 className="text-3xl font-display font-bold text-[#000666]">Your Customized Admissions Roadmap</h2>
                  <p className="text-xs text-[#454652]">Based on {profile.grade} timeline at {profile.school}. Mark tasks complete as you progress.</p>
                </div>
                
                {/* Generated checklist filter */}
                <div className="flex items-center gap-2 max-w-sm w-full md:w-auto shrink-0 pt-2 md:pt-0">
                  <select 
                    value={roadmapConfig}
                    onChange={(e) => setRoadmapConfig(e.target.value)}
                    className="bg-white py-1.5 px-3 rounded-lg border border-[#c6c5d4] text-xs font-semibold focus:ring-1 focus:ring-[#000666] focus:outline-none"
                  >
                    <option value="Ivy League Admissions">Ivy League Admissions</option>
                    <option value="Public State Honors">Public State Honors</option>
                    <option value="STEM Major Focused">STEM Major Focused</option>
                    <option value="Liberal Arts Colleges">Liberal Arts Colleges</option>
                  </select>
                  <button 
                    onClick={async () => {
                      setGeneratingCustomRoadmap(true);
                      try {
                        const res = await fetch("/api/roadmap", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ 
                            profile: { ...profile, targetMajor: `${profile.targetMajor} aiming for ${roadmapConfig}` } 
                          }),
                        });
                        const data = await res.json();
                        if (data?.steps) {
                          setRoadmap(data.steps);
                          alert(`Successfully generated newly recalibrated timeline for ${roadmapConfig}!`);
                        }
                      } catch (ex) {
                        alert("Recalibration error. Live server offline.");
                      } finally {
                        setGeneratingCustomRoadmap(false);
                      }
                    }}
                    disabled={generatingCustomRoadmap}
                    className="bg-[#000666] hover:bg-[#1a237e] text-white text-xs px-3 py-2 rounded-lg font-bold flex items-center gap-1 shrink-0"
                  >
                    {generatingCustomRoadmap ? "Recalibrating..." : "Regenerate Timeline"}
                  </button>
                </div>
              </div>

              {/* Progress visual gauge banner */}
              <div className="bg-gradient-to-r from-[#000666] to-[#00677f] rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="text-center md:text-left space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#00d2ff]">Interactive Progress Verified</span>
                  <h3 className="text-xl font-display font-bold">You are {computedProgressPercentage}% finished with your {profile.targetMajor} roadmap</h3>
                  <p className="text-xs text-white/80">Excellent momentum. Checking {completedStepsCount} out of {totalStepsCount} foundational requirements.</p>
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center font-display font-extrabold text-2xl relative shrink-0">
                  <div className="absolute inset-0 rounded-full border-4 border-[#00d2ff] animate-pulse" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 0.5 }} />
                  {computedProgressPercentage}%
                </div>
              </div>

              {/* Checklist visual timeline */}
              <div className="relative border-l-2 border-[#eceef0] ml-4 pl-6 space-y-6">
                {roadmap.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Node Circle */}
                    <div 
                      onClick={() => handleToggleStep(idx)}
                      className={`absolute -left-[35px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all ${step.status === "completed" ? "bg-green-600 text-white shadow-md scale-110" : "bg-white border-2 border-[#c6c5d4] text-[#454652] hover:border-[#00677f]"}`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <div className="w-2 h-2 bg-[#767683] rounded-full" />
                      )}
                    </div>

                    <div className="bg-white border border-[#c6c5d4]/30 hover:border-[#c6c5d4] p-5 rounded-xl shadow-xs space-y-2 transition-all">
                      <div className="flex justify-between items-start flex-wrap gap-1">
                        <span className="text-[10px] font-mono uppercase bg-[#00677f]/10 text-[#00677f] px-2.5 py-0.5 rounded-full font-bold">
                          {step.category} Requirement
                        </span>
                        <span className={`text-[10px] font-bold ${step.status === "completed" ? "text-green-600 uppercase" : "text-[#380b00] uppercase animate-pulse"}`}>
                          {step.status === "completed" ? "Approved" : "Action Required"}
                        </span>
                      </div>

                      <h3 className={`text-base font-display font-extrabold ${step.status === "completed" ? "line-through text-[#454652]/70 font-medium" : "text-[#000666]"}`}>
                        {step.title}
                      </h3>

                      <p className="text-xs text-[#454652] leading-relaxed">
                        {step.description}
                      </p>

                      <div className="pt-2 flex justify-between items-center text-xs">
                        <span className="text-[11px] text-[#454652]/70">Step {idx + 1} of {roadmap.length}</span>
                        <button 
                          onClick={() => handleToggleStep(idx)}
                          className="text-[#000666] font-bold text-xs hover:text-[#00677f]"
                        >
                          {step.status === "completed" ? "Mark incomplete" : "Approve this task"}
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CAREERS TABS VIEW */}
          {currentTab === "careers" && (
            <motion.div 
              key="careers_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-b border-[#eceef0] pb-4">
                <span className="text-xs font-mono font-extrabold text-[#00677f] uppercase tracking-widest block mb-1">Career & Academic Integration</span>
                <h2 className="text-3xl font-display font-bold text-[#000666]">High-Rigor Career Pathways & Micro-Credentials</h2>
                <p className="text-xs text-[#454652] mt-1">
                  Discover job demands, salaries, and certified university specializations matching {profile.targetMajor}.
                </p>
              </div>

              {/* Course highlighting banner */}
              <div className="bg-[#b6ebff]/30 p-5 rounded-2xl border border-[#00d2ff]/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#00566a] font-bold">
                    <Sparkles className="w-4 h-4" /> Recommended certified course
                  </div>
                  <h4 className="text-lg font-display font-bold text-[#000666]">
                    Credential Highlight: Data Ethics & Bias Mitigation
                  </h4>
                  <p className="text-xs text-[#454652]">
                    Offered by <strong>Stanford Online</strong>. Completing this specialized study increases admissions portfolio positioning for analytic applications.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Redirecting to online credential provider enrollment hub. Ensure your school GPA coordinates are synced.")}
                  className="bg-[#000666] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#1a237e] shrink-0 active:scale-97"
                >
                  Apply & Enroll
                </button>
              </div>

              {/* Career List cards */}
              <div className="space-y-6">
                {careers.map((career, idx) => (
                  <div key={idx} className="bg-white border border-[#c6c5d4]/40 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div>
                        <h3 className="text-xl font-display font-extrabold text-[#000666]">{career.title}</h3>
                        <p className="text-xs text-[#454652]">{career.description}</p>
                      </div>
                      <div className="flex gap-2 text-right shrink-0">
                        <div className="bg-[#f2f4f6] p-2.5 rounded-lg text-center font-mono">
                          <span className="text-[10px] text-[#454652] uppercase block">Salary</span>
                          <strong className="text-xs text-[#191c1e]">{career.averageSalary}</strong>
                        </div>
                        <div className="bg-[#ffdbd0] p-2.5 rounded-lg text-center font-mono">
                          <span className="text-[10px] text-red-900 uppercase block">Projected Growth</span>
                          <strong className="text-xs text-red-900">{career.growth}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Required high-rigor skills */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-[#454652] uppercase font-bold tracking-wider">Required Engineering Skills</span>
                      <div className="flex flex-wrap gap-1.5">
                        {career.requiredSkills.map((s, sidx) => (
                          <span key={sidx} className="bg-[#00d2ff]/10 text-[#00566a] px-3 py-1 rounded text-xs font-semibold">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Suggested certificate courses */}
                    <div className="space-y-2 pt-2 border-t border-[#eceef0]">
                      <span className="text-[10px] text-[#00677f] font-mono tracking-wider uppercase font-bold">Suggested certified micro-credentials</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {career.suggestedCourses.map((course, cidx) => (
                          <div key={cidx} className="bg-[#f7f9fb] p-4 rounded-xl border border-[#eceef0] space-y-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-bold text-[#000666] font-display">{course.name}</h4>
                              <span className="bg-white text-[9px] font-bold text-[#00677f] px-2 py-0.5 rounded shadow-xs shrink-0 font-mono">
                                {course.certifiedBy}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#454652] leading-relaxed">
                              {course.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROFILE EDIT TAB VIEW */}
          {currentTab === "profile" && (
            <motion.div 
              key="profile_tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="border-b border-[#eceef0] pb-4">
                <span className="text-xs font-mono font-extrabold text-[#00677f] uppercase tracking-widest block mb-1 font-bold">Academic Coordinate Manager</span>
                <h2 className="text-3xl font-display font-bold text-[#000666]">Configure Your Student Coordinates</h2>
                <p className="text-xs text-[#454652] mt-1">
                  Updating these values triggers real-time recalculations for AI insights, university matches, and career micro-recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Profile credentials form */}
                <form onSubmit={handleProfileSave} className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#c6c5d4]/30 shadow-sm space-y-4">
                  <h3 className="text-lg font-display font-extrabold text-[#000666] border-b border-[#eceef0] pb-2">Academic Profile Coordinates</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#454652]">Full Name</label>
                      <input 
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="bg-white px-3.5 py-2.5 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#454652]">High School</label>
                      <input 
                        type="text"
                        value={profileForm.school}
                        onChange={(e) => setProfileForm({ ...profileForm, school: e.target.value })}
                        className="bg-white px-3.5 py-2.5 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#454652]">Current Grade Year</label>
                      <select 
                        value={profileForm.grade}
                        onChange={(e) => setProfileForm({ ...profileForm, grade: e.target.value })}
                        className="bg-white px-3.5 py-2.5 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none"
                      >
                        <option value="Grade 12">Grade 12 (Senior)</option>
                        <option value="Grade 11">Grade 11 (Junior)</option>
                        <option value="Grade 10">Grade 10 (Sophomore)</option>
                        <option value="Grade 9">Grade 9 (Freshman)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#454652]">Target Major / Passion Area</label>
                      <input 
                        type="text"
                        value={profileForm.targetMajor}
                        onChange={(e) => setProfileForm({ ...profileForm, targetMajor: e.target.value })}
                        className="bg-white px-3.5 py-2.5 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#454652]">Cumulative GPA (unweighted)</label>
                      <input 
                        type="text"
                        value={profileForm.gpa}
                        onChange={(e) => setProfileForm({ ...profileForm, gpa: e.target.value })}
                        placeholder="e.g., 3.90"
                        className="bg-white px-3.5 py-2.5 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#454652]">Testing Score Coordinates (SAT/ACT)</label>
                      <input 
                        type="text"
                        value={profileForm.satAct}
                        onChange={(e) => setProfileForm({ ...profileForm, satAct: e.target.value })}
                        placeholder="e.g., 1540 SAT / Test Optional"
                        className="bg-white px-3.5 py-2.5 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 pt-2">
                    <label className="text-xs font-bold text-[#454652]">Core Extracurricular Highlights (one per line or comma separated)</label>
                    <textarea 
                      rows={4}
                      value={profileForm.extracurriculars}
                      onChange={(e) => setProfileForm({ ...profileForm, extracurriculars: e.target.value })}
                      placeholder="List leadership roles, sports, coding tools, clubs, volunteer work..."
                      className="bg-white p-3 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none"
                      required
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="submit"
                      className="bg-[#000666] hover:bg-[#1a237e] text-white px-6 py-2.5 rounded-full font-bold text-xs"
                    >
                      Synchronize AI Engine
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setProfileForm({ ...profile });
                        setCurrentTab("home");
                      }}
                      className="border border-[#767683] text-[#454652] px-6 py-2.5 rounded-full text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {/* Profile verification view card */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#c6c5d4]/30 shadow-sm space-y-4">
                    <h3 className="text-base font-display font-extrabold text-[#000666] border-b border-[#eceef0] pb-2">Active Coordinates</h3>
                    
                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-slate-400 block uppercase font-mono text-[9px]">Student Name</span>
                        <strong className="text-sm text-[#000666]">{profile.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block uppercase font-mono text-[9px]">Target Major</span>
                        <strong className="text-sm text-[#00677f]">{profile.targetMajor}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block uppercase font-mono text-[9px]">unweighted GPA / school</span>
                        <strong className="text-sm text-[#191c1e]">{profile.gpa} GPA @ {profile.school}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block uppercase font-mono text-[9px]">Testing Coordinate</span>
                        <strong className="text-sm text-[#191c1e]">{profile.satAct || "Not Submitted"}</strong>
                      </div>
                      <div className="pt-2">
                        <span className="text-slate-400 block uppercase font-mono text-[9px]">extracurricular highlights</span>
                        <p className="text-[#454652] leading-relaxed text-[11px] bg-[#f7f9fb] p-2.5 rounded border border-[#eceef0] mt-1 italic">
                          "{profile.extracurriculars}"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#eceef0]/50 p-4 rounded-xl border border-[#c6c5d4]/20 text-center space-y-2">
                    <Info className="w-5 h-5 text-[#00677f] mx-auto" />
                    <h4 className="text-xs font-bold text-[#000666]">How are scores determined?</h4>
                    <p className="text-[10px] text-[#454652] leading-relaxed">
                      UniPath AI uses generative structural matrices to weight course transcripts, test scores, and qualitative leadership highlights relative to previous successful admission records.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* CV ANALYZER SLIDEOUT / MODAL CHASSIS */}
      <AnimatePresence>
        {showCvModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="bg-[#000666] text-white p-5 flex justify-between items-center bg-gradient-to-r from-[#000666] to-[#00677f]">
                <div className="flex items-center gap-2">
                  <FileText className="w-5.5 h-5.5 text-[#00d2ff]" />
                  <div>
                    <h3 className="text-lg font-display font-extrabold">CV & Extracurricular Portfolio Advisor</h3>
                    <p className="text-[10px] text-white/80">Analyze candidate highlights against top-tier competitive requirements</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowCvModal(false);
                    setCvAnalysis(null);
                  }}
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[75vh] space-y-4 custom-scrollbar">
                {!cvAnalysis ? (
                  <div className="space-y-4">
                    <p className="text-xs text-[#454652]">
                      Paste your high school resume bullet points, course rigor list, or extracurricular records. The Gemini model will calculate a qualitative rating, highlight critical positives, identify structural gaps, and list certified course remedies.
                    </p>
                    <textarea 
                      rows={8}
                      value={cvText}
                      onChange={(e) => setCvText(e.target.value)}
                      placeholder={`President of Coding Club - Led weekly Python seminars...&#10;Completed AP Calculus BC (Grade: A)&#10;Varsity Cross Country runner...`}
                      className="bg-white p-3 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#000666] focus:outline-none w-full"
                    />
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => {
                          setShowCvModal(false);
                        }}
                        className="bg-[#f2f4f6] text-[#454652] text-xs px-5 py-2 rounded-full font-bold"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleAnalyzeCv}
                        disabled={isAnalyzingCv || !cvText.trim()}
                        className="bg-[#000666] text-white text-xs px-6 py-2 rounded-full font-semibold flex items-center gap-1 hover:bg-[#1a237e] disabled:opacity-50"
                      >
                        {isAnalyzingCv ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Analyzing portfolio...
                          </>
                        ) : "Analyze Rigor"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 anim-fade-in text-left">
                    {/* Score section */}
                    <div className="flex items-center gap-4 bg-[#f7f9fb] p-4 rounded-xl border border-[#eceef0]">
                      <div className="w-16 h-16 rounded-full bg-[#00677f]/10 text-[#00677f] flex items-center justify-center font-display font-extrabold text-2xl border border-[#00d2ff]/30 shrink-0">
                        {cvAnalysis.currentScore}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-mono block uppercase">Rigor Alignment Score</span>
                        <h4 className="text-sm font-bold text-[#000666]">Collegiate Portfolio Readiness Profile</h4>
                        <p className="text-[11px] text-[#454652]">Calculated match odds based on elite enrollment parameters.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider block mb-1">Strong Core Areas</span>
                        <ul className="text-xs space-y-1 text-[#454652] font-medium">
                          {cvAnalysis.positives.map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-green-500 font-bold mt-0.5">•</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[10px] text-red-950 font-bold uppercase tracking-wider block mb-1">Identified Gaps relative to Stanford/Ivies</span>
                        <ul className="text-xs space-y-1 text-[#454652]">
                          {cvAnalysis.gapAreas.map((g, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-amber-600 font-bold mt-0.5">•</span>
                              <span>{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#e0e0ff]/20 p-4 rounded-xl border border-[#000666]/10 space-y-1.5">
                        <span className="text-[10px] text-[#000666] font-mono tracking-wider uppercase font-bold block">AI Certified Course & portfolio remedies</span>
                        <ul className="text-xs space-y-1 text-[#454652] italic font-semibold">
                          {cvAnalysis.improvementSuggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#00677f] mt-0.5 font-bold">»</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-[#eceef0]">
                      <button 
                        onClick={() => {
                          setCvAnalysis(null);
                        }}
                        className="bg-[#000666] text-white text-xs px-5 py-2 rounded-full font-bold"
                      >
                        Re-analyze with updates
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMISSIONS ESSAY AUDITOR MODAL CHASSIS */}
      <AnimatePresence>
        {showEssayModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="bg-[#380b00] text-white p-5 flex justify-between items-center bg-gradient-to-r from-[#380b00] to-[#5c1800]">
                <div className="flex items-center gap-2">
                  <Brain className="w-5.5 h-5.5 text-[#ffb59d]" />
                  <div>
                    <h3 className="text-lg font-display font-extrabold text-[#ffdbd0]">Admissions Personal Essay Review</h3>
                    <p className="text-[10px] text-[#ffdbd0]/80">Proofread voice, vocabulary, and structural alignment for competitive applications</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowEssayModal(false);
                    setEssayAnalysis(null);
                  }}
                  className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[75vh] space-y-4 custom-scrollbar">
                {!essayAnalysis ? (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#454652]">University Essay Prompt (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Describe a challenge you overcame."
                        value={essayPrompt}
                        onChange={(e) => setEssayPrompt(e.target.value)}
                        className="bg-white px-3 py-1.5 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#380b00] focus:outline-none w-full"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#454652]">Essay Draft</label>
                      <textarea 
                        rows={10}
                        value={essayText}
                        onChange={(e) => setEssayText(e.target.value)}
                        placeholder="Paste your personal statement draft..."
                        className="bg-white p-3 rounded-lg border border-[#c6c5d4] text-xs focus:ring-1 focus:ring-[#380b00] focus:outline-none w-full"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => {
                          setShowEssayModal(false);
                        }}
                        className="bg-[#f2f4f6] text-[#454652] text-xs px-5 py-2 rounded-full font-bold"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleReviewEssay}
                        disabled={isReviewingEssay || !essayText.trim()}
                        className="bg-[#380b00] text-white text-xs px-6 py-2 rounded-full font-semibold flex items-center gap-1 hover:bg-[#5c1800] disabled:opacity-50"
                      >
                        {isReviewingEssay ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Critiquing essay draft...
                          </>
                        ) : "Audit Essay Style"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 anim-fade-in text-left">
                    {/* Score indicator bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      <div className="bg-[#ffdbd0]/30 p-4 rounded-xl border border-[#5c1800]/20 flex items-center justify-between col-span-1">
                        <div>
                          <span className="text-[9px] text-[#380b00] font-mono block uppercase">Style Grade</span>
                          <span className="text-3xl font-display font-extrabold text-[#380b00]">{essayAnalysis.score}</span>
                          <span className="text-[10px] text-[#380b00] uppercase block font-semibold mt-1">Collegiate Readiness</span>
                        </div>
                        <Sparkles className="w-8 h-8 text-[#5c1800]" />
                      </div>

                      <div className="bg-[#f7f9fb] p-4 rounded-xl border border-[#eceef0] col-span-2">
                        <span className="text-[9px] text-slate-400 font-mono block uppercase">Voice & Writing Style</span>
                        <strong className="text-xs text-[#000666] font-display block mt-1">{essayAnalysis.voiceStyle}</strong>
                        <p className="text-[10px] text-[#454652] leading-relaxed mt-1">Our models evaluate tone alignment relative to senior faculty admissions reviews.</p>
                      </div>

                    </div>

                    <div className="space-y-3.5">
                      <div>
                        <span className="text-xs font-extrabold uppercase text-green-700 block mb-1">Key Strengths</span>
                        <ul className="text-xs space-y-0.5 text-[#454652]">
                          {essayAnalysis.strengths.map((str, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="text-green-600 font-semibold">•</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white border border-[#eceef0] p-4 rounded-xl space-y-1">
                        <span className="text-xs font-extrabold uppercase text-[#380b00] block">Overall Critique Recommendation</span>
                        <p className="text-xs text-[#454652] leading-relaxed italic border-l-2 border-[#ffdbd0] pl-3">
                          "{essayAnalysis.critique}"
                        </p>
                      </div>

                      <div>
                        <span className="text-xs font-mono font-bold uppercase text-[#00677f] block mb-2">Target Line Rewrite Suggestions</span>
                        <div className="space-y-2">
                          {essayAnalysis.specificChanges.map((change, idx) => (
                            <div key={idx} className="bg-[#eceef0]/60 p-3 rounded-lg text-xs leading-relaxed text-[#191c1e] border-l-2 border-[#00677f]">
                              {change}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[#eceef0]">
                      <span className="text-[10px] text-[#454652]">Calculated via @google/genai model engine</span>
                      <button 
                        onClick={() => {
                          setEssayAnalysis(null);
                        }}
                        className="bg-[#380b00] text-white text-xs px-5 py-2 rounded-full font-bold"
                      >
                        Adjust Draft
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FIXED MOBILE BOTTOM NAVBAR */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-2 pb-5 bg-white border-t border-[#c6c5d4]/40 shadow-xl z-50 md:hidden rounded-t-xl">
        <button 
          onClick={() => setCurrentTab("home")} 
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all ${currentTab === "home" ? "bg-[#000666]/10 text-[#000666]" : "text-[#454652]"}`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-bold font-sans mt-0.5">Home</span>
        </button>

        <button 
          onClick={() => setCurrentTab("matcher")} 
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all ${currentTab === "matcher" ? "bg-[#000666]/10 text-[#000666]" : "text-[#454652]"}`}
        >
          <GraduationCap className="w-5 h-5" />
          <span className="text-[10px] font-bold font-sans mt-0.5">Matcher</span>
        </button>

        <button 
          onClick={() => setCurrentTab("roadmap")} 
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all ${currentTab === "roadmap" ? "bg-[#000666]/10 text-[#000666]" : "text-[#454652]"}`}
        >
          <Milestone className="w-5 h-5" />
          <span className="text-[10px] font-bold font-sans mt-0.5">Roadmap</span>
        </button>

        <button 
          onClick={() => setCurrentTab("careers")} 
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all ${currentTab === "careers" ? "bg-[#000666]/10 text-[#000666]" : "text-[#454652]"}`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold font-sans mt-0.5">Careers</span>
        </button>

        <button 
          onClick={() => setCurrentTab("profile")} 
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all ${currentTab === "profile" ? "bg-[#000666]/10 text-[#000666]" : "text-[#454652]"}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold font-sans mt-0.5">Profile</span>
        </button>
      </nav>

    </div>
  );
}
