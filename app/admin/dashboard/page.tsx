'use client';

import { useState } from 'react';
import AdminNav from '@/components/admin/AdminNav';
import RoutesManager from '@/components/admin/RoutesManager';
import GlobalRulesManager from '@/components/admin/GlobalRulesManager';
import RegisterForm from '@/components/admin/RegisterForm';
import LogoutButton from '@/components/admin/LogoutButton';
import BookingsManager from '@/components/admin/BookingsManager';
import QuotesManager from '@/components/admin/QuotesManager';

type Tab = 'routes' | 'global-rules' | 'users' | 'bookings' | 'quotes';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('bookings');

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-black">Dashboard Admin</h1>
              <p className="text-gray-600 text-sm mt-1">
                Gestione completa Lake Como in Car
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <AdminNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="pb-12">
          {activeTab === 'routes' && <RoutesManager />}
          
          {activeTab === 'global-rules' && <GlobalRulesManager />}
          
          {activeTab === 'users' && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-black mb-2">
                  Gestione Utenti
                </h2>
                <p className="text-gray-600">
                  Crea nuovi utenti per accedere alla dashboard admin
                </p>
              </div>
              <RegisterForm />
            </div>
          )}
          
          {activeTab === 'bookings' && <BookingsManager />}
          
          {activeTab === 'quotes' && <QuotesManager />}
        </div>
      </div>
    </div>
  );
}
