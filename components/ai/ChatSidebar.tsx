'use client';

import { useState, useEffect } from 'react';

interface Session {
  _id: string;
  title: string;
  lastMessageAt: string;
}

interface ChatSidebarProps {
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
}

export default function ChatSidebar({ activeSessionId, onSelectSession, onNewChat, onDeleteSession }: ChatSidebarProps) {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetchSessions();
  }, [activeSessionId]);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/ai-chat');
      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (error) {
      console.error('Failed to fetch sessions', error);
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onNewChat}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition"
        >
          + New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <h3 className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent History</h3>
        {sessions.map((session) => (
          <div
            key={session._id}
            className={`group flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-800 transition ${
              activeSessionId === session._id ? 'bg-gray-800' : ''
            }`}
            onClick={() => onSelectSession(session._id)}
          >
            <span className="truncate text-sm mr-2">{session.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSession(session._id);
              }}
              className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
