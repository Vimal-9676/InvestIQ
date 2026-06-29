import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  ticker: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sector: { type: String },
  marketCap: { type: Number },
  peRatio: { type: Number },
  eps: { type: Number },
}, { timestamps: true });

export default mongoose.model('Company', CompanySchema);
