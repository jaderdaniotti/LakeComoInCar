'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie, Settings, Check } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be changed
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Check if consent has already been given
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Here you would typically initialize tracking scripts based on preferences
    if (prefs.analytics) {
      // Initialize Google Analytics or similar
      console.log('Analytics cookies enabled');
    }
    if (prefs.marketing) {
      // Initialize marketing cookies
      console.log('Marketing cookies enabled');
    }
    if (prefs.functional) {
      // Initialize functional cookies
      console.log('Functional cookies enabled');
    }
  };

  // Accept all cookies
  const acceptAll = () => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allPreferences);
    savePreferences(allPreferences);
    setIsVisible(false);
  };

  // Reject optional cookies (keep only necessary)
  const rejectOptional = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    savePreferences(necessaryOnly);
    setIsVisible(false);
  };

  // Save custom preferences
  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setIsVisible(false);
  };

  // Toggle preference
  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 bg-opacity-50 z-60 transition-opacity duration-300"
        onClick={() => !showSettings && setIsVisible(false)}
      />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-60 animate-slide-up">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="bg-white border-4 border-black shadow-2xl">
            
            {/* Header */}
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cookie className="w-6 h-6" />
                <h2 className="text-xl font-bold uppercase tracking-wider">
                  Utilizzo dei Cookie
                </h2>
              </div>
              <button
                onClick={rejectOptional}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Chiudi"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!showSettings ? (
                // Simple View
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Utilizziamo cookie per migliorare la tua esperienza di navigazione, 
                    analizzare il traffico del sito e personalizzare i contenuti. 
                    Accettando, consenti l&apos;uso di tutti i cookie. Puoi personalizzare 
                    le tue preferenze o rifiutare i cookie non essenziali.
                  </p>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Per maggiori informazioni consulta la nostra</span>
                    <Link 
                      href="/cookie" 
                      className="text-black underline hover:text-gray-600 font-semibold"
                      target="_blank"
                    >
                      Cookie Policy
                    </Link>
                    <span>e</span>
                    <Link 
                      href="/privacy" 
                      className="text-black underline hover:text-gray-600 font-semibold"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      onClick={acceptAll}
                      className="flex-1 bg-black text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200 border-2 border-black"
                    >
                      Accetta Tutti
                    </button>
                    
                    <button
                      onClick={rejectOptional}
                      className="flex-1 bg-white text-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors duration-200 border-2 border-black"
                    >
                      Solo Necessari
                    </button>
                    
                    <button
                      onClick={() => setShowSettings(true)}
                      className="flex items-center justify-center space-x-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors duration-200 border-2 border-black"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Personalizza</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Detailed Settings View
                <div className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-black mb-2">
                      Personalizza le Preferenze
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Scegli quali tipologie di cookie accettare. I cookie necessari sono sempre attivi 
                      per garantire il corretto funzionamento del sito.
                    </p>
                  </div>

                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {/* Necessary Cookies */}
                    <div className="border-2 border-black p-4 bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-bold text-black text-lg">
                              Cookie Necessari
                            </h4>
                            <span className="text-xs bg-black text-white px-2 py-1 font-bold">
                              SEMPRE ATTIVI
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Essenziali per il funzionamento del sito. Non possono essere disattivati.
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="w-12 h-6 bg-black rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Functional Cookies */}
                    <div className="border-2 border-gray-300 p-4 hover:border-black transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-black text-lg mb-2">
                            Cookie Funzionali
                          </h4>
                          <p className="text-sm text-gray-600">
                            Permettono di ricordare le tue scelte (es. lingua, regione) per una 
                            migliore esperienza personalizzata.
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => togglePreference('functional')}
                            className={`w-12 h-6 rounded-full transition-colors duration-200 flex items-center ${
                              preferences.functional ? 'bg-black justify-end' : 'bg-gray-300 justify-start'
                            } px-1`}
                            aria-label="Toggle functional cookies"
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="border-2 border-gray-300 p-4 hover:border-black transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-black text-lg mb-2">
                            Cookie Analitici
                          </h4>
                          <p className="text-sm text-gray-600">
                            Ci aiutano a capire come i visitatori interagiscono con il sito, 
                            raccogliendo dati in forma anonima.
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => togglePreference('analytics')}
                            className={`w-12 h-6 rounded-full transition-colors duration-200 flex items-center ${
                              preferences.analytics ? 'bg-black justify-end' : 'bg-gray-300 justify-start'
                            } px-1`}
                            aria-label="Toggle analytics cookies"
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="border-2 border-gray-300 p-4 hover:border-black transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-black text-lg mb-2">
                            Cookie di Marketing
                          </h4>
                          <p className="text-sm text-gray-600">
                            Utilizzati per tracciare i visitatori attraverso i siti web e mostrare 
                            annunci pubblicitari pertinenti.
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            onClick={() => togglePreference('marketing')}
                            className={`w-12 h-6 rounded-full transition-colors duration-200 flex items-center ${
                              preferences.marketing ? 'bg-black justify-end' : 'bg-gray-300 justify-start'
                            } px-1`}
                            aria-label="Toggle marketing cookies"
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-2 border-gray-200">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="flex-1 bg-white text-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors duration-200 border-2 border-gray-300"
                    >
                      Indietro
                    </button>
                    
                    <button
                      onClick={saveCustomPreferences}
                      className="flex-1 flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200 border-2 border-black"
                    >
                      <Check className="w-5 h-5" />
                      <span>Salva Preferenze</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
}
