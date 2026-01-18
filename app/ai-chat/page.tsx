'use client';

import { useState, useEffect, useRef } from 'react';
import ChatSidebar from '@/components/ai/ChatSidebar';
import ChatMessage from '@/components/ai/ChatMessage';

interface Message {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Session {
  _id: string;
  title: string;
}

export default function AIChatPage() {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSessionId) {
      fetchMessages(activeSessionId);
    } else {
      setMessages([]);
    }
  }, [activeSessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async (sessionId: string) => {
    try {
      const res = await fetch(`/api/ai-chat/${sessionId}`);
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const handleNewChat = async () => {
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat' }),
      });
      const newSession = await res.json();
      setActiveSessionId(newSession._id);
    } catch (error) {
      console.error('Failed to create new chat', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    let sessionId = activeSessionId;
    if (!sessionId) {
      // Create a session if none exists
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.substring(0, 30) + (input.length > 30 ? '...' : '') }),
      });
      const newSession = await res.json();
      sessionId = newSession._id;
      setActiveSessionId(sessionId);
    }

    const userMsgContent = input;
    setInput('');
    setIsLoading(true);

    // Optimistic update
    const tempUserMsg: Message = { _id: 'temp-u', role: 'user', content: userMsgContent };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const res = await fetch(`/api/ai-chat/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMsgContent }),
      });
      const data = await res.json();
      
      // Replace optimistic message and add AI response
      setMessages(prev => {
        const filtered = prev.filter(m => m._id !== 'temp-u');
        return [...filtered, data.userMessage, data.assistantMessage];
      });
    } catch (error) {
      console.error('Failed to send message', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    if (!activeSessionId) return;
    try {
      const res = await fetch(`/api/ai-chat/${activeSessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, content: newContent }),
      });
      const updated = await res.json();
      setMessages(prev => prev.map(m => m._id === messageId ? updated : m));
    } catch (error) {
      console.error('Failed to edit message', error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!activeSessionId) return;
    try {
      await fetch(`/api/ai-chat/${activeSessionId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId }),
      });
      setMessages(prev => prev.filter(m => m._id !== messageId));
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await fetch(`/api/ai-chat/${sessionId}`, {
        method: 'DELETE',
      });
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
      }
    } catch (error) {
      console.error('Failed to delete session', error);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header (Sheridan themed) */}
        <header className="bg-[#003366] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <h1 className="text-xl font-bold">Sheridan</h1>
          </div>
          <div className="bg-white rounded-full p-1">
             <svg className="w-6 h-6 text-[#003366]" fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
             </svg>
          </div>
        </header>

        {/* Subheader */}
        <div className="bg-gray-300 text-gray-700 px-4 py-2 text-sm font-medium">
          Sheridan AI
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p>How can I help you today?</p>
            </div>
          )}
          
          {messages.map((msg) => (
            <ChatMessage
              key={msg._id}
              message={msg}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-end mb-4">
              <div className="bg-gray-200 p-4 rounded-2xl rounded-br-none animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-100">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I help?"
              className="w-full bg-gray-100 border-2 border-[#003366] rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003366] hover:text-blue-800 disabled:opacity-50"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
