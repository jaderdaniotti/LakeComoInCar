'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  
  // Helper to create localized paths
  const localePath = (path: string) => {
    return locale === 'it' ? path : `/${locale}${path}`;
  };

  return (
    <footer className="bg-black text-white border-t-2 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
              {t('common.siteName')}
            </h3>
            <p className="text-gray-300 mb-4">
              {t('home.about.description').slice(0, 150)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={localePath('/servizi')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath('/prenota')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t('nav.booking')}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath('/preventivo')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t('nav.quote')}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath('/contatti')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t('nav.contacts')}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath('/veicoli')}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t('nav.vehicles')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
              {t('nav.contacts')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-300" />
                <a
                  href={`tel:${t('common.phone')}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t('common.phone')}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-300" />
                <a
                  href={`mailto:${t('common.email')}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t('common.email')}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-300 mt-1" />
                <span className="text-gray-300">
                  Como, Lombardia, Italia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t-2 border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col items-center md:items-start space-y-1">
              <p className="text-gray-400 text-sm">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
              <p className="text-gray-400 text-sm">
                {t('footer.vat')}: 04193150135
              </p>
            </div>
            <div className="flex">
              <p className="text-gray-400 text-sm">
                Powered By <span> </span>
                <Link 
                  href="https://jaderdaniotti.netlify.app/" 
                  target="_blank" 
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                >
                  Jader Daniotti
                </Link>
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href={localePath('/privacy')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {t('nav.privacy')}
              </Link>
              <Link
                href={localePath('/cookie')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {t('nav.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
