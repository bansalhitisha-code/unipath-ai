import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to check if API key exists and initialize Gemini lazily
function getGeminiClient(): { ai: GoogleGenAI | null; err: string | null } {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return { ai: null, err: "GEMINI_API_KEY is not defined. Using high-fidelity smart data mode." };
  }
  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    return { ai, err: null };
  } catch (ex: any) {
    return { ai: null, err: ex?.message || "Failed to initialize Google GenAI SDK" };
  }
}

// 1. API Endpoint: AI Insight of the Day
app.post("/api/insights", async (req: Request, res: Response) => {
  const { profile } = req.body;
  const { ai, err } = getGeminiClient();

  if (err || !ai) {
    // High-fidelity fallback based on name or field
    const isDataSci = (profile?.targetMajor || "").toLowerCase().includes("data") || (profile?.targetMajor || "").toLowerCase().includes("scien") || (profile?.targetMajor || "").toLowerCase().includes("comp");
    return res.json({
      insightHeadline: isDataSci ? `Strengthen your Portfolio with "Data Ethics"` : "Boost your profile with Creative Competitions",
      insightText: isDataSci 
        ? `Based on your interest in ${profile?.targetMajor || "Data Science"} and top-tier university requirements, completing a certified course in Data Ethics would increase your Match Score for Stanford by +4%.`
        : `Universities find candidates who couple ${profile?.targetMajor || "general studies"} with certified cross-disciplinary projects highly attractive.`,
      primaryActionText: "Explore Courses",
      alternativeActionText: "Remind Me Later",
      isDemo: true,
      errorInfo: err
    });
  }

  try {
    const prompt = `Based on this high school student profile, generate one high-impact AI Insight of the Day for college admissions.
    Student Profile:
    - Name: ${profile.name || "Alex"}
    - Grade: ${profile.grade || "12"}
    - Target Major / Area: ${profile.targetMajor || "Data Science"}
    - Current GPA: ${profile.gpa || "3.90"}
    - Key Extracurriculars: ${profile.extracurriculars || "None listed"}
    - High School: ${profile.school || "Palo Alto High"}

    Generate a JSON response conforming to this schema:
    {
      "insightHeadline": "e.g., Strengthen your Portfolio with 'Data Ethics'",
      "insightText": "A professional 2-3 sentence personalized analysis stating why/how they should improve or strengthen their portfolio for elite universities based on their specific target major.",
      "primaryActionText": "e.g., Explore Courses",
      "alternativeActionText": "e.g., Remind Me Later"
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insightHeadline: { type: Type.STRING },
            insightText: { type: Type.STRING },
            primaryActionText: { type: Type.STRING },
            alternativeActionText: { type: Type.STRING }
          },
          required: ["insightHeadline", "insightText", "primaryActionText", "alternativeActionText"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (ex: any) {
    res.json({
      insightHeadline: `Strengthen your Portfolio with "Data Ethics"`,
      insightText: `Based on your interest in ${profile?.targetMajor || "Data Science"} and top-tier university requirements, completing a certified course in Data Ethics would increase your Match Score for Stanford by +4%.`,
      primaryActionText: "Explore Courses",
      alternativeActionText: "Remind Me Later",
      isDemo: true,
      errorInfo: ex?.message || "Gemini speed limit exceeded or parse failure."
    });
  }
});

// 2. API Endpoint: University Matching
app.post("/api/match", async (req: Request, res: Response) => {
  const { profile } = req.body;
  const { ai, err } = getGeminiClient();

  if (err || !ai) {
    // Fallback sample data
    return res.json({
      matches: [
        {
          name: "Stanford University",
          location: "Stanford, CA",
          major: profile?.targetMajor || "Computer Science",
          matchScore: 92,
          tags: ["High Research Output", "Top 1% Faculty", "Silicon Valley Hub"],
          description: "An expansive campus featuring world-class departments. Excellent fit for your target interest and current stellar credentials.",
          pros: ["Direct connection to top tech firms", "Strong entrepreneurship environment", "Flexible curriculum"],
          cons: ["Extremely low acceptance rate (<4%)", "High cost of living in Palo Alto"]
        },
        {
          name: "MIT",
          location: "Cambridge, MA",
          major: profile?.targetMajor || "Data Science",
          matchScore: 89,
          tags: ["Innovation Hub", "Global Reach", "Quantitative Pioneer"],
          description: "The global epicenter of technology, engineering, and computing science. Perfect alignment with your rigorous course interests.",
          pros: ["Unmatched analytical peer group", "Undergraduate Research Opportunities (UROP)", "World-leading labs"],
          cons: ["Very cold winters", "Highly stressful academic pace"]
        },
        {
          name: "Carnegie Mellon University",
          location: "Pittsburgh, PA",
          major: profile?.targetMajor || "AI Engineering",
          matchScore: 87,
          tags: ["AI Pioneer", "Industry Linked", "Project Focused"],
          description: "Widely regarded as the first university to emphasize artificial intelligence as a separate discipline. Excellent technical match.",
          pros: ["Renowned School of Computer Science", "Unparalleled hands-on projects", "Strong career placement"],
          cons: ["Intense coursework load", "Less campus-wide athletics excitement"]
        },
        {
          name: "UC Berkeley",
          location: "Berkeley, CA",
          major: profile?.targetMajor || "Computer Science",
          matchScore: 85,
          tags: ["Public Ivy", "Nobel Laureates", "Vibrant Activism"],
          description: "Top-tier public institution with an esteemed CS and data science division right in the East Bay, highly competitive.",
          pros: ["State-school pricing for in-state students", "Pioneering faculty in ML & logic", "Incredible student diversity"],
          cons: ["Large introductory class sizes", "Complex registration systems"]
        }
      ],
      isDemo: true
    });
  }

  try {
    const prompt = `Match the student profile below to 4 top-tier universities.
    Choose elite universities that fit the student's fields (e.g. Stanford, MIT, Harvard, Caltech, UC Berkeley, Cornell, Carnegie Mellon, Princeton).
    For each, calculate a personalized "matchScore" (integer 0-100) based on target major, GPA, test scores, etc.
    
    Student Profile:
    - Name: ${profile.name || "Alex"}
    - Grade: ${profile.grade || "12"}
    - Target Major / Area: ${profile.targetMajor || "Data Science"}
    - Current GPA: ${profile.gpa || "3.90"}
    - Testing (SAT/ACT): ${profile.satAct || "Not Submitted / Excellent"}
    - High School: ${profile.school || "Palo Alto High"}
    - Extracurriculars: ${profile.extracurriculars || "None"}

    Generate a JSON response conforming to this schema:
    {
      "matches": [
        {
          "name": "e.g., Stanford University",
          "location": "e.g., Stanford, CA",
          "major": "e.g., Computer Science",
          "matchScore": 92,
          "tags": ["Tag1", "Tag2"],
          "description": "Short personalized 2-sentence match reasoning paragraph.",
          "pros": ["Pro point 1", "Pro point 2"],
          "cons": ["Con point 1", "Con point 2"]
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  location: { type: Type.STRING },
                  major: { type: Type.STRING },
                  matchScore: { type: Type.INTEGER },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  description: { type: Type.STRING },
                  pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                  cons: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["name", "location", "major", "matchScore", "tags", "description", "pros", "cons"]
              }
            }
          },
          required: ["matches"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (error: any) {
    res.status(500).json({ error: "Gemini query failed. Check instructions.", details: error?.message });
  }
});

// 3. API Endpoint: Admissions Roadmap
app.post("/api/roadmap", async (req: Request, res: Response) => {
  const { profile } = req.body;
  const { ai, err } = getGeminiClient();

  if (err || !ai) {
    return res.json({
      steps: [
        {
          id: "step-1",
          title: "Complete College Essay Draft",
          description: "Write a compelling Personal Statement focusing on your coding milestones or interest in " + (profile?.targetMajor || "Data Science") + ".",
          status: "completed",
          category: "Admissions"
        },
        {
          id: "step-2",
          title: "Verify Extracurricular Activities",
          description: "Update your Common App activities list with leadership and coding project details.",
          status: "completed",
          category: "Activities"
        },
        {
          id: "step-3",
          title: "Upload Academic Transcript",
          description: "Request counselor submission of high school transcripts, including junior year final grades.",
          status: "completed",
          category: "Academic"
        },
        {
          id: "step-4",
          title: "Personal Essay Review",
          description: "Run an AI polished critique on the supplement essays to optimize readability and voice.",
          status: "pending",
          category: "Admissions"
        },
        {
          id: "step-5",
          title: "Submit Early Action Applications",
          description: "Finalize application and hit submit before the upcoming October 15th deadlines.",
          status: "pending",
          category: "Admissions"
        }
      ],
      isDemo: true
    });
  }

  try {
    const prompt = `Generate a customized 5-step Admissions Roadmap list of actions for this student based on their profile and deadline timeline.
    Ensure at least 3 steps are "completed" and 2 steps are "pending" to mimic active progress.
    Student Profile:
    - Name: ${profile.name || "Alex"}
    - Grade: ${profile.grade || "12"}
    - Major: ${profile.targetMajor || "Data Science"}
    - School: ${profile.school || "Palo Alto"}
    - GPA: ${profile.gpa || "3.90"}

    Generate a JSON response conforming to this schema:
    {
      "steps": [
        {
          "id": "unique-id",
          "title": "Title of step",
          "description": "Specific 1-2 sentence recommendation description.",
          "status": "completed" or "pending",
          "category": "Academic" or "Test" or "Activities" or "Admissions"
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  status: { type: Type.STRING },
                  category: { type: Type.STRING }
                },
                required: ["id", "title", "description", "status", "category"]
              }
            }
          },
          required: ["steps"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (error: any) {
    res.status(500).json({ error: "Gemini server error", details: error?.message });
  }
});

// 4. API Endpoint: Careers and Certified Courses
app.post("/api/careers", async (req: Request, res: Response) => {
  const { profile } = req.body;
  const { ai, err } = getGeminiClient();

  if (err || !ai) {
    return res.json({
      careers: [
        {
          title: "Senior Data Scientist",
          description: "Analyze vast quantities of data to extract insights, train predictive models, and guide organizational strategy.",
          averageSalary: "$145,000 - $185,000",
          growth: "+24% over next 10 years",
          requiredSkills: ["Machine Learning", "Python", "SQL", "Statistics", "Deep Learning"],
          suggestedCourses: [
            {
              name: "Data Ethics & Bias Mitigation",
              description: "Learn how to detect fairness issues and build trust into artificial intelligence algorithms.",
              certifiedBy: "Stanford Online"
            },
            {
              name: "Advanced Applied Statistics",
              description: "Rigorous statistical inference, hypothesis testing, and Bayesian modeling for high dimensions.",
              certifiedBy: "HarvardX"
            }
          ]
        },
        {
          title: "AI Engineer / MLOps",
          description: "Scale high-performance deep leaning models into production systems and manage visual models lifecycle.",
          averageSalary: "$160,000 - $210,000",
          growth: "+33% over next 10 years",
          requiredSkills: ["PyTorch", "Kubernetes", "AWS/GCP Architecture", "Model Validation"],
          suggestedCourses: [
            {
              name: "Machine Learning Engineering for Production",
              description: "Build robust CI/CD pipelines for validating and monitoring machine learning software.",
              certifiedBy: "DeepLearning.AI"
            }
          ]
        },
        {
          title: "Quantitative Systems Analyst",
          description: "Leverage advanced physics-based, stochastic, and computer simulations to analyze global risks or financial trading systems.",
          averageSalary: "$175,000 - $230,000",
          growth: "+18% flat",
          requiredSkills: ["Quantitative Modeling", "C++", "Monte Carlo Simulations", "Financial Logic"],
          suggestedCourses: [
            {
              name: "Intro to Quantitative Methods",
              description: "Mathematical modeling of structural equations, regression analysis, and derivative assets.",
              certifiedBy: "MIT OpenCourseWare"
            }
          ]
        }
      ],
      isDemo: true
    });
  }

  try {
    const prompt = `Suggest 3 top high-impact career fields and matching micro-credentials for a student with this profile:
    Student Profile:
    - Name: ${profile.name || "Alex"}
    - Major: ${profile.targetMajor || "Data Science"}
    - Extracurriculars: ${profile.extracurriculars || "Data science and coding"}
    - Grade: ${profile.grade || "12"}

    For each career path, provide suggested certified online courses (such as HarvardX, Coursera, Stanford Online, etc.) that can increase their university match score. Include titles, salaries, growth projections, required skills, and course information.

    Generate a JSON response conforming to this schema:
    {
      "careers": [
        {
          "title": "Job Title",
          "description": "Job description paragraph",
          "averageSalary": "e.g., $145,000",
          "growth": "Growth percentage/outlook",
          "requiredSkills": ["Skill 1", "Skill 2"],
          "suggestedCourses": [
            {
              "name": "Course Title",
              "description": "Description of what they will learn",
              "certifiedBy": "e.g., Stanford Online"
            }
          ]
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            careers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  averageSalary: { type: Type.STRING },
                  growth: { type: Type.STRING },
                  requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                  suggestedCourses: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        certifiedBy: { type: Type.STRING }
                      },
                      required: ["name", "description", "certifiedBy"]
                    }
                  }
                },
                required: ["title", "description", "averageSalary", "growth", "requiredSkills", "suggestedCourses"]
              }
            }
          },
          required: ["careers"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (error: any) {
    res.status(500).json({ error: "Gemini query failed", details: error?.message });
  }
});

