import multer from 'multer';
import fs from 'fs';
import { getVectorStore } from '../ai/services/vectorStore.js';

const upload = multer({ dest: 'uploads/' });

export const uploadMiddleware = upload.single('document');

export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const pdfParse = (await import('pdf-parse')).default;
    const data = await pdfParse(dataBuffer);
    const text = data.text;

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    // Simple manual text chunking
    const chunkSize = 1000;
    const chunkOverlap = 200;
    const docs = [];
    for (let i = 0; i < text.length; i += chunkSize - chunkOverlap) {
      docs.push({
        pageContent: text.substring(i, i + chunkSize),
        metadata: { source: req.file.originalname }
      });
    }

    // Create embeddings and store in MemoryVectorStore
    const vectorStore = getVectorStore();
    await vectorStore.addDocuments(docs);

    res.status(200).json({
      success: true,
      message: 'Document processed successfully',
      filename: req.file.originalname
    });
  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({ success: false, message: 'Failed to process document' });
  }
};

