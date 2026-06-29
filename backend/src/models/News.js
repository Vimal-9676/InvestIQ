import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  ticker: { type: String }, // For convenience if we don't have company in DB yet
  headline: { type: String, required: true },
  summary: { type: String },
  sentiment: { type: String },
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('News', NewsSchema);