// 5. API Endpoint: Resume / CV Analyzer (Upload & Critique)
app.post("/api/analyze-cv", async (req: Request, res: Response) => {
  const { cvText, profile } = req.body;
  const { ai, err } = getGeminiClient();

  if (err || !ai) {
    return res.json({
      currentScore: 78,
      positives: [
        "Strong academic foundation with high GPA (" + (profile?.gpa || "3.90") + ")",
        "Clear alignment with target field: " + (profile?.targetMajor || "Data Science"),
        "Outstanding math/science base coursework listed"
      ],
      gapAreas: [
        "Needs more leadership representation in tech organizations",
        "Lacks certified credentials in specializations like Data Ethics or ML",
        "No research publications or independent tech whitepapers mentioned"
      ],
      improvementSuggestions: [
        "Complete and list highly visible credentials (e.g., Stanford Online's 'Data Ethics')",
        "Expand independent github project descriptions from passive usage to active contribution",
        "Seek a teacher-guided research paper or join a regional science fair"
      ],
      isDemo: true
    });
  }

  try {
    const prompt = `Critique the student's CV/Resume text specifically for elite collegiate admissions in their major.
    Student Profile:
    - Target Major: ${profile?.targetMajor || "Data Science"}
    - GPA: ${profile?.gpa || "3.9"}
    - Extracurriculars: ${profile?.extracurriculars || ""}
    
    Resume / CV Content:
    ${cvText}

    Analyze this and return a helpful score (0-100), key positive aspects, gap areas, and dynamic improvement recommendations.
    
    Generate a JSON response conforming to this schema:
    {
      "currentScore": 82,
      "positives": ["Point 1", "Point 2"],
      "gapAreas": ["Gap 1", "Gap 2"],
      "improvementSuggestions": ["Suggestion 1", "Suggestion 2"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            currentScore: { type: Type.INTEGER },
            positives: { type: Type.ARRAY, items: { type: Type.STRING } },
            gapAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["currentScore", "positives", "gapAreas", "improvementSuggestions"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (error: any) {
    res.status(500).json({ error: "Gemini server failed", details: error?.message });
  }
});

// 6. API Endpoint: Admissions Personal Essay Review
app.post("/api/review-essay", async (req: Request, res: Response) => {
  const { essayText, promptText, profile } = req.body;
  const { ai, err } = getGeminiClient();

  if (err || !ai) {
    return res.json({
      score: 84,
      strengths: [
        "Raw authenticity in describing personal growth",
        "Strong connection between junior year math lab and future " + (profile?.targetMajor || "Data Science") + " goals",
        "Clear, readable sentence mechanics"
      ],
      critique: "The essay starts extremely well, but shifts focus too heavily to general class projects in the middle. Focus more on your own personal values and decisions rather than list-like descriptions of school assignments.",
      voiceStyle: "Refined Academic & Sincere, with room to increase direct impact.",
      specificChanges: [
        "In Paragraph 2, replace: 'We were assigned a project about analytics.' with: 'I initiated an analysis on local microclimates, discovering the beauty of chaotic structures.'",
        "Trim the detailed description of your chemistry class in Paragraph 3 by 40 words to emphasize your independent studies.",
        "Strengthen the final sentence to link your data ethical drive with Stanford's open-minded community culture."
      ],
      isDemo: true
    });
  }

  try {
    const prompt = `Review this high school student's college admissions essay supplement.
    Student Target Major: ${profile?.targetMajor || "Data Science"}
    Optional University Prompt: ${promptText || "General Personal Statement"}
    
    Essay Content:
    ${essayText}

    Analyze the suplement essay for admissions into top competitive schools. Provide an overall rating/score (0-100), key strengths, constructive critique, analysis of voice/writing style, and lists of 3-4 highly specific actionable line rewrite recommendations.

    Generate a JSON response conforming to this schema:
    {
      "score": 85,
      "strengths": ["Strength 1", "Strength 2"],
      "critique": "A professional paragraph critique",
      "voiceStyle": "Brief 1-sentence assessment of writing voice",
      "specificChanges": ["Actionable rewrite change 1", "Actionable rewrite change 2"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            critique: { type: Type.STRING },
            voiceStyle: { type: Type.STRING },
            specificChanges: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "strengths", "critique", "voiceStyle", "specificChanges"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isDemo: false });
  } catch (error: any) {
    res.status(500).json({ error: "Gemini server failed", details: error?.message });
  }
});

// Configure Vite middleware or production static files server
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully at http://0.0.0.0:${PORT}`);
  });
}

setupServer();
