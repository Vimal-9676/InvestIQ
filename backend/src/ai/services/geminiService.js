// import { GoogleGenAI } from "@google/genai";
// import "dotenv/config";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_API_KEY,
// });

// export const askGemini = async (question) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-3.5-flash",
//       contents: {text: question},
//       config: {
//             responseMimeType: "application/json",  
//             }
//     });


//     return response.text;
//   } catch (error) {
//     console.error("Gemini Error:", error);
//     throw new Error("Failed to generate response");
//   }
// };


import { GoogleGenAI } from "@google/genai";
import { retrieveContext } from "../rag.js";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function askGemini(question) {
  const context = await retrieveContext(question);

  const prompt = `
You are an investment research assistant.

Answer ONLY using the context below.

If the answer is not present, reply:
"I couldn't find that information in the annual report."

Context:
${context.join("\n\n")}

Question:
${question}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}