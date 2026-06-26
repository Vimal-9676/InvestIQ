import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockDataPath = path.join(__dirname, 'mockData.json');

/**
 * Fetches mock fundamental data for a given stock ticker.
 * In a real scenario, this would call Yahoo Finance, Alpha Vantage, etc.
 */
export async function getFundamentals(ticker) {
  try {
    const data = await fs.readFile(mockDataPath, 'utf8');
    const parsedData = JSON.parse(data);
    const upperTicker = ticker.toUpperCase();

    if (parsedData[upperTicker] && parsedData[upperTicker].fundamentals) {
      return parsedData[upperTicker].fundamentals;
    }
    return null; // Ticker not found
  } catch (error) {
    console.error("Error reading mock data:", error);
    return null;
  }
}
