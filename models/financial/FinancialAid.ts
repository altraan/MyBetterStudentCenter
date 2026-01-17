import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFinancialAid extends Document {
  studentId: mongoose.Types.ObjectId;
  type: string;
  awardAmount: number;
  status: string;
}

const FinancialAidSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  awardAmount: { type: Number, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

const FinancialAid: Model<IFinancialAid> = mongoose.models.FinancialAid || mongoose.model<IFinancialAid>('FinancialAid', FinancialAidSchema);

export default FinancialAid;
