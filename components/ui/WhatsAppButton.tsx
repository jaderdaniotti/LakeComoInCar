'use client';

import {  X } from 'lucide-react';
import { useState, useMemo } from 'react';
import Link from 'next/link';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  position?: 'bottom-right' | 'bottom-left';
}

// Messaggi predefiniti per lingua
const messages = {
  it: 'Ciao! Vorrei informazioni sui vostri servizi NCC.',
  en: 'Hello! I would like information about your chauffeur services.',
  fr: 'Bonjour! Je voudrais des informations sur vos services de chauffeur.',
  es: '¡Hola! Me gustaría información sobre sus servicios de conductor.'
};

// Label tooltip per lingua
const tooltipLabels = {
  it: 'Chatta con noi su WhatsApp!',
  en: 'Chat with us on WhatsApp!',
  fr: 'Discutez avec nous sur WhatsApp!',
  es: '¡Chatea con nosotros en WhatsApp!'
};

// Helper function to detect language from pathname
const detectLanguageFromPath = (path: string): 'it' | 'en' | 'fr' | 'es' => {
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/fr')) return 'fr';
  if (path.startsWith('/es')) return 'es';
  return 'it';
};

export default function WhatsAppButton({ 
  phoneNumber = '393384056027',
  position = 'bottom-right'
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  // Detect language from URL - computed once on mount without causing re-renders
  const currentLang = useMemo(() => {
    if (typeof window !== 'undefined') {
      return detectLanguageFromPath(window.location.pathname);
    }
    return 'it';
  }, []);

  // Get message based on current language
  const message = messages[currentLang];
  const tooltipLabel = tooltipLabels[currentLang];

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const positionClasses = position === 'bottom-right' 
    ? 'right-4 sm:right-6' 
    : 'left-4 sm:left-6';

  if (!isVisible) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className={`fixed bottom-6 ${positionClasses} z-50 group`}>
        {/* Tooltip/Label */}
        <div className="absolute right-16 sm:right-20 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-lg shadow-lg border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none hidden md:block">
          <span className="font-semibold text-sm">{tooltipLabel}</span>
          {/* Arrow */}
          <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-black"></div>
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[7px] border-l-white"></div>
        </div>

        {/* Main Button */}
        <Link
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white  hover:animate-none"
          aria-label="Contattaci su WhatsApp"
        >
          <svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" width={24} height={24} stroke="#ffffff">
          <g id="SVGRepo_bgCarrier" strokeWidth={0}></g><g id="SVGRepo_tracerCarrier" strokeLinecap='round' strokeLinejoin='round'></g><g id="SVGRepo_iconCarrier"> <title>whatsapp</title> <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path> </g>
          </svg>
        </Link>

        {/* Close Button (optional) */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800"
          aria-label="Chiudi"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Pulsating Ring Animation */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-pulse::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 2px solid #25D366;
          animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      `}</style>
    </>
  );
}
