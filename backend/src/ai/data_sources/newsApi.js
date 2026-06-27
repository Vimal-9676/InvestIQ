import axios from 'axios';
import "dotenv/config";

/**
 * Fetches recent market data/news for a given stock ticker using Marketstack.
 */
export async function getNews(ticker) {
  try {
    const apiKey = process.env.MARKETSTACK_API_KEY;
    if (!apiKey) {
      console.warn("MARKETSTACK_API_KEY is not set. Please set it in your .env file.");
      return [];
    }

    // Marketstack EOD gives the latest daily summary, which provides great context for "latest results"
    const response = await axios.get(`http://api.marketstack.com/v1/eod`, {
      params: {
        access_key: apiKey,
        symbols: ticker.toUpperCase(),
        limit: 5 // Last 5 days of trading activity
      }
    });

    const data = response.data;
    
    if (!data || !data.data || data.data.length === 0) {
      console.warn(`Marketstack data empty or rate limited for ${ticker}`);
      return [];
    }

    // Format this as "news" or "recent market activity" for the prompt
    return data.data.map(day => ({
      title: `Market Close for ${ticker}`,
      date: day.date.substring(0, 10),
      content: `Closing Price: $${day.close}. High: $${day.high}. Low: $${day.low}. Volume: ${day.volume}.`,
      url: "https://marketstack.com/"
    }));
  } catch (error) {
    console.error("Error fetching Marketstack data:", error.message);
    return [];
  }
}

