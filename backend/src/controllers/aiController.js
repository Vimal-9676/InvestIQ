import { askRAG } from "../ai/services/ragService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const { answer, sources } = await askRAG(question);

    res.status(200).json({
      success: true,
      answer,
      sources,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
