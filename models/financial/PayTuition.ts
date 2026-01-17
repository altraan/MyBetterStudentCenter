import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayTuition extends Document {
  accountId: mongoose.Types.ObjectId;
  amount: number;
  paymentDate: Date;
  method: string;
}

const PayTuitionSchema: Schema = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'TuitionPayments', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, required: true, default: Date.now },
  method: { type: String, required: true },
}, { timestamps: true });

const PayTuition: Model<IPayTuition> = mongoose.models.PayTuition || mongoose.model<IPayTuition>('PayTuition', PayTuitionSchema);

export default PayTuition;
