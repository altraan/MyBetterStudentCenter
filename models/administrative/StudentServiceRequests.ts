import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudentServiceRequests extends Document {
  studentId: mongoose.Types.ObjectId;
  category: string;
  status: string;
  createdOn: Date;
}

const StudentServiceRequestsSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  status: { type: String, required: true },
  createdOn: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

const StudentServiceRequests: Model<IStudentServiceRequests> = mongoose.models.StudentServiceRequests || mongoose.model<IStudentServiceRequests>('StudentServiceRequests', StudentServiceRequestsSchema);

export default StudentServiceRequests;
