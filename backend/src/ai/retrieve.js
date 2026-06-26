// import { getVectorStore } from "./vectorStore/chroma.js";

// async function retrieve() {
//   const vectorStore = await getVectorStore();

//   const retriever = vectorStore.asRetriever({
//     k: 5,
//   });

//   const docs = await retriever.invoke(
//     "What is TCS revenue growth?"
//   );

//   console.log(docs);
// }

// retrieve();


import { getVectorStore } from "./vectorStore/chroma.js";
import { embeddings } from "./embeddings/embedding.js";

async function retrieve() {
  const collection = await getVectorStore();

  const queryEmbedding = await embeddings.embedQuery(
    "What is TCS revenue growth?"
  );

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 5,
  });

  console.log(results.documents[0]);
}

retrieve();