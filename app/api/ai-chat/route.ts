
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  mockUser,
  mockTodaysClasses,
  mockFinancialSummary,
  mockAcademicProgress,
  mockEnrolledClasses
} from '@/lib/mock-data';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    // Read API key
    let apiKey: string;
    try {
      const apiKeyPath = path.join(process.cwd(), '.gemini_api');
      apiKey = (await fs.readFile(apiKeyPath, 'utf-8')).trim();
    } catch (error) {
      console.error('Failed to read API key:', error);
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please check .gemini_api file.' },
        { status: 500 }
      );
    }

    // Construct Context
    const studentContext = `
    You are the AI assistant for "My Student Centre" at Sheridan College.
    You are helpful, friendly, and concise.
    
    Current Student Information:
    - Name: ${mockUser.name}
    - Student ID: ${mockUser.id}
    - Program: ${mockUser.program}
    - GPA: ${mockUser.gpa}
    - Year: ${mockUser.year}
    
    Academic Progress:
    - Completed Credits: ${mockAcademicProgress.completedCredits}
    - Total Credits Needed: ${mockAcademicProgress.totalCredits}
    - Completion: ${mockAcademicProgress.completionPercentage}%
    
    Financials:
    - Total Balance Due: $${mockFinancialSummary.totalDue.toFixed(2)}
    
    Today's Schedule:
    ${mockTodaysClasses.length > 0
        ? mockTodaysClasses.map(c => `- ${c.code} (${c.name}) at ${c.startTime} in ${c.room}`).join('\n')
        : "No classes scheduled for today."}

    Currently Enrolled Courses (Winter 2026):
    ${mockEnrolledClasses.map(c => `- ${c.code}: ${c.name} (${c.professor})`).join('\n')}
    
    Instructions:
    - Answer questions based on this student data only.
    - If asked about something not in the data, explain that you only have access to current academic and financial summaries.
    - Be encouraging and supportive.
    `;

    // Construct history for Gemini REST API
    // Format: "contents": [{ role: "user" | "model", parts: [{ text: "..." }] }]
    const contents = [
      {
        role: "user",
        parts: [{ text: studentContext }]
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am ready to assist Alex Student with their academic queries." }]
      }
    ];

    // Append conversation history
    if (Array.isArray(history) && history.length > 0) {
      // Map simplified {role, content} to Gemini structure
      // Note: Gemini API expects roles 'user' and 'model'
      history.forEach((msg: any) => {
        // Skip the initial greeting if it's from assistant to avoid duplication or confusion in strict history
        if (msg.role === 'assistant' && msg.content.includes("Sheridan AI assistant")) return;

        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });
    }

    // Append current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const payload = {
      contents: contents
    };

    // Using gemini-1.5-flash as it's the current recommended fast model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error Response:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    // Extract text from response structure
    // content -> parts -> text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
}
