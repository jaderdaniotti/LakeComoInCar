'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import data from '@/src/data/images';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isMobileTourOpen, setIsMobileTourOpen] = useState(false);
  
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();
  
  // Nascondi il cambio lingua nella dashboard admin
  const isAdminRoute = pathname?.startsWith('/admin');
  
  // Helper to create localized paths
  const localePath = (path: string) => {
    return locale === 'it' ? path : `/${locale}${path}`;
  };

  const navLinks = [
    { href: localePath('/'), label: t('nav.home') },
    { href: localePath('/servizi'), label: t('nav.services') },
    { href: localePath('/veicoli'), label: t('nav.vehicles') },
  ];

  const tourLinks = [
    { 
      href: localePath('/tour/lago-como'), 
      label: t('tours.lakeComo'),
      description: t('tours.lakeComoDesc')
    },
    { 
      href: localePath('/tour/bernina-express'), 
      label: t('tours.bernina'),
      description: t('tours.berninaDesc')
    },
    { 
      href: localePath('/tour/st-moritz'), 
      label: t('tours.stMoritz'),
      description: t('tours.stMoritzDesc')
    },
    { 
      href: localePath('/tour/shopping'), 
      label: t('tours.shopping'),
      description: t('tours.shoppingDesc')
    },
  ];

  const otherLinks = [
    { href: localePath('/prenota'), label: t('nav.booking') },
    { href: localePath('/preventivo'), label: t('nav.quote') },
    { href: localePath('/contatti'), label: t('nav.contacts') },
  ];



  return (
    <nav className="fixed animate__animated animate__fadeInDown top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href={localePath('/')} className="flex items-center justify-center space-x-2 overflow-hidden">
            <Image src={data.logo} alt="Como Lake Car" height={100} width={100} className='w-full h-full object-contain'/>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black font-medium uppercase text-sm tracking-wider p-3 rounded-md hover:bg-black/10 hover:text-gray-600 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Desktop Tour Dropdown */}
            {/* <div 
              className="relative"
              onMouseEnter={() => setIsTourOpen(true)}
              onMouseLeave={() => setIsTourOpen(false)}
            > */}
              {/* <button
                className="flex items-center gap-1 text-black font-medium uppercase text-sm tracking-wider hover:text-gray-600 transition-colors duration-200"
              >
                {t('nav.tours')}
                <ChevronDown size={16} className={`transition-transform duration-200 ${isTourOpen ? 'rotate-180' : ''}`} />
              </button> */}
              
              {/* Dropdown Menu */}
              {/* {isTourOpen && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[600px]"
                >
                  <div className="max-h-[calc(100vh-120px)] overflow-y-auto bg-white border-2 border-black shadow-xl">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      {tourLinks.map((tour) => (
                        <Link
                          key={tour.href}
                          href={tour.href}
                          className="group block p-4 border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
                        >
                          <div className="w-full h-32 border-2 border-dashed border-gray-300 group-hover:border-white mb-3 flex items-center justify-center bg-gray-50 group-hover:bg-gray-800 transition-colors duration-200">
                            <span className="text-xs text-gray-400 group-hover:text-gray-300 uppercase tracking-wider">Immagine</span>
                          </div>
                          <h3 className="font-bold uppercase text-sm mb-1">{tour.label}</h3>
                          <p className="text-xs text-gray-600 group-hover:text-gray-300">{tour.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )} */}
            {/* </div> */}

            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black font-medium uppercase text-sm tracking-wider p-3 rounded-md hover:bg-black/10 hover:text-gray-600 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Language Switcher */}
            {!isAdminRoute && <LocaleSwitcher />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {!isAdminRoute && <LocaleSwitcher />}
            <button
              className="text-black"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t-2 border-black mt-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-black font-medium uppercase text-sm tracking-wider hover:text-gray-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Tour Accordion */}
            {/* <div>
              <button
                onClick={() => setIsMobileTourOpen(!isMobileTourOpen)}
                className="flex items-center justify-between w-full py-3 text-black font-medium uppercase text-sm tracking-wider hover:text-gray-600 transition-colors duration-200"
              >
                {t('nav.tours')}
                <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileTourOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMobileTourOpen && (
                <div className="pl-4 space-y-3 mt-2 mb-4 max-h-[60vh] overflow-y-auto">
                  {tourLinks.map((tour) => (
                    <Link
                      key={tour.href}
                      href={tour.href}
                      className="block border-2 border-black p-3 hover:bg-black hover:text-white transition-all duration-200"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileTourOpen(false);
                      }}
                    >
                      <div className="w-full h-24 border-2 border-dashed border-gray-300 mb-2 flex items-center justify-center bg-gray-50">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Immagine</span>
                      </div>
                      <h3 className="font-bold uppercase text-xs mb-1">{tour.label}</h3>
                      <p className="text-xs text-gray-600">{tour.description}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div> */}

            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-black font-medium uppercase text-sm tracking-wider hover:text-gray-600 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
