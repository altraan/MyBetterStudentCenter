import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFinancialRecord extends Document {
  studentId: mongoose.Types.ObjectId;
  term: string;
  type: 'tuition' | 'fee' | 'payment' | 'aid';
  amount: number; // Positive for charges, negative for payments/aid
  description: string;
  dueDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
}

const FinancialRecordSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  term: { type: String, required: true },
  type: { type: String, enum: ['tuition', 'fee', 'payment', 'aid'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date },
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
}, { timestamps: true });

const FinancialRecord: Model<IFinancialRecord> = mongoose.models.FinancialRecord || mongoose.model<IFinancialRecord>('FinancialRecord', FinancialRecordSchema);

export default FinancialRecord;
