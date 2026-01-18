import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChatSession extends Document {
  studentId: mongoose.Types.ObjectId;
  title: string;
  lastMessageAt: Date;
}

const ChatSessionSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'New Chat' },
  lastMessageAt: { type: Date, default: Date.now },
}, { timestamps: true });

const ChatSession: Model<IChatSession> = mongoose.models.ChatSession || mongoose.model<IChatSession>('ChatSession', ChatSessionSchema);

export default ChatSession;
