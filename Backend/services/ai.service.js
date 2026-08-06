import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import 'dotenv/config'
const ai = new GoogleGenAI({
    apiKey:process.env.GoogleGenAI_APIKEY
});

const interviewReportSchema = z.object({
    technicalquestions:z.array(z.object({
  question: z.string().describe("The technical question can be asked in interview"),
  intenton: z.string().describe("The intention of interviewer behind asking this question"),
answer: z.string().describe("How to answer this question, what points to cover,what approach to take etc."),
    })).describe("Technical question that can be asked in interview along with the intention and how to answer them")
,
    behavioralquestions: z.array(z.object({
  question: z.string().describe("The technical question can be asked in interview"),
  intenton: z.string().describe("The intention of interviewer behind asking this question"),
answer: z.string().describe("How to answer this question, what points to cover,what approach to take etc."),
    })).describe("Behavioral question that can be asked in interview along with the intention and how to answer them"),
    skillgap: z.array(z.object({
  skill: z.string().describe("The skill which the candidate is lacking"),
  severity: z.enum(["low","medium","high"]).describe("The severity of skll gap"),
    })).describe("List of skill gap in candidate's profile along with their severity"),
    preparationplan:z.array(z.object({
 day: z.string().describe("The day number in preparation plan, starting from 1"),
  focus: z.string().describe("main focus of this day in preparation plan"),
  tasks: z.array(z.string()).describe("List of tasks for this day"),
    })).describe("A day-wise preparation plan"),
    matchScore: z.number().describe("How well the resume matches the job description, 0 to 100"),

});
async function generateInterviewReport({resume,selfdescription,jobdescription}){
    const prompt = `Generate an interview report for a candidate with following details:
    Resume:${resume}
    self description:${selfdescription}
    job description:${jobdescription}
    Rules:
- Generate general questions based on skills and job role, NOT specific to candidate's projects
- Each array item must be a JSON object, NOT a string
- severity must be exactly "low", "medium", or "high"
- Generate at least 5 technical questions and 3 behavioral questions
- Generate at least 7 days in preparation plan

Return ONLY this exact JSON structure, no extra fields:
{
  "technicalquestions": [
    { "question": "...", "intenton": "...", "answer": "..." }
  ],
  "behavioralquestions": [
    { "question": "...", "intenton": "...", "answer": "..." }
  ],
  "skillgap": [
    { "skill": "...", "severity": "low|medium|high" }
  ],
  "preparationplan": [
    { "day": "1", "focus": "...", "tasks": ["...", "..."] }
  ],
  "matchScore": 0
}`
    const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config:{
        responseMimeType:"application/json",
        responseSchema:zodToJsonSchema(interviewReportSchema)
    }
  });
  const raw = JSON.parse(response.text)

const safeParse = (item) => typeof item === 'string' ? JSON.parse(item) : item


raw.technicalquestions = raw.technicalquestions.map(safeParse)
raw.behavioralquestions = raw.behavioralquestions.map(safeParse)
raw.skillgap = raw.skillgap.map(safeParse)
raw.preparationplan = raw.preparationplan.map(safeParse)

return raw
}
export default generateInterviewReport