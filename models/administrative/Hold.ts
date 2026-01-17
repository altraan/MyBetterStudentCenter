import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHold extends Document {
  studentId: mongoose.Types.ObjectId;
  type: string; // e.g., "Financial", "Academic", "Library"
  reason: string;
  impact: string; // e.g., "Cannot Register", "Cannot view Grades"
  isActive: boolean;
}

const HoldSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  reason: { type: String, required: true },
  impact: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Hold: Model<IHold> = mongoose.models.Hold || mongoose.model<IHold>('Hold', HoldSchema);

export default Hold;
