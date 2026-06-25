import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const askGemini = async (question) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: {text: question},
      config: {
            responseMimeType: "application/json",  
            }
    });


    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate response");
  }
};