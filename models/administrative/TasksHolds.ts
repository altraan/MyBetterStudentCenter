import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITasksHolds extends Document {
  studentId: mongoose.Types.ObjectId;
  type: 'TASK' | 'HOLD';
  status: string;
  dueDate: Date;
}

const TasksHoldsSchema: Schema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['TASK', 'HOLD'], required: true },
  status: { type: String, required: true },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

const TasksHolds: Model<ITasksHolds> = mongoose.models.TasksHolds || mongoose.model<ITasksHolds>('TasksHolds', TasksHoldsSchema);

export default TasksHolds;
