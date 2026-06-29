import express from 'express';
import { getQuote, getHistory, searchStocks, getNews, getMarketNews, getTopGainers, getExchangeRate } from '../controllers/stockController.js';

const router = express.Router();

router.get('/quote', getQuote);
router.get('/history', getHistory);
router.get('/search', searchStocks);
router.get('/news', getNews);
router.get('/market-news', getMarketNews);
router.get('/top-gainers', getTopGainers);
router.get('/exchange-rate', getExchangeRate);
export default router;
