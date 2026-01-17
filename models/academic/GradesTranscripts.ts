import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGradesTranscripts extends Document {
  studentId: mongoose.Types.ObjectId;
  term: string;
  gpa: number;
}

const GradesTranscriptsSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  term: { type: String, required: true },
  gpa: { type: Number, required: true },
}, { timestamps: true });

const GradesTranscripts: Model<IGradesTranscripts> = mongoose.models.GradesTranscripts || mongoose.model<IGradesTranscripts>('GradesTranscripts', GradesTranscriptsSchema);

export default GradesTranscripts;
