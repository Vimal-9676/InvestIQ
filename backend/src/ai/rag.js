import { getVectorStore } from "./vectorStore/chroma.js";
import { embeddings } from "./embeddings/embedding.js";

export async function retrieveContext(question, k = 5) {
  const collection = await getVectorStore();

  const queryEmbedding = await embeddings.embedQuery(question);

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: k,
  });

  return results.documents[0] || [];
}