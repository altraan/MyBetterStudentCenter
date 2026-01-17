import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITuitionPayments extends Document {
  studentId: mongoose.Types.ObjectId;
  balance: number;
}

const TuitionPaymentsSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, required: true, default: 0 },
}, { timestamps: true });

const TuitionPayments: Model<ITuitionPayments> = mongoose.models.TuitionPayments || mongoose.model<ITuitionPayments>('TuitionPayments', TuitionPaymentsSchema);

export default TuitionPayments;
