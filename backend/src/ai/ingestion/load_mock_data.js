import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

import { getVectorStore } from '../vectorStore/chroma.js';
import { embeddings } from '../embeddings/embedding.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockDataPath = path.join(__dirname, '../data_sources/mockData.json');

async function ingestMockData() {
  try {
    console.log("Loading mock data...");
    const data = await fs.readFile(mockDataPath, 'utf8');
    const parsedData = JSON.parse(data);
    
    const documents = [];
    
    // Process each ticker
    for (const [ticker, info] of Object.entries(parsedData)) {
      // 1. Fundamentals document
      if (info.fundamentals) {
        const funText = `Fundamentals for ${ticker}:
          Revenue: ${info.fundamentals.revenue}
          Net Income: ${info.fundamentals.net_income}
          Margin: ${info.fundamentals.operating_margin || info.fundamentals.net_interest_margin}
          PE Ratio: ${info.fundamentals.pe_ratio}
          Summary: ${info.fundamentals.latest_results_summary}`;
        
        documents.push({
          pageContent: funText,
          metadata: { source: 'mock_fundamentals', ticker }
        });
      }
      
      // 2. News documents
      if (info.news && Array.isArray(info.news)) {
        for (const article of info.news) {
          const newsText = `News for ${ticker} on ${article.date}:
            Title: ${article.title}
            Content: ${article.content}`;
                      
          documents.push({
            pageContent: newsText,
            metadata: { source: 'mock_news', ticker, date: article.date, url: article.url }
          });
        }
      }
    }

    console.log(`Prepared ${documents.length} mock documents.`);

    const collection = await getVectorStore();
    const texts = documents.map(doc => doc.pageContent);

    console.log("Generating embeddings...");
    const vectors = await embeddings.embedDocuments(texts);

    console.log("Uploading to Chroma...");
    await collection.add({
      ids: documents.map(() => crypto.randomUUID()),
      documents: texts,
      embeddings: vectors,
      metadatas: documents.map(doc => doc.metadata)
    });

    const count = await collection.count();
    console.log("Documents in collection:", count);
    console.log("✅ Mock Data Stored Successfully");
  } catch (error) {
    console.error("Error ingesting mock data:", error);
  }
}

ingestMockData();
