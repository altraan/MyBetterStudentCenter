import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClearHolds extends Document {
  taskId: mongoose.Types.ObjectId;
  clearedOn: Date;
  resolution: string;
}

const ClearHoldsSchema: Schema = new Schema({
  taskId: { type: Schema.Types.ObjectId, ref: 'TasksHolds', required: true },
  clearedOn: { type: Date, required: true, default: Date.now },
  resolution: { type: String, required: true },
}, { timestamps: true });

const ClearHolds: Model<IClearHolds> = mongoose.models.ClearHolds || mongoose.model<IClearHolds>('ClearHolds', ClearHoldsSchema);

export default ClearHolds;
