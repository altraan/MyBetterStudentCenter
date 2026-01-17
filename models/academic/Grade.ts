import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGrade extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  term: string; // e.g., "Fall 2025"
  numericGrade: number;
  letterGrade: string;
  status: 'IP' | 'completed' | 'withdrawn'; // IP = In Progress
}

const GradeSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  term: { type: String, required: true },
  numericGrade: { type: Number },
  letterGrade: { type: String },
  status: { type: String, enum: ['IP', 'completed', 'withdrawn'], default: 'IP' },
}, { timestamps: true });

const Grade: Model<IGrade> = mongoose.models.Grade || mongoose.model<IGrade>('Grade', GradeSchema);

export default Grade;
