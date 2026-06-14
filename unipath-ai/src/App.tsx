import React, { useState } from 'react';
import { Screen, TransitionType, Achievement, RoadmapStep } from './types';
import { initialAchievements, initialRoadmapSteps, initialCareers } from './data';
import TransitionWrapper from './components/TransitionWrapper';
import Dashboard from './components/Dashboard';
import UniversityMatcher from './components/UniversityMatcher';
import CVAnalyzer from './components/CVAnalyzer';
import RoadmapGenerator from './components/RoadmapGenerator';
import CareerExplorer from './components/CareerExplorer';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Dashboard');
  const [transitionType, setTransitionType] = useState<TransitionType>('none');

  // Shared application state that updates reactively across pages!
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>(initialRoadmapSteps);
  
  // Profile settings
  const [grades, setGrades] = useState<string>("A* Distinction");
  const [subjects, setSubjects] = useState<string>("Math, Phys, CS");
  const [maxBudget, setMaxBudget] = useState<number>(40000);

  // Triggering smooth screen transitions
  const handleNavigate = (screen: Screen, transition: TransitionType) => {
    setTransitionType(transition);
    setCurrentScreen(screen);
  };

  // Add achievement from the CV Analyzer Manual Add form
  const handleAddAchievement = (newAch: Achievement) => {
    setAchievements([newAch, ...achievements]);
    
    // Also mark Kaggle Competition Step (Step 4) as unlocked or in_progress when an achievement is added manually!
    setRoadmapSteps(prev =>
      prev.map(step => 
        step.id === 'step-4' 
          ? { ...step, status: 'IN_PROGRESS' } 
          : step
      )
    );
  };

  // Toggle or complete steps inside the Roadmap Generator
  const handleToggleRoadmapStep = (stepId: string) => {
    setRoadmapSteps(prev =>
      prev.map(step => {
        if (step.id === stepId) {
          const nextStatus = step.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
          return { ...step, status: nextStatus };
        }
        return step;
      })
    );
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'Dashboard':
        return (
          <Dashboard 
            onNavigate={handleNavigate} 
            grades={grades} 
            subjects={subjects} 
            maxBudget={maxBudget} 
          />
        );
      case 'University Matcher':
        return (
          <UniversityMatcher 
            onNavigate={handleNavigate} 
            grades={grades} 
            subjects={subjects} 
            maxBudget={maxBudget} 
          />
        );
      case 'CV Analyzer':
        return (
          <CVAnalyzer 
            onNavigate={handleNavigate} 
            achievements={achievements} 
            onAddAchievement={handleAddAchievement} 
          />
        );
      case 'Roadmap Generator':
        return (
          <RoadmapGenerator 
            onNavigate={handleNavigate} 
            steps={roadmapSteps} 
            onToggleStep={handleToggleRoadmapStep} 
          />
        );
      case 'Career Explorer':
        return (
          <CareerExplorer 
            onNavigate={handleNavigate} 
            careers={initialCareers} 
          />
        );
      default:
        return (
          <Dashboard 
            onNavigate={handleNavigate} 
            grades={grades} 
            subjects={subjects} 
            maxBudget={maxBudget} 
          />
        );
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <TransitionWrapper 
          key={currentScreen} 
          transitionType={transitionType} 
          screenKey={currentScreen}
        >
          {renderActiveScreen()}
        </TransitionWrapper>
      </AnimatePresence>
    </div>
  );
}
