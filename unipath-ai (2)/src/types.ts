export interface StudentProfile {
  name: string;
  grade: string;
  targetMajor: string;
  school: string;
  gpa: string;
  satAct: string;
  extracurriculars: string;
}

export interface UniversityMatch {
  name: string;
  location: string;
  major: string;
  matchScore: number;
  tags: string[];
  description: string;
  pros: string[];
  cons: string[];
}

export interface CareerOption {
  title: string;
  description: string;
  averageSalary: string;
  growth: string;
  requiredSkills: string[];
  suggestedCourses: {
    name: string;
    description: string;
    certifiedBy: string;
  }[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "pending";
  category: "Academic" | "Test" | "Activities" | "Admissions";
}

export interface CVAnalysisResult {
  currentScore: number;
  positives: string[];
  gapAreas: string[];
  improvementSuggestions: string[];
}

export interface EssayReviewResult {
  score: number;
  strengths: string[];
  critique: string;
  voiceStyle: string;
  specificChanges: string[];
}
