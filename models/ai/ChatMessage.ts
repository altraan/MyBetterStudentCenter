import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChatMessage extends Document {
  sessionId: mongoose.Types.ObjectId;
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessageSchema: Schema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'ChatSession', required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
}, { timestamps: true });

const ChatMessage: Model<IChatMessage> = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatMessage;
