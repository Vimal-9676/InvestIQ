import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  ticker: { type: String }, // For convenience
  documentType: { type: String, required: true },
  embeddingId: { type: String },
}, { timestamps: true });

export default mongoose.model('Document', DocumentSchema);
