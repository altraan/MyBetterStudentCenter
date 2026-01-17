import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourseEnrollment extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  term: string;
  status: string;
}

const CourseEnrollmentSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  term: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

const CourseEnrollment: Model<ICourseEnrollment> = mongoose.models.CourseEnrollment || mongoose.model<ICourseEnrollment>('CourseEnrollment', CourseEnrollmentSchema);

export default CourseEnrollment;
