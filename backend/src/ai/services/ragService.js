import { GoogleGenAI } from "@google/genai";
import { getVectorStore } from "../vectorStore/chroma.js";
import { embeddings } from "../embeddings/embedding.js";
import { getSystemPrompt } from "../prompts/systemPrompt.js";
import { getFundamentals } from "../data_sources/financeApi.js";
import { getNews } from "../data_sources/newsApi.js";
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

  const documents = [];
  if (results.documents && results.documents[0]) {
    for (let i = 0; i < results.documents[0].length; i++) {
      documents.push({
        pageContent: results.documents[0][i],
        metadata: results.metadatas[0][i] || {}
      });
    }
  }

  return documents;
}

// Simple ticker extraction (looks for 2-5 uppercase letters)
function extractTickers(question) {
  const regex = /\b[A-Z]{2,5}\b/g;
  const matches = question.match(regex);
  // Filter out common non-ticker uppercase words if needed
  const exclusions = ['WHAT', 'HOW', 'WHY', 'WHEN', 'WHO', 'THE', 'AND'];
  if (!matches) return [];
  return [...new Set(matches.filter(m => !exclusions.includes(m)))];
}

export async function askRAG(question) {
  try {
    // 1. Get historical context from Chroma
    const contextDocs = await retrieveContext(question);

    // 2. Fetch Live API Data based on detected tickers
    const tickers = extractTickers(question);
    for (const ticker of tickers) {
      const fundamentals = await getFundamentals(ticker);
      if (fundamentals) {
        contextDocs.push({
          pageContent: `LIVE FUNDAMENTALS FOR ${ticker}:\nRevenue: ${fundamentals.revenue}\nNet Income: ${fundamentals.net_income}\nOperating Margin: ${fundamentals.operating_margin}\nPE Ratio: ${fundamentals.pe_ratio}\nMarket Cap: ${fundamentals.market_cap}\nSummary: ${fundamentals.latest_results_summary}`,
          metadata: { source: 'Alpha Vantage (Live)', ticker }
        });
      }

      const newsList = await getNews(ticker);
      for (const news of newsList) {
        contextDocs.push({
          pageContent: `LIVE MARKET DATA FOR ${ticker} on ${news.date}:\nTitle: ${news.title}\nContent: ${news.content}`,
          metadata: { source: 'Marketstack (Live)', ticker, date: news.date, url: news.url }
        });
      }
    }

    // 3. Generate Answer
    const prompt = getSystemPrompt(contextDocs, question);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const sources = contextDocs.map(doc => {
      let sourceName = doc.metadata.source || "Unknown";
      
      // Clean up mock source names to look professional
      if (sourceName === 'mock_fundamentals') sourceName = 'Company Fundamentals';
      if (sourceName === 'mock_news') sourceName = 'Historical News';

      // Assign today's date if the document lacks a date (e.g., fundamentals)
      let docDate = doc.metadata.date;
      if (!docDate) {
        docDate = new Date().toISOString().split('T')[0];
      }

      return {
        source: sourceName,
        ticker: doc.metadata.ticker || "N/A",
        date: docDate,
        url: doc.metadata.url || null
      };
    });

    return {
      answer: response.text,
      sources: sources
    };
  } catch (error) {
    console.error("RAG Error:", error);
    throw new Error("Failed to generate RAG response");
  }
}


