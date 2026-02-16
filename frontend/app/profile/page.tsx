export const dynamic = "force-dynamic";

'use client';

import { SiteNav } from '@/components/site-nav';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

// Types
type Trophy = {
  id: string;
  icon: string;
  name: string;
  description: string;
  locked?: boolean;
};

type Quest = {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  xpReward: string;
  status: 'completed' | 'in-progress' | 'available';
};

type Affiliation = {
  id: string;
  name: string;
  icon: string;
  link?: string;
};

// Reusable Components
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
  </div>
);

const TrophyCard = ({ trophy }: { trophy: Trophy }) => (
  <div className={`bg-gray-900/50 border ${trophy.locked ? 'border-gray-800' : 'border-blue-900/50'} rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-700/50 transition-colors ${trophy.locked ? 'opacity-40' : ''}`}>
    <div className="text-4xl mb-3">{trophy.icon}</div>
    <div className="text-sm font-semibold text-white text-center mb-1">{trophy.name}</div>
    <div className="text-xs text-gray-500 text-center">{trophy.description}</div>
    {trophy.locked && (
      <div className="mt-3 text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      </div>
    )}
  </div>
);

const QuestItem = ({ quest }: { quest: Quest }) => {
  const getStatusColor = () => {
    if (quest.status === 'completed') return 'text-green-400';
    if (quest.status === 'in-progress') return 'text-blue-400';
    return 'text-gray-400';
  };

  const getProgressColor = () => {
    if (quest.status === 'completed') return 'bg-green-500';
    return 'bg-blue-600';
  };

  return (
    <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
          {quest.icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white">{quest.title}</h3>
                {quest.status === 'completed' && (
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-400">{quest.description}</p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <div className={`text-lg font-bold ${getStatusColor()}`}>{quest.progress}%</div>
              <div className="text-xs text-gray-500">{quest.xpReward}</div>
            </div>
          </div>
          
          {quest.status !== 'completed' && (
            <div className="mb-3">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor()} transition-all duration-500`}
                  style={{ width: `${quest.progress}%` }}
                />
              </div>
            </div>
          )}
          
          {quest.status === 'in-progress' && (
            <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
              Resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SkillHexagon = ({ skills }: { skills: { label: string; value: number }[] }) => {
  // Simple visual representation
  const maxValue = 100;
  
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Background hexagon */}
        <polygon
          points="100,20 170,60 170,140 100,180 30,140 30,60"
          fill="none"
          stroke="#1f2937"
          strokeWidth="1"
        />
        
        {/* Skill hexagon */}
        <polygon
          points="100,50 140,70 140,130 100,150 60,130 60,70"
          fill="#3b82f6"
          fillOpacity="0.2"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((ratio, i) => (
          <polygon
            key={i}
            points={`100,${20 + 80 * ratio} ${30 + 140 * ratio},${60 + 80 * ratio} ${30 + 140 * ratio},${140 - 80 * ratio} 100,${180 - 80 * ratio} ${170 - 140 * ratio},${140 - 80 * ratio} ${170 - 140 * ratio},${60 + 80 * ratio}`}
            fill="none"
            stroke="#374151"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        
        {/* Skill labels */}
        <text x="100" y="15" textAnchor="middle" className="fill-gray-400 text-xs">TST</text>
        <text x="175" y="65" textAnchor="start" className="fill-gray-400 text-xs">BE</text>
        <text x="175" y="145" textAnchor="start" className="fill-gray-400 text-xs">OPS</text>
        <text x="100" y="195" textAnchor="middle" className="fill-gray-400 text-xs">ALG</text>
        <text x="20" y="145" textAnchor="end" className="fill-gray-400 text-xs">DES</text>
        <text x="20" y="65" textAnchor="end" className="fill-gray-400 text-xs">FE</text>
      </svg>
    </div>
  );
};

const AffiliationItem = ({ affiliation }: { affiliation: Affiliation }) => (
  <div className="flex items-center justify-between p-3 bg-gray-900/30 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-sm">
        {affiliation.icon}
      </div>
      <span className="text-sm text-gray-300">{affiliation.name}</span>
    </div>
    {affiliation.link && (
      <button className="text-gray-500 hover:text-gray-300 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </button>
    )}
  </div>
);

// Main Profile Component
export default function ProfilePage() {
  const trophies: Trophy[] = [
    { id: '1', icon: '🐛', name: 'Bug Hunter', description: 'Fixed 10 critical errors' },
    { id: '2', icon: '🔥', name: 'Streak Master', description: '30 Day Login Streak' },
    { id: '3', icon: '<>', name: 'JS Sorcerer II', description: 'Complete 20 Advanced' },
    { id: '4', icon: '🔒', name: 'React Architect', description: 'Build 5 Complex Apps', locked: true },
  ];

  const quests: Quest[] = [
    {
      id: '1',
      icon: 'JS',
      title: 'JavaScript Fundamentals',
      description: 'Master the basics, functions, and objects.',
      progress: 100,
      xpReward: 'Completed Oct 12',
      status: 'completed'
    },
    {
      id: '2',
      icon: 'CSS',
      title: 'Responsive Design Mastery',
      description: 'Build 3 mobile-first layouts.',
      progress: 87,
      xpReward: '+850 XP',
      status: 'completed'
    },
    {
      id: '3',
      icon: '⚛️',
      title: 'React: State Management',
      description: 'Current Objective: React Toolkit Ross Battle',
      progress: 73,
      xpReward: '+1200 XP',
      status: 'in-progress'
    }
  ];

  const affiliations: Affiliation[] = [
    { id: '1', name: '@alexbyte', icon: 'GH', link: 'https://github.com' },
    { id: '2', name: 'Alex Chen', icon: '𝕏', link: 'https://x.com' }
  ];

  const landingLinks = [
  { label: "Quests", href: "/paths" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Guilds", href: "/chat" },
]

    const user = useAuthStore((state) => state.user)

  return (
    <>
    <SiteNav links={landingLinks} showGitHub variant="landing"  />
    <div className="min-h-screen bg-[#0a0e1a] text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-900/50 rounded-xl p-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border-2 border-blue-500">
                <img 
                  src={user?.avatarUrl} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold">
                  {user?.level}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6 mb-4">
              <h1 className="text-xl font-bold mb-1">{user?.username}</h1>
              <p className="text-sm text-blue-400">Full Stack Mage</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>XP: {user?.totalXp}</span>
                <span>Next: {user?.totalXp + 100}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-2/3" />
              </div>
            </div>
            
            <div className="flex justify-around mb-6 pb-6 border-b border-gray-800">
              <StatCard value="#402" label="Global Rank" />
              <StatCard value={user?.longestStreak} label="Day Streak" />
            </div>
            
            <button className="w-full py-2.5 bg-blue-600/20 border border-blue-600 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-600/30 transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Loadout
            </button>
          </div>
          
          {/* Skill Hexagon */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-300">Skill Hex</h2>
            </div>
            <SkillHexagon skills={[]} />
          </div>
          
          {/* Guild Affiliations */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-4">
              Guild Affiliations
            </h2>
            <div className="space-y-2">
              {affiliations.map(affiliation => (
                <AffiliationItem key={affiliation.id} affiliation={affiliation} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Battle History */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">⚔️</span>
                <h2 className="text-lg font-bold">Battle History</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-gray-800 text-gray-400 text-xs rounded hover:bg-gray-700 transition-colors">
                  Idle
                </button>
                <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                  🏆 Legendary
                </button>
              </div>
            </div>
            
            {/* Battle Grid Visualization */}
            <div className="grid grid-cols-12 gap-2 mb-4">
              {Array.from({ length: 84 }).map((_, i) => {
                const isActive = Math.random() > 0.7;
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded ${
                      isActive 
                        ? intensity > 0.7 
                          ? 'bg-blue-500' 
                          : intensity > 0.4 
                            ? 'bg-blue-600' 
                            : 'bg-blue-800'
                        : 'bg-gray-800'
                    }`}
                  />
                );
              })}
            </div>
            
            <p className="text-center text-sm text-gray-500">
              ... Premium Quest: Log Data ...
            </p>
          </div>
          
          {/* Trophy Cabinet */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">🏆</span>
                <h2 className="text-lg font-bold">Trophy Cabinet</h2>
              </div>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trophies.map(trophy => (
                <TrophyCard key={trophy.id} trophy={trophy} />
              ))}
            </div>
          </div>
          
          {/* Quest Log */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-blue-500">📋</span>
              <h2 className="text-lg font-bold">Quest Log</h2>
            </div>
            
            <div className="space-y-4">
              {quests.map(quest => (
                <QuestItem key={quest.id} quest={quest} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div></>
  );
}