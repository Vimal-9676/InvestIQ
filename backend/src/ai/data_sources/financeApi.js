import axios from 'axios';
import "dotenv/config";

/**
 * Fetches real fundamental data for a given stock ticker from Alpha Vantage.
 */
export async function getFundamentals(ticker) {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      console.warn("ALPHA_VANTAGE_API_KEY is not set. Please set it in your .env file.");
      return null;
    }

    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'OVERVIEW',
        symbol: ticker.toUpperCase(),
        apikey: apiKey
      }
    });

    const data = response.data;
    
    // Alpha Vantage returns {} if symbol not found or rate limited
    if (!data || Object.keys(data).length === 0 || data.Note) {
      console.warn(`Alpha Vantage data empty or rate limited for ${ticker}:`, data.Note || "Not Found");
      return null;
    }

    // Map to a cleaner format for the prompt
    return {
      revenue: data.RevenueTTM ? `$${(parseFloat(data.RevenueTTM) / 1e9).toFixed(2)} Billion` : 'N/A',
      net_income: data.GrossProfitTTM ? `$${(parseFloat(data.GrossProfitTTM) / 1e9).toFixed(2)} Billion` : 'N/A', // Using Gross Profit as proxy if Net Income isn't directly exposed in overview
      operating_margin: data.OperatingMarginTTM ? `${(parseFloat(data.OperatingMarginTTM) * 100).toFixed(2)}%` : 'N/A',
      pe_ratio: data.PERatio || 'N/A',
      market_cap: data.MarketCapitalization ? `$${(parseFloat(data.MarketCapitalization) / 1e9).toFixed(2)} Billion` : 'N/A',
      latest_results_summary: `Company Name: ${data.Name}. Sector: ${data.Sector}. Industry: ${data.Industry}. 52 Week High: $${data['52WeekHigh']}. 52 Week Low: $${data['52WeekLow']}. EBITDA: $${data.EBITDA}.`
    };
  } catch (error) {
    console.error("Error fetching Alpha Vantage data:", error.message);
    return null;
  }
}

