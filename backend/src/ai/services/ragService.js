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

// Simple ticker extraction (looks for 2-10 uppercase letters)
function extractTickers(question) {
  const regex = /\b[A-Z]{2,10}\b/g;
  const matches = question.match(regex);
  // Filter out common non-ticker uppercase words if needed
  const exclusions = ['WHAT', 'HOW', 'WHY', 'WHEN', 'WHO', 'THE', 'AND', 'COMPARE', 'BETWEEN', 'FOR'];
  if (!matches) return [];
  return [...new Set(matches.filter(m => !exclusions.includes(m)))];
}

export async function askRAG(question) {
  try {
    // 1. Get historical context from Chroma
    // We fetch a larger k to ensure we get enough relevant docs before filtering
    let contextDocs = await retrieveContext(question, 10);

    // 2. Extract tickers
    const tickers = extractTickers(question);

    // Filter Chroma docs to ONLY include relevant tickers (or docs with no ticker)
    if (tickers.length > 0) {
      contextDocs = contextDocs.filter(doc => 
        !doc.metadata.ticker || tickers.includes(doc.metadata.ticker)
      );
    }

    // 3. Fetch Live Mock Data based on detected tickers
    for (const ticker of tickers) {
      const fundamentals = await getFundamentals(ticker);
      if (fundamentals) {
        contextDocs.push({
          pageContent: `COMPANY FUNDAMENTALS FOR ${ticker}:\nRevenue: ${fundamentals.revenue}\nNet Income: ${fundamentals.net_income}\nOperating Margin: ${fundamentals.operating_margin}\nPE Ratio: ${fundamentals.pe_ratio}\nMarket Cap: ${fundamentals.market_cap}\nSummary: ${fundamentals.latest_results_summary}`,
          metadata: { source: 'Company Fundamentals', ticker }
        });
      }

      const newsList = await getNews(ticker);
      for (const news of newsList) {
        contextDocs.push({
          pageContent: `HISTORICAL NEWS FOR ${ticker} on ${news.date}:\nTitle: ${news.title}\nContent: ${news.content}`,
          metadata: { source: 'Historical News', ticker, date: news.date, url: news.url }
        });
      }
    }

    // 4. Generate Answer
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



