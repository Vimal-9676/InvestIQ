import { askRAG } from './src/ai/services/ragService.js';

async function test() {
  console.log("Testing RAG...");
  const { answer, sources } = await askRAG("Summarise TCS's latest results");
  console.log("Answer:", answer);
  console.log("Sources:", JSON.stringify(sources, null, 2));
}

test().catch(console.error);
