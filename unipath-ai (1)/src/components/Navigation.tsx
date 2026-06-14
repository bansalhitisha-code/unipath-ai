import React from 'react';
import { Screen, TransitionType } from '../types';
import { Sparkles, Menu } from 'lucide-react';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen, transitionType: TransitionType) => void;
}

export function Header({ currentScreen, onNavigate }: NavigationProps) {
  return (
    <header className="bg-surface-bright/80 backdrop-blur-md border-b border-outline-variant/20 shadow-sm docked full-width top-0 sticky z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-16">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('Dashboard', 'none')}>
          {/* User profile image in Header */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
            <img 
              alt="Student Profile Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmK4vgZUN8eJz0inZ54SFgwvLjRXFPx1UpdjR-V20FFsPpN11QzLLZp1UGUR_WgFfDCc1zNTM4pqxc5J6D2aFQBZpx0sv_BNsrMwkNBoEsDpHwpHIPYghAtPQlqHiElzMfa1_3qR5utn-29iEg_aI1UhJx9Ew5zaZIvfL5slDnZ4EFEAf7F8uXNU3c_FQP2hnXgmKWIlkd6Pfo9JIjF45gN7cUFI3fCrmHPIXu07RNHLyT9jkOeReG74WY2OdDGs0fmirYTcrvpL40" 
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-headline-md font-display font-bold text-primary tracking-tight">UniPath AI</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            <a 
              className={`font-semibold cursor-pointer transition-colors hover:bg-surface-container-high/50 px-3 py-1 rounded-lg ${
                currentScreen === 'Dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
              onClick={(e) => { e.preventDefault(); onNavigate('Dashboard', 'none'); }}
            >
              <span>Home</span>
            </a>
            <a 
              className={`font-semibold cursor-pointer transition-colors hover:bg-surface-container-high/50 px-3 py-1 rounded-lg ${
                currentScreen === 'University Matcher' ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
              onClick={(e) => { e.preventDefault(); onNavigate('University Matcher', 'none'); }}
            >
              <span>Matcher</span>
            </a>
            <a 
              className={`font-semibold cursor-pointer transition-colors hover:bg-surface-container-high/50 px-3 py-1 rounded-lg ${
                currentScreen === 'Roadmap Generator' ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
              onClick={(e) => { e.preventDefault(); onNavigate('Roadmap Generator', 'none'); }}
            >
              <span>Roadmap</span>
            </a>
            <a 
              className={`font-semibold cursor-pointer transition-colors hover:bg-surface-container-high/50 px-3 py-1 rounded-lg ${
                currentScreen === 'Career Explorer' ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
              onClick={(e) => { e.preventDefault(); onNavigate('Career Explorer', 'none'); }}
            >
              <span>Careers</span>
            </a>
            <a 
              className={`font-semibold cursor-pointer transition-colors hover:bg-surface-container-high/50 px-3 py-1 rounded-lg ${
                currentScreen === 'CV Analyzer' ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
              onClick={(e) => { e.preventDefault(); onNavigate('CV Analyzer', 'none'); }}
            >
              <span>Profile</span>
            </a>
          </nav>
          <button 
            className="text-primary hover:bg-surface-container-high/50 p-2 rounded-full transition-all active:scale-95 flex items-center justify-center cursor-pointer"
            onClick={() => onNavigate('CV Analyzer', 'push')}
            title="AI Profile Summary"
          >
            <Sparkles className="w-5 h-5 text-secondary" />
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button 
            className="text-primary p-2 flex items-center justify-center"
            onClick={() => onNavigate('CV Analyzer', 'push')}
            title="Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomNav({ currentScreen, onNavigate }: NavigationProps) {
  // Define standard items with icon strings or render them
  const navItems: { screen: Screen; label: string; icon: string; matchKey: string }[] = [
    { screen: 'Dashboard', label: 'Home', icon: 'dashboard', matchKey: 'Home' },
    { screen: 'University Matcher', label: 'Matcher', icon: 'school', matchKey: 'Matcher' },
    { screen: 'Roadmap Generator', label: 'Roadmap', icon: 'timeline', matchKey: 'Roadmap' },
    { screen: 'Career Explorer', label: 'Careers', icon: 'explore', matchKey: 'Careers' },
    { screen: 'CV Analyzer', label: 'Profile', icon: 'account_circle', matchKey: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 bg-surface border-t border-outline-variant/30 shadow-[0px_-4px_20px_rgba(26,35,126,0.04)] z-50 rounded-t-xl">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen;
        
        let iconSpan = <span className="material-symbols-outlined">dashboard</span>;
        if (item.icon === 'school') iconSpan = <span className="material-symbols-outlined">school</span>;
        if (item.icon === 'timeline') iconSpan = <span className="material-symbols-outlined">timeline</span>;
        if (item.icon === 'explore') iconSpan = <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>explore</span>;
        if (item.icon === 'account_circle') iconSpan = <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>account_circle</span>;

        return (
          <a
            key={item.screen}
            className={`flex flex-col items-center justify-center cursor-pointer transition-all px-4 py-1.5 ${
              isActive 
                ? 'bg-primary-container text-on-primary-container rounded-full scale-90 px-6 font-bold shadow-sm' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
            onClick={(e) => { e.preventDefault(); onNavigate(item.screen, 'none'); }}
          >
            {iconSpan}
            <span className="text-label-sm font-label-sm">{item.matchKey}</span>
          </a>
        );
      })}
    </nav>
  );
}
