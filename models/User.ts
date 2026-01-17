import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  sheridanId: string; // e.g., 991xxxxxx
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'faculty' | 'admin';
  program: string;
  enrollmentStatus: 'active' | 'graduated' | 'withdrawn' | 'on_leave';
  prerequisitesNeeded: string[];
  currentCourses: string[];
}

const UserSchema: Schema = new Schema({
  sheridanId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },
  program: { type: String, required: true },
  enrollmentStatus: { type: String, enum: ['active', 'graduated', 'withdrawn', 'on_leave'], default: 'active' },
},
    { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
