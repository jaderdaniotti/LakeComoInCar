import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
              Como Lake Car
            </h3>
            <p className="text-gray-300 mb-4">
              Servizio professionale di noleggio auto con conducente per Como, Milano e Svizzera.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
              Link Utili
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servizi"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Servizi
                </Link>
              </li>
              <li>
                <Link
                  href="/prenota"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Prenota Online
                </Link>
              </li>
              <li>
                <Link
                  href="/preventivo"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Richiedi Preventivo
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">
              Contatti
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-300" />
                <a
                  href="tel:+390314123456"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  +39 031 412 3456
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-300" />
                <a
                  href="mailto:info@comolakecar.it"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  info@comolakecar.it
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
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Como Lake Car. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
