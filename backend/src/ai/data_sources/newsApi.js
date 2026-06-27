import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockDataPath = path.join(__dirname, 'mockData.json');

/**
 * Fetches mock news data for a given stock ticker.
 */
export async function getNews(ticker) {
  try {
    const data = await fs.readFile(mockDataPath, 'utf8');
    const parsedData = JSON.parse(data);
    const upperTicker = ticker.toUpperCase();

    if (parsedData[upperTicker] && parsedData[upperTicker].news) {
      return parsedData[upperTicker].news;
    }
    return []; // Ticker not found or no news
  } catch (error) {
    console.error("Error reading mock data:", error);
    return [];
  }
}
