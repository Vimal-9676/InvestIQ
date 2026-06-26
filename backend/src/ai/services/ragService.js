import { GoogleGenAI } from "@google/genai";
import { getVectorStore } from "../vectorStore/chroma.js";
import { embeddings } from "../embeddings/embedding.js";
import { getSystemPrompt } from "../prompts/systemPrompt.js";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function retrieveContext(question, k = 5) {
  const collection = await getVectorStore();
  const queryEmbedding = await embeddings.embedQuery(question);

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: k,
  });

  // Reconstruct documents from Chroma results
  const documents = [];
  if (results.documents[0]) {
    for (let i = 0; i < results.documents[0].length; i++) {
      documents.push({
        pageContent: results.documents[0][i],
        metadata: results.metadatas[0][i] || {}
      });
    }
  }

  return documents;
}

export async function askRAG(question) {
  try {
    const contextDocs = await retrieveContext(question);
    const prompt = getSystemPrompt(contextDocs, question);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Extract sources for the frontend
    const sources = contextDocs.map(doc => ({
      source: doc.metadata.source,
      ticker: doc.metadata.ticker,
      date: doc.metadata.date,
      url: doc.metadata.url
    }));

    return {
      answer: response.text,
      sources: sources
    };
  } catch (error) {
    console.error("RAG Error:", error);
    throw new Error("Failed to generate RAG response");
  }
}
