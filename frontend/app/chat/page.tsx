'use client';

import { SiteNav } from '@/components/site-nav';
import { useState } from 'react';

// Types
type Message = {
  id: string;
  author: string;
  role: string;
  time: string;
  content: string;
  hasCode?: boolean;
  codeContent?: string;
};

// Reusable Components
const Avatar = ({ name }: { name: string }) => (
  <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
    {name.slice(0, 2).toUpperCase()}
  </div>
);

const Badge = ({ text, color = "blue" }: { text: string; color?: string }) => {
  const colors = {
    blue: "bg-blue-600/20 text-blue-400",
    purple: "bg-purple-600/20 text-purple-400"
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[color as keyof typeof colors]}`}>
      {text}
    </span>
  );
};

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-2 bg-[#0d1117] rounded-lg border border-gray-800 overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
      <span className="text-xs text-gray-400">jsx</span>
      <button className="text-xs text-gray-400 hover:text-white transition-colors">
        Copy
      </button>
    </div>
    <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

const MessageItem = ({ message }: { message: Message }) => (
  <div className="flex gap-3 px-4 py-4 hover:bg-gray-800/30 transition-colors">
    <Avatar name={message.author} />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-white">{message.author}</span>
        <Badge text={message.role} color={message.role === "LVL 10 SORCERER" ? "purple" : "blue"} />
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
      <div className="text-gray-300 text-sm leading-relaxed">
        {message.content}
      </div>
      {message.hasCode && message.codeContent && (
        <CodeBlock code={message.codeContent} />
      )}
    </div>
  </div>
);

const MessageInput = () => {
  const [message, setMessage] = useState('');
  
  return (
    <div className="border-t border-gray-800 bg-[#0a0e1a]">
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <span className="font-bold">B</span>
          </button>
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <span className="italic">I</span>
          </button>
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <span className="text-xs">{'</>'}</span>
          </button>
          <button className="p-1 text-gray-400 hover:text-white transition-colors">
            <span className="text-xs">🔗</span>
          </button>
        </div>
        
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here... (Markdown supported)"
            className="w-full bg-gray-900 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 border border-gray-800"
            rows={3}
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">Enter to send</span>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2">
            Send
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Chat Component
export default function ChatPage() {
  const messages: Message[] = [
    {
      id: '1',
      author: 'PixelPuncher',
      role: 'LVL 9 MAGE',
      time: '10:42 AM',
      content: "Hey everyone! 👋 Has anyone started the React State Management quest yet? I'm stuck on the Context API part.",
    },
    {
      id: '2',
      author: 'ComponentQueen',
      role: 'LVL 10 SORCERER',
      time: '10:44 AM',
      content: "Yeah, I just finished that dungeon! 🎉 The trick is to make sure you're wrapping your provider correctly at the root.\n\nTry something like this:",
      hasCode: true,
      codeContent: `export default function App() {
  return (
    <QueryProvider>
      <MainComponent />
    </QueryProvider>
  );
}`
    },
    {
      id: '3',
      author: 'AsyncNinja',
      role: 'LVL 8 WIZARD',
      time: '10:50 AM',
      content: "Also don't forget to wrap the context in a custom hook, it makes accessing the context way...",
    }
  ];

  const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Quests", href: "/paths" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Profile", href: "/profile" },
]
  return (
    <>
    <SiteNav links={navLinks} showXP xp={0} level={12} showStreak streak={14} />
    <div className="flex flex-col h-screen bg-[#0f1419] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#0a0e1a]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500 text-xl">⚡</span>
            <h1 className="text-xl font-bold">Global Lobby</h1>
          </div>
          <p className="text-sm text-gray-400">Welcome to the general chat. Be nice and level up together.</p>
        </div>
        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors">
          Today
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          
          {/* Reaction indicator */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-1 text-xs text-gray-500 ml-11">
              <span className="text-yellow-500">⭐</span>
              <span>FullStackHero reacted via React 😅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <MessageInput />
    </div>
    </>
  );
}