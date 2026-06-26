// import { Chroma } from "@langchain/community/vectorstores/chroma";

// import { embeddings } from "../embeddings/embedding.js";

// export const getVectorStore = async () => {
//   const vectorStore = new Chroma(embeddings, {
//   collectionName: "stock-research",
//   host: "localhost",
//   port: 8000,
//   ssl: false,
// });

//   return vectorStore;
// };


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
