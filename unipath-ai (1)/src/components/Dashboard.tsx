import React from 'react';
import { Screen, TransitionType } from '../types';
import { Header, BottomNav } from './Navigation';
import { Sparkles, Calendar, ArrowRight, CheckCircle2, Award, Globe, BookOpen, Landmark, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: Screen, transitionType: TransitionType) => void;
  grades: string;
  subjects: string;
  maxBudget: number;
}

export default function Dashboard({ onNavigate, grades, subjects, maxBudget }: DashboardProps) {
  // Demo top matches
  const topMatches = [
    {
      id: 'uni-1',
      name: 'Stanford University',
      location: 'Stanford, CA',
      major: 'Computer Science',
      matchScore: 92,
      tags: ['High Research Output', 'Top 1% Faculty'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB_ijBAWHsZxbQqHtCWMNmmT-u3jGbts-kM4QC5WF0ReB7JlWmib2fFW-_ok1OVu2-C1zaUoEmwv-Y2nCPRADTa5tllWi5JCnvR2RJp0WK5k6lzSXJbcpOCp2VwASqieB283oR42OOv7_jDuVU4s17uuqFqKq3mvcOOLFfcGCL9WKuUdY8uPs20PzP34M0EVAI3j_8pScO2rGcFFoMtgzaD0h54WCDjzahM8oAhUjIXdEvQ-QqdD7mc2TQDwVIro2XVwVaSd8IX5cq'
    },
    {
      id: 'uni-2',
      name: 'MIT',
      location: 'Cambridge, MA',
      major: 'Data Science',
      matchScore: 89,
      tags: ['Innovation Hub', 'Global Reach'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn_ke9ZHlp5uAoQZi0GB1Zp2Xe6zlTQYp0qTeqaEhwdeRMKFFHqpIdAlOfcowaXzEVLL5BIg5A7YREivWvE7R4EeSQL1ZBZfdUgGUefn6UmOILl-l66iqnZmUSpJ5_OuPKXJ2GF1CMHq6cHKficzbHpXlG2SNNhuQu2Ead5zOqIo7QBFWef0S-PTHd_5yzRJv3QgNHkzUcLZD-FuV-t_4eCt5hNV89oqd--s-Z55ibMYJabbgbeYqOQcd1CCIucLzPp_4jLcmhAmDA'
    },
    {
      id: 'uni-8',
      name: 'Carnegie Mellon',
      location: 'Pittsburgh, PA',
      major: 'AI Engineering',
      matchScore: 87,
      tags: ['AI Pioneer', 'Industry Linked'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPNa9kalTCpA0fl7ERoONjn5V6SHelqrVZhIZ-UDyY2ShNG5NhUPBfPfz_JWG4EslCdv02fLkwJb7enAtCsXwALTjrhSruiYfe69yz5RRXKMDV99rXqEGKFBc7_bvIfeJeguYCqso5HMHqpeAP1bcDUhF9EVJfiRlsp8j3cqKt9SqIhIbMeu4xbsksrmYv4VMvZE4wEpywjnwzdDTS9FEZJW0Qt_366ks3hnjATpWtchHD9gFHXQkWY7WhNtVNm4GyxE3-PYsgRt9N'
    }
  ];

  return (
    <div className="bg-background min-h-screen text-on-surface font-sans pb-24">
      {/* Top App Bar */}
      <Header currentScreen="Dashboard" onNavigate={onNavigate} />

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg space-y-stack-lg">
        {/* Header: Student Profile Summary */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md pt-4">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-1 tracking-tight">
              Welcome back, Alex
            </h1>
            <p className="font-body-lg text-lg text-on-surface-variant font-medium">
              Grade 12 • Aspiring Data Scientist • Palo Alto High
            </p>
          </div>
          
          <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/30 shadow-sm flex items-center justify-between gap-stack-md max-w-sm">
            <div className="text-left pr-4">
              <p className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider">
                Next Deadline
              </p>
              <p className="text-xl font-display font-semibold text-tertiary-container">
                Oct 15: Early Action
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
              <span className="material-symbols-outlined">event</span>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* AI Insight of the Day (Glassmorphism) */}
          <div className="md:col-span-8 glass-panel rounded-xl p-stack-lg ai-glow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-gutter opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-9xl">auto_awesome</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-stack-md">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>spark</span>
                <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest">AI Insight of the Day</span>
              </div>
              <h2 className="text-2xl font-display font-bold text-primary mb-stack-sm leading-tight">
                Strengthen your Portfolio with "Data Ethics"
              </h2>
              <p className="font-body-md text-base text-on-surface-variant max-w-2xl mb-stack-lg leading-relaxed">
                Based on your interest in Data Science and top-tier university requirements, completing a certified course in <span className="font-bold text-primary">Data Ethics</span> would increase your Match Score for Stanford by <span className="text-secondary font-bold text-lg">+4%</span>.
              </p>
              <div className="flex flex-wrap gap-stack-sm pt-2">
                <button 
                  onClick={() => onNavigate('Career Explorer', 'push')}
                  className="bg-primary text-on-primary px-gutter py-3 rounded-full font-bold flex items-center gap-2 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  Explore Courses <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
                <button 
                  onClick={() => alert("Added to your reminders. You will get a notification before Course closure.")}
                  className="border border-outline text-primary px-gutter py-3 rounded-full font-bold hover:bg-surface-container-high transition-all cursor-pointer"
                >
                  Remind Me Later
                </button>
              </div>
            </div>
          </div>

          {/* Your Journey Progress */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-stack-lg border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-display font-bold text-primary mb-1">Your Journey</h3>
              <p className="text-sm font-body-md text-on-surface-variant mb-stack-lg">Profile Completion</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-secondary bg-secondary-fixed">
                      85% Complete
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-secondary font-mono">
                      Step 4 of 5
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded bg-surface-container-highest">
                  <div 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-primary to-secondary transition-all duration-1000" 
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>
            </div>
            <ul className="space-y-stack-sm mt-4">
              <li className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-green-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-semibold text-xs uppercase font-mono tracking-wide">Academic Transcript Uploaded</span>
              </li>
              <li className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-green-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span className="font-semibold text-xs uppercase font-mono tracking-wide">Extracurriculars Verified</span>
              </li>
              <li className="flex items-center gap-2 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-lg">pending</span>
                <span className="font-bold text-xs uppercase font-mono tracking-wide text-primary">Personal Essay Review</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="pt-2">
          <h3 className="text-xl font-display font-bold text-primary mb-stack-md">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-stack-md">
            {/* Action 1: University Matching -> push to Matcher */}
            <button 
              id="quick-matcher"
              onClick={() => onNavigate('University Matcher', 'push')}
              className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm hover:border-secondary transition-all group text-center cursor-pointer active:scale-95"
            >
              <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-stack-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-2xl">school</span>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase block">University Matching</span>
            </button>

            {/* Action 2: CV Analysis -> push to CV Analyzer */}
            <button 
              id="quick-cv"
              onClick={() => onNavigate('CV Analyzer', 'push')}
              className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm hover:border-secondary transition-all group text-center cursor-pointer active:scale-95"
            >
              <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center mx-auto mb-stack-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary text-2xl">description</span>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase block">CV Analysis</span>
            </button>

            {/* Action 3: Career Explorer -> push to Career Explorer */}
            <button 
              id="quick-career"
              onClick={() => onNavigate('Career Explorer', 'push')}
              className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm hover:border-secondary transition-all group text-center cursor-pointer active:scale-95"
            >
              <div className="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center mx-auto mb-stack-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-tertiary text-2xl">explore</span>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase block">Career Explorer</span>
            </button>

            {/* Action 4: Scholarships */}
            <button 
              onClick={() => alert('Scholarships Finder tool is being loaded! You have qualified for 3 pre-vetted options based on your GPA/A* benchmarks.')}
              className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant/30 shadow-sm hover:border-secondary transition-all group text-center cursor-pointer active:scale-95"
            >
              <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto mb-stack-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-surface text-2xl">payments</span>
              </div>
              <span className="font-mono text-xs font-bold text-on-surface-variant uppercase block">Scholarships</span>
            </button>
          </div>
        </section>

        {/* Top Matches Section */}
        <section className="pt-2">
          <div className="flex justify-between items-end mb-stack-md">
            <h3 className="text-xl font-display font-bold text-primary">Top University Matches</h3>
            <a 
              className="text-secondary font-bold text-xs uppercase font-mono flex items-center gap-1 cursor-pointer hover:underline"
              onClick={() => onNavigate('University Matcher', 'none')}
            >
              View All <span className="material-symbols-outlined text-sm">chevron_right</span>
            </a>
          </div>
          
          <div className="flex gap-gutter overflow-x-auto pb-4 custom-scrollbar snap-x scroll-smooth">
            {topMatches.map((match) => (
              <div 
                key={match.id}
                onClick={() => onNavigate('University Matcher', 'push')}
                className="min-w-[290px] md:min-w-[360px] bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden snap-start hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="h-36 relative overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={match.name} 
                    src={match.image} 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {match.matchScore}% Match
                  </div>
                </div>
                <div className="p-stack-md">
                  <h4 className="text-lg font-display font-bold text-primary group-hover:text-secondary transition-colors">
                    {match.name}
                  </h4>
                  <p className="text-sm font-mono text-on-surface-variant mt-1 mb-3">
                    {match.location} • {match.major}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {match.tags.map((tag, idx) => (
                      <span key={idx} className="bg-surface-container text-on-surface px-2 py-1 rounded text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Embedded Navigation */}
      <BottomNav currentScreen="Dashboard" onNavigate={onNavigate} />
    </div>
  );
}
