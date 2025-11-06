'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChatClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/core/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.data.message }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-card border rounded-lg shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Start a conversation with AI</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted px-4 py-2 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-md bg-background"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
