'use client';

import { useState } from 'react';
import { Route, Users, Calendar, FileText, Settings } from 'lucide-react';

type Tab = 'routes' | 'global-rules' | 'users' | 'bookings' | 'quotes';

interface AdminNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function AdminNav({ activeTab, onTabChange }: AdminNavProps) {
  const tabs = [
    { id: 'routes' as Tab, label: 'Percorsi', icon: Route },
    { id: 'global-rules' as Tab, label: 'Condizioni', icon: Settings },
    { id: 'bookings' as Tab, label: 'Prenotazioni', icon: Calendar },
    { id: 'quotes' as Tab, label: 'Preventivi', icon: FileText },
    { id: 'users' as Tab, label: 'Utenti', icon: Users },
  ];

  return (
    <div className="border-b-2 border-black mb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              flex items-center justify-center gap-2 px-4 py-4 font-medium transition-all border-b-4
              ${
                activeTab === id
                  ? 'border-black text-black bg-white'
                  : 'border-transparent text-gray-600 hover:text-black hover:border-gray-300'
              }
            `}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
