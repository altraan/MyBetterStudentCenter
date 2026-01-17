import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessageCentre extends Document {
  studentId: mongoose.Types.ObjectId;
  subject: string;
  sentDate: Date;
  status: string;
}

const MessageCentreSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  sentDate: { type: Date, required: true, default: Date.now },
  status: { type: String, required: true },
}, { timestamps: true });

const MessageCentre: Model<IMessageCentre> = mongoose.models.MessageCentre || mongoose.model<IMessageCentre>('MessageCentre', MessageCentreSchema);

export default MessageCentre;
