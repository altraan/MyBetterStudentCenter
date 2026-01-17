import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAcademicProgress extends Document {
  studentId: mongoose.Types.ObjectId;
  status: string;
  requirementSummary: string;
}

const AcademicProgressSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true },
  requirementSummary: { type: String, required: true },
}, { timestamps: true });

const AcademicProgress: Model<IAcademicProgress> = mongoose.models.AcademicProgress || mongoose.model<IAcademicProgress>('AcademicProgress', AcademicProgressSchema);

export default AcademicProgress;
