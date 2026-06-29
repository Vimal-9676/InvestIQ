import User from '../models/User.js';
import YahooFinanceLib from 'yahoo-finance2';
const yahooFinance = new YahooFinanceLib();

export const addToWatchlist = async (req, res) => {
  try {
    const { symbol } = req.body;
    if (!symbol) return res.status(400).json({ success: false, message: 'Symbol is required' });

    const user = req.user;
    if (!user.watchlist.includes(symbol)) {
      user.watchlist.push(symbol);
      await user.save();
    }

    res.status(200).json({ success: true, watchlist: user.watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to add to watchlist' });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const { symbol } = req.params;
    const user = req.user;
    
    user.watchlist = user.watchlist.filter(s => s !== symbol);
    await user.save();

    res.status(200).json({ success: true, watchlist: user.watchlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to remove from watchlist' });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const user = req.user;
    const watchlist = user.watchlist || [];
    
    // Fetch quotes for each symbol
    const results = [];
    if (watchlist.length > 0) {
      try {
        const quotesArray = await Promise.all(
          watchlist.map(sym => yahooFinance.quote(sym))
        );
        
        for (const quote of quotesArray) {
          if (!quote) continue;
          results.push({
            symbol: quote.symbol,
            shortName: quote.shortName || quote.symbol,
            price: quote.regularMarketPrice,
            weeklyChange: quote.regularMarketChangePercent || 0,
          });
        }
      } catch (e) {
        console.error("Yahoo Finance Quote Error in Watchlist:", e);
        // Fallback to basic info if Yahoo Finance fails
        for (const symbol of watchlist) {
          results.push({ symbol, price: 0, weeklyChange: 0 });
        }
      }
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch watchlist' });
  }
};
