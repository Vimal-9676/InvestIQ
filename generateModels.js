const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'backend/src/models');

const companySchema = `import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  ticker: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sector: { type: String },
  marketCap: { type: Number },
  peRatio: { type: Number },
  eps: { type: Number },
}, { timestamps: true });

export default mongoose.model('Company', CompanySchema);
`;

const newsSchema = `import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  ticker: { type: String }, // For convenience if we don't have company in DB yet
  headline: { type: String, required: true },
  summary: { type: String },
  sentiment: { type: String },
  date: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('News', NewsSchema);
`;

const documentSchema = `import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  ticker: { type: String }, // For convenience
  documentType: { type: String, required: true },
  embeddingId: { type: String },
}, { timestamps: true });

export default mongoose.model('Document', DocumentSchema);
`;

fs.writeFileSync(path.join(modelsDir, 'Company.js'), companySchema);
fs.writeFileSync(path.join(modelsDir, 'News.js'), newsSchema);
fs.writeFileSync(path.join(modelsDir, 'Document.js'), documentSchema);

console.log('Models generated.');
