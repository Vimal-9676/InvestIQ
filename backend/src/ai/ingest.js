// import path from "path";
// import { fileURLToPath } from "url";

// import { loadPDF } from "./loaders/pdfLoaders.js";
// import { splitText } from "./utils/textSplitter.js";
// import { getVectorStore } from "./vectorStore/chroma.js";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const pdfPath = path.join(
//   __dirname,
//   "data",
//   "TCS_annualReport.pdf"
// );

// async function ingest() {
//   console.log("Loading PDF...");

//   const text = await loadPDF(pdfPath);

//   console.log("Splitting...");

//   const docs = await splitText(text);

//   console.log("Total Chunks:", docs.length);



//   const vectorStore = await getVectorStore();

//   console.log("Generating Embeddings...");

//   await vectorStore.addDocuments(docs);

  
//   console.log("Documents Stored Successfully");

// }

// ingest();


import path from "path";
import { fileURLToPath } from "url";

import { loadPDF } from "./loaders/pdfLoaders.js";
import { splitText } from "./utils/textSplitter.js";
import { getVectorStore } from "./vectorStore/chroma.js";
import { embeddings } from "./embeddings/embedding.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.join(
  __dirname,
  "data",
  "TCS_annualReport.pdf"
);

async function ingest() {
  console.log("Loading PDF...");

  const text = await loadPDF(pdfPath);

  console.log("Splitting...");

  const docs = await splitText(text);

  console.log("Total Chunks:", docs.length);

  const collection = await getVectorStore();

  const texts = docs.map((doc) => doc.pageContent);

  console.log("Generating embeddings...");

  const vectors = await embeddings.embedDocuments(texts);

  console.log("Uploading to Chroma...");

  await collection.add({
    ids: docs.map(() => crypto.randomUUID()),
    documents: texts,
    embeddings: vectors,
    metadatas: docs.map((doc) => doc.metadata ?? {}),
  });

  const count = await collection.count();
console.log("Documents in collection:", count);

  console.log("✅ Documents Stored Successfully");
}

ingest();