import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChatSession from '@/models/ai/ChatSession';
import mongoose from 'mongoose';

// Mock student ID for now - in a real app this would come from auth
const MOCK_STUDENT_ID = new mongoose.Types.ObjectId('65a123456789012345678901');

export async function GET() {
  await dbConnect();
  try {
    const sessions = await ChatSession.find({ studentId: MOCK_STUDENT_ID }).sort({ lastMessageAt: -1 });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { title } = await request.json();
    const newSession = await ChatSession.create({
      studentId: MOCK_STUDENT_ID,
      title: title || 'New Chat',
    });
    return NextResponse.json(newSession);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
