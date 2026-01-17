import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAddDropClasses extends Document {
  enrollmentId: mongoose.Types.ObjectId;
  action: 'ADD' | 'DROP';
  actionDate: Date;
}

const AddDropClassesSchema: Schema = new Schema({
  enrollmentId: { type: Schema.Types.ObjectId, ref: 'CourseEnrollment', required: true },
  action: { type: String, enum: ['ADD', 'DROP'], required: true },
  actionDate: { type: Date, required: true, default: Date.now },
}, { timestamps: true });

const AddDropClasses: Model<IAddDropClasses> = mongoose.models.AddDropClasses || mongoose.model<IAddDropClasses>('AddDropClasses', AddDropClassesSchema);

export default AddDropClasses;
