import "dotenv/config";
import { embeddings } from "./embeddings/embedding.js";

const vectors = await embeddings.embedDocuments([
  "Hello world",
  "This is a test",
]);

console.log(vectors);
console.log(vectors.length);
console.log(vectors[0].length);

// const result = await embeddings.embedQuery("Hello world");

// console.log(result);
// console.log(result.length);
// console.log(result[0].length);