
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateQuizQuestions = async (words: string[]): Promise<QuizQuestion[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    I have a list of English words: ${words.join(", ")}.
    If the list has fewer than 10 words, please add more common, fun English words suitable for a 9-year-old girl to reach exactly 10 questions.
    For each word, provide:
    1. The correct Hebrew translation.
    2. Three plausible but incorrect Hebrew translation distractors (distractors must be in Hebrew).
    3. The original English word.
    
    Make it fun and age-appropriate.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            translation: { type: Type.STRING },
            distractors: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["word", "translation", "distractors"]
        }
      }
    }
  });

  const rawData = JSON.parse(response.text) as any[];
  
  return rawData.map(item => {
    const options = [...item.distractors, item.translation].sort(() => Math.random() - 0.5);
    return {
      word: item.word,
      translation: item.translation,
      distractors: item.distractors,
      options
    };
  });
};
