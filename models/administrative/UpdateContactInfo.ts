import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUpdateContactInfo extends Document {
  profileId: mongoose.Types.ObjectId; // Links to User
  updatedOn: Date;
  method: string;
}

const UpdateContactInfoSchema: Schema = new Schema({
  profileId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedOn: { type: Date, required: true, default: Date.now },
  method: { type: String, required: true },
}, { timestamps: true });

const UpdateContactInfo: Model<IUpdateContactInfo> = mongoose.models.UpdateContactInfo || mongoose.model<IUpdateContactInfo>('UpdateContactInfo', UpdateContactInfoSchema);

export default UpdateContactInfo;
