import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  courseCode: string; // e.g., PROG24444
  title: string;
  credits: number;
  description: string;
  department: string;
}

const CourseSchema: Schema = new Schema({
  courseCode: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  credits: { type: Number, required: true },
  description: { type: String },
  department: { type: String, required: true },
}, { timestamps: true });

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
