import mongoose from 'mongoose';

const CompanyInvestmentSchema = new mongoose.Schema(
  {
    ticker: {
      type: String,
      required: [true, 'Please provide the company ticker'],
    },
    company_name: {
      type: String,
      required: [true, 'Please provide the company name'],
    },
    shares: {
      type: Number,
      required: [true, 'Please provide the total number of shares'],
      min: [0, 'Shares cannot be negative'],
    },
    current_price: {
      type: Number,
      required: [true, 'Please provide the current price'],
      min: [0, 'Price cannot be negative'],
    },
    percentage_returns: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const PortfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    invested_amount: {
      type: Number,
      default: 0,
      min: [0, 'Invested amount cannot be negative'],
    },
    available_balance: {
      type: Number,
      default: 0,
      min: [0, 'Available balance cannot be negative'],
    },
    total_portfolio_value: {
      type: Number,
      default: 0,
      min: [0, 'Total portfolio value cannot be negative'],
    },
    companies_invested: {
      type: [CompanyInvestmentSchema],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

export default mongoose.model('Portfolio', PortfolioSchema);
