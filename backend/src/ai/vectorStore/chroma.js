
import { ChromaClient } from "chromadb";

const client = new ChromaClient({
  path: "http://localhost:8000",
});

let collection = null;

export const getVectorStore = async () => {
  if (!collection) {
    collection = await client.getOrCreateCollection({
      name: "stock-research",
    });
  }

  return collection;
};
