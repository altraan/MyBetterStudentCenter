'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';

interface Message {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: Message;
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
}

export default function ChatMessage({ message, onEdit, onDelete }: ChatMessageProps) {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const handleSave = () => {
    onEdit(message._id, editContent);
    setIsEditing(false);
  };

  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`relative group max-w-[80%] p-4 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-blue-900 text-white rounded-bs-none'
            : 'bg-gray-200 text-gray-800 rounded-be-none'
        }`}
      >
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="w-full bg-transparent border border-white/30 rounded p-2 text-inherit focus:outline-none"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end gap-2 text-xs">
              <button onClick={() => setIsEditing(false)} className="hover:underline">{t('cancel')}</button>
              <button onClick={handleSave} className="bg-white/20 px-2 py-1 rounded hover:bg-white/30">{t('save')}</button>
            </div>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap text-start">{message.content}</p>
            
            {/* Action buttons (only visible on hover) */}
            <div className={`absolute top-2 ${isUser ? '-end-12' : '-start-12'} flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition`}>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-500 bg-white rounded-full shadow border border-gray-100"
                title={t('editMessage')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(message._id)}
                className="p-1 text-gray-400 hover:text-red-500 bg-white rounded-full shadow border border-gray-100"
                title={t('deleteMessage')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
