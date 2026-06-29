import { askGemini, analyzeEarnings, analyzeBullBear } from "../ai/services/geminiService.js";
import ChatSession from "../models/ChatSession.js";
import fs from 'fs';

export const chatWithAI = async (req, res) => {
  try {
    const { question, symbol, sessionId } = req.body;
    const userId = req.user._id;

    if (!question) {
      return res.status(400).json({ success: false, message: "Question is required" });
    }

    let session;
    if (sessionId) {
      session = await ChatSession.findOne({ _id: sessionId, user: userId });
    }

    if (!session) {
      const title = symbol ? `Analysis on ${symbol}` : `General Question`;
      session = await ChatSession.create({
        user: userId,
        title: title,
        messages: [{ role: "user", content: question }]
      });
    } else {
      session.messages.push({ role: "user", content: question });
      await session.save();
    }

    const answer = await askGemini(question, symbol);

    session.messages.push({ role: "ai", content: answer });
    await session.save();

    res.status(200).json({
      success: true,
      answer,
      sessionId: session._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const sessions = await ChatSession.find({ user: req.user._id })
      .select("-messages")
      .sort({ updatedAt: -1 });
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch chat history" });
  }
};

export const getChatSession = async (req, res) => {
  try {
    const session = await ChatSession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch session" });
  }
};

export const analyzeEarningsCall = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded. Please upload a PDF.' });
    }

    const filePath = req.file.path;

    // Parse PDF
    let text = '';
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const { PDFParse } = await import('pdf-parse');
      const parser = new PDFParse(new Uint8Array(dataBuffer));
      const data = await parser.getText();
      text = data.text || '';
    } catch (parseErr) {
      console.error('PDF parse error:', parseErr);
      return res.status(422).json({ success: false, message: 'Could not read PDF. Make sure it is a valid, text-based PDF (not scanned image).' });
    } finally {
      // Always clean up the file
      try { fs.unlinkSync(filePath); } catch (_) {}
    }

    if (!text.trim()) {
      return res.status(422).json({ success: false, message: 'PDF appears to be empty or contains only images. Please upload a text-based PDF.' });
    }

    const analysis = await analyzeEarnings(text);
    res.status(200).json({ success: true, analysis });
  } catch (error) {
    console.error('Earnings analysis failed:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to analyze earnings document' });
  }
};

export const getBullBear = async (req, res) => {
  try {
    const { ticker } = req.body;
    if (!ticker) {
      return res.status(400).json({ success: false, message: "Ticker is required" });
    }

    const analysis = await analyzeBullBear(ticker);

    res.status(200).json({ success: true, analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to generate bull/bear analysis" });
  }
};