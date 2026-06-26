const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Helper to fetch from backend with a fallback to mock data if backend is offline.
 * This ensures the frontend remains fully functional during backend development.
 */
async function fetchWithMockFallback(endpoint, options, mockDataFactory) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    if (!response.ok) throw new Error('Backend response not OK');
    return await response.json();
  } catch (error) {
    console.warn(`[API Stub] Backend ${endpoint} unreachable. Using mock data.`, error);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockDataFactory();
  }
}

export const api = {
  chat: {
    // Phase 1, 7: Send message to Gemini/OpenAI
    sendMessage: async (query, context = {}) => {
      return fetchWithMockFallback(
        '/chat/message',
        { method: 'POST', body: JSON.stringify({ query, context }) },
        () => ({
          answer: `Based on algorithmic analysis for ${context.ticker || 'the market'}, we are seeing strong consolidation. Key catalysts include upcoming macroeconomic shifts.`,
          sources: [{ title: 'Institutional Flow Report - Last 72h', type: 'doc' }]
        })
      );
    }
  },

  stocks: {
    // Phase 2, 8: Get Fundamentals
    getFundamentals: async (ticker) => {
      return fetchWithMockFallback(
        `/stocks/${ticker}/fundamentals`,
        { method: 'GET' },
        () => ({
          ticker,
          name: ticker === 'RELIANCE' ? 'Reliance Industries' : ticker,
          sector: 'Conglomerate',
          price: 2954.20,
          change: 32.40,
          changePercent: 1.12,
          marketCap: '₹20.1T',
          peRatio: 28.4,
          volume: '8.2M',
          high52: 3024.90,
          low52: 2220.30
        })
      );
    },

    // Phase 3: Get News
    getNews: async (ticker) => {
      return fetchWithMockFallback(
        `/stocks/${ticker}/news`,
        { method: 'GET' },
        () => [
          { time: '2h ago', text: 'Jio announces new enterprise 5G tariff plans.', sentiment: 'positive' },
          { time: '5h ago', text: 'Retail footprint expands by 50 stores in Tier 2 cities.', sentiment: 'positive' }
        ]
      );
    },

    // AI Watchlist Data
    getWatchlist: async () => {
      return fetchWithMockFallback(
        '/stocks/watchlist',
        { method: 'GET' },
        () => [
          {
            ticker: 'RELIANCE', name: 'Reliance Industries', price: '₹2,954.20', change: '+1.2%', trend: 'up',
            aiStatus: 'Bullish momentum detected', aiSentiment: 82,
            news: [{ time: '2h ago', text: 'Jio announces new enterprise 5G tariff plans.', sentiment: 'positive' }],
            earnings: 'Q3 Earnings beat estimates by 4%. Next earnings in 14 days.',
            priceAction: 'Consolidating near 52-week high. Support at ₹2850.'
          },
          {
            ticker: 'TCS', name: 'Tata Consultancy Services', price: '₹3,842.10', change: '-0.5%', trend: 'down',
            aiStatus: 'Neutral - Monitoring US macro', aiSentiment: 54,
            news: [{ time: '1d ago', text: 'Secures $500M contract with European bank.', sentiment: 'positive' }],
            earnings: 'Management guided cautious Q4 due to discretionary spend cuts.',
            priceAction: 'Trading below 50-day moving average. Resistance at ₹4000.'
          }
        ]
      );
    }
  },

  rag: {
    // Phase 4: RAG Implementation
    uploadDocument: async (file) => {
      const formData = new FormData();
      formData.append('document', file);

      try {
        const response = await fetch(`${API_BASE_URL}/rag/upload`, {
          method: 'POST',
          body: formData, // Do not set Content-Type, browser sets it for FormData
        });
        if (!response.ok) throw new Error('Backend response not OK');
        return await response.json();
      } catch (error) {
        console.warn(`[API Stub] Backend /rag/upload unreachable. Using mock data.`, error);
        await new Promise((resolve) => setTimeout(resolve, 2500));
        return {
          filename: file.name,
          pages: 14,
          summary: "Company reported strong quarterly results driven by sustained momentum. The segment faced some headwinds due to global macroeconomic volatility, but management remains highly optimistic.",
          sentiment: "Bullish (82%)",
          insights: [
            "Revenue increased by 4.2% QoQ, exceeding analyst estimates.",
            "Capital expenditure has peaked, improving free cash flow."
          ],
          risks: [
            "Weakness in global margins continuing to compress profitability."
          ],
          opportunities: [
            "Accelerated monetization through enterprise solutions."
          ]
        };
      }
    }
  },

  analysis: {
    // Advanced: Bull vs Bear Analysis
    getBullBear: async (query) => {
      return fetchWithMockFallback(
        '/analysis/bull-bear',
        { method: 'POST', body: JSON.stringify({ query }) },
        () => ({
          bullCase: [
            "Strong Deal Pipeline: Secured multiple large multi-year deals, ensuring strong revenue visibility.",
            "Margin Expansion: Operational efficiencies are driving EBIT margins back toward the aspirational band."
          ],
          bearCase: [
            "Discretionary Spend Cuts: Clients continue to pause discretionary tech spending, directly impacting revenue growth momentum.",
            "Valuation Premium: Trades at a significant premium. A slower-than-expected recovery could lead to multiple derating."
          ],
          risks: [
            { title: "Currency Volatility", desc: "Fluctuations in INR/USD can significantly impact reported margins." },
            { title: "Wage Inflation", desc: "Structural wage inflation in niche tech skills could compress margins." }
          ]
        })
      );
    }
  }
};
