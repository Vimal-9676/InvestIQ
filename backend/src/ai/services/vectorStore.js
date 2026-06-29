import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import 'dotenv/config';

class SimpleMemoryStore {
  constructor() {
    this.embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY || 'dummy_key_for_hackathon',
      model: 'text-embedding-004',
    });
    this.documents = []; // { text, embedding, metadata }
  }

  async addDocuments(docs) {
    const texts = docs.map(d => d.pageContent);
    const embs = await this.embeddings.embedDocuments(texts);
    
    for (let i = 0; i < docs.length; i++) {
      this.documents.push({
        text: docs[i].pageContent,
        metadata: docs[i].metadata,
        embedding: embs[i]
      });
    }
  }

  async similaritySearch(query, k = 3) {
    if (this.documents.length === 0) return [];
    
    const queryEmb = await this.embeddings.embedQuery(query);
    
    // Calculate cosine similarity
    const results = this.documents.map(doc => {
      let dotProduct = 0;
      let normA = 0;
      let normB = 0;
      for (let i = 0; i < queryEmb.length; i++) {
        dotProduct += queryEmb[i] * doc.embedding[i];
        normA += queryEmb[i] * queryEmb[i];
        normB += doc.embedding[i] * doc.embedding[i];
      }
      const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
      return { ...doc, similarity };
    });
    
    results.sort((a, b) => b.similarity - a.similarity);
    
    return results.slice(0, k).map(r => ({
      pageContent: r.text,
      metadata: r.metadata
    }));
  }
}

let vectorStore = null;

export const getVectorStore = () => {
  if (!vectorStore) {
    vectorStore = new SimpleMemoryStore();
  }
  return vectorStore;
};

export const clearVectorStore = () => {
  vectorStore = null;
};
