import { GoogleGenAI } from "@google/genai";
import { getVectorStore } from "./vectorStore.js";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY || 'dummy_key_for_hackathon',
});

export const askGemini = async (question, symbol) => {
  try {
    let context = "";
    
    // Check if we have documents in the vector store
    const vectorStore = getVectorStore();
    try {
      const results = await vectorStore.similaritySearch(question, 3);
      if (results && results.length > 0) {
        context = "Context from uploaded documents:\\n" + results.map(r => r.pageContent).join("\\n\\n");
      }
    } catch (err) {
      // MemoryVectorStore might be empty and throw error on search, ignore
    }

    const systemPrompt = `You are InvestIQ's AI agent. Provide deep financial insights on stocks, but NEVER give direct recommendations to buy, sell, or hold. Always clarify that you are providing analysis, not advice. Be concise and professional.
    
${symbol ? `Note: The user is currently viewing the dashboard for ${symbol}. However, you must answer their specific question directly, even if it is about a completely different company or topic.` : ''}

${context}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\\n\\nQuestion: " + question }] }
      ]
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error.status === 503) {
      return "The AI agent is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.";
    }
    throw new Error("Failed to generate response");
  }
};

export const analyzeEarnings = async (text) => {
  const systemPrompt = `You are an expert financial analyst. Analyze the following document thoroughly.
Extract the following information and output ONLY valid JSON (no markdown, no backticks) in this exact structure:
{
  "summary": "A detailed 3-5 paragraph summary of the document",
  "insights": ["Key insight 1", "Key insight 2", "Key insight 3", "Key insight 4", "Key insight 5"],
  "opportunities": ["Opportunity 1", "Opportunity 2", "Opportunity 3"],
  "risks": ["Risk 1", "Risk 2", "Risk 3"]
}
Output ONLY the raw JSON object, nothing else.`;

  // Truncate text if it's too long for the model
  const truncatedText = text.substring(0, 80000);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "user", parts: [{ text: systemPrompt + "\n\nDocument Content:\n" + truncatedText }] }
    ]
  });

  let rawText = response.text || '';

  // Strip any markdown code fences Gemini might add
  rawText = rawText
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  // Extract first JSON object found in the response
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    // If Gemini didn't return JSON, build a structured response from plain text
    return {
      summary: rawText,
      insights: ['See summary above for full analysis'],
      opportunities: ['Review document for opportunities'],
      risks: ['Review document for risks']
    };
  }

  return JSON.parse(jsonMatch[0]);
};


export const analyzeBullBear = async (ticker) => {
  try {
    const systemPrompt = `You are an expert financial analyst providing a balanced view. 
Provide a Bull vs Bear analysis for ${ticker}. DO NOT provide direct financial advice.
Output ONLY valid JSON in this exact structure:
{
  "bull": "Detailed bull case arguments",
  "bear": "Detailed bear case arguments",
  "risks": "Overall risks and considerations for both sides"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] }
      ]
    });

    const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Bull/Bear Analysis Error:", error);
    throw new Error("Failed to generate bull/bear analysis");
  }
};