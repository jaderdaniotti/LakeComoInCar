'use client';

import { useState } from 'react';
import { Route, Users, Calendar, Settings } from 'lucide-react';

type Tab = 'routes' | 'global-rules' | 'users' | 'bookings';

interface AdminNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function AdminNav({ activeTab, onTabChange }: AdminNavProps) {
  const tabs = [
    { id: 'routes' as Tab, label: 'Percorsi', icon: Route },
    { id: 'global-rules' as Tab, label: 'Condizioni Generali', icon: Settings },
    { id: 'users' as Tab, label: 'Utenti', icon: Users },
    { id: 'bookings' as Tab, label: 'Prenotazioni/Preventivi', icon: Calendar },
  ];

  return (
    <div className="border-b-2 border-black bg-white mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 space-x-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all
                -mb-0.5
              ${
                activeTab === id
                  ? 'scale-105 text-black'
                  : 'border-transparent text-gray-600 '
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
