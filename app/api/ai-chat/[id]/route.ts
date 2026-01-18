import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChatSession from '@/models/ai/ChatSession';
import ChatMessage from '@/models/ai/ChatMessage';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const session = await ChatSession.findById(id);
    if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

    const messages = await ChatMessage.find({ sessionId: id }).sort({ createdAt: 1 });
    return NextResponse.json({ session, messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch session data' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const { content } = await request.json();

    // 1. Save user message
    const userMessage = await ChatMessage.create({
      sessionId: id,
      role: 'user',
      content,
    });

    // 2. Update session lastMessageAt
    await ChatSession.findByIdAndUpdate(id, { lastMessageAt: new Date() });

    // 3. Generate Mock AI response (Simulating Generative AI)
    const aiResponse = `This is a mock AI response to: "${content}". In a real implementation, this would call an AI model API.`;
    
    const assistantMessage = await ChatMessage.create({
      sessionId: id,
      role: 'assistant',
      content: aiResponse,
    });

    return NextResponse.json({ userMessage, assistantMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const { title, messageId, content } = await request.json();

    if (messageId) {
      // Edit a specific message
      const updatedMessage = await ChatMessage.findByIdAndUpdate(messageId, { content }, { new: true });
      return NextResponse.json(updatedMessage);
    } else if (title) {
      // Edit session title
      const updatedSession = await ChatSession.findByIdAndUpdate(id, { title }, { new: true });
      return NextResponse.json(updatedSession);
    }

    return NextResponse.json({ error: 'Invalid update request' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = await params;
    const { messageId } = await request.json().catch(() => ({}));

    if (messageId) {
      // Delete a specific message
      await ChatMessage.findByIdAndDelete(messageId);
      return NextResponse.json({ success: true });
    } else {
      // Delete entire session and its messages
      await ChatSession.findByIdAndDelete(id);
      await ChatMessage.deleteMany({ sessionId: id });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
