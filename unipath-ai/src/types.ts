export type Screen = 'Dashboard' | 'University Matcher' | 'CV Analyzer' | 'Roadmap Generator' | 'Career Explorer';

export type TransitionType = 'none' | 'push' | 'slide_up';

export interface Achievement {
  id: string;
  type: 'Technical' | 'Leadership' | 'Academic' | 'Other';
  title: string;
  subtitle: string;
  year: string;
  verified: boolean;
}

export interface UniversityMatch {
  id: string;
  name: string;
  location: string;
  major: string;
  matchScore: number;
  category: 'Reach' | 'Target' | 'Safety';
  tags: string[];
  image: string;
  aiLogic: string;
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  type: string;
  title: string;
  desc: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED';
  progress?: number;
  tags?: string[];
  aiRecommended?: boolean;
}

export interface CareerInfo {
  id: string;
  title: string;
  desc: string;
  matchScore: number;
  aiPick?: boolean;
  salaryRange: string;
  degree: string;
  skills: { name: string; complexity: 'Expert' | 'Advanced' | 'Moderate' | 'Basic'; levelSymbol: string }[];
}
