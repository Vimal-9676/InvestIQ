import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

export const getQuote = async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) return res.status(400).json({ error: 'Symbol is required' });

    const quote = await yahooFinance.quote(symbol);
    res.status(200).json(quote);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { symbol, range = '1mo' } = req.query;
    if (!symbol) return res.status(400).json({ error: 'Symbol is required' });
    
    const period1 = new Date();
    if (range === '1D') period1.setDate(period1.getDate() - 1);
    else if (range === '1W') period1.setDate(period1.getDate() - 7);
    else if (range === '1M') period1.setMonth(period1.getMonth() - 1);
    else if (range === 'YTD') period1.setMonth(0, 1);
    else period1.setMonth(period1.getMonth() - 1);

    const queryOptions = { 
      period1: period1.toISOString().split('T')[0], 
      period2: new Date().toISOString().split('T')[0],
      interval: '1d' 
    };
    const result = await yahooFinance.historical(symbol, queryOptions);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(200).json([]); // Return empty array to prevent frontend crash
  }
};

export const getNews = async (req, res) => {
  try {
    const { symbol } = req.query;
    if (!symbol) return res.status(400).json({ error: 'Symbol is required' });

    const result = await yahooFinance.search(symbol, { newsCount: 5, quotesCount: 0 });
    res.status(200).json(result.news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

export const getMarketNews = async (req, res) => {
  try {
    const result = await yahooFinance.search('stock market', { newsCount: 15, quotesCount: 0 });
    res.status(200).json(result.news);
  } catch (error) {
    console.error('Error fetching market news:', error);
    res.status(500).json({ error: 'Failed to fetch market news' });
  }
};
export const getTopGainers = async (req, res) => {
  try {
    // Use screener with correct yahoo-finance2 API signature
    const result = await yahooFinance.screener('day_gainers', { count: 7 });
    const top = (result.quotes || []).slice(0, 7).map(q => ({
      symbol: q.symbol,
      shortName: q.shortName || q.longName || q.symbol,
      currency: q.currency || 'USD',
      regularMarketPrice: q.regularMarketPrice,
      regularMarketChangePercent: q.regularMarketChangePercent,
      regularMarketChange: q.regularMarketChange,
    }));
    res.status(200).json(top);
  } catch (error) {
    console.error('Error fetching top gainers:', error);
    // Fallback: search for known gainers manually
    try {
      const fallbackSymbols = ['NVDA', 'META', 'AMZN', 'TSLA', 'MSFT', 'GOOGL', 'AAPL'];
      const quotes = await Promise.all(fallbackSymbols.map(s => yahooFinance.quote(s)));
      const sorted = quotes
        .filter(q => q && q.regularMarketChangePercent != null)
        .sort((a, b) => b.regularMarketChangePercent - a.regularMarketChangePercent)
        .slice(0, 7)
        .map(q => ({
          symbol: q.symbol,
          shortName: q.shortName || q.symbol,
          currency: q.currency || 'USD',
          regularMarketPrice: q.regularMarketPrice,
          regularMarketChangePercent: q.regularMarketChangePercent,
          regularMarketChange: q.regularMarketChange,
        }));
      res.status(200).json(sorted);
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      res.status(500).json({ error: 'Failed to fetch top gainers' });
    }
  }
};

export const searchStocks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query string is required' });

    const result = await yahooFinance.search(q, { quotesCount: 15, newsCount: 0 });
    
    // Filter for equities and take top 5
    const equities = result.quotes.filter(quote => quote.quoteType === 'EQUITY').slice(0, 5);
    
    // Fallback if no equities found (unlikely but safe)
    const finalResults = equities.length > 0 ? equities : result.quotes.slice(0, 5);

    res.status(200).json(finalResults);
  } catch (error) {
    console.error('Error searching stocks:', error);
    res.status(500).json({ error: 'Failed to search stocks' });
  }
};

export const getExchangeRate = async (req, res) => {
  try {
    // USDINR=X is the Yahoo Finance ticker for the live USD/INR exchange rate
    const quote = await yahooFinance.quote('USDINR=X');
    const rate = quote?.regularMarketPrice || 84.0;
    res.status(200).json({ from: 'USD', to: 'INR', rate });
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Always return a usable fallback so the frontend never breaks
    res.status(200).json({ from: 'USD', to: 'INR', rate: 84.0 });
  }
};
