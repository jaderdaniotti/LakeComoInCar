import Link from 'next/link';

interface GDPRDisclaimerProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function GDPRDisclaimer({ checked, onChange, className = '' }: GDPRDisclaimerProps) {
  return (
    <div className={`border-2 border-gray-300 p-4 bg-gray-50 ${className}`}>
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="gdpr-consent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-1 w-5 h-5 border-2 border-black focus:ring-2 focus:ring-black cursor-pointer flex-shrink-0"
        />
        <label htmlFor="gdpr-consent" className="text-sm text-gray-700 cursor-pointer">
          <span className="font-semibold text-black">Accetto le condizioni di trattamento dei dati personali *</span>
          <br />
          <span className="text-xs leading-relaxed mt-1 inline-block">
            Compilando e inviando questo modulo, dichiari di aver letto e accettato le condizioni 
            generali contenute nella{' '}
            <Link 
              href="/privacy" 
              target="_blank"
              className="text-black underline hover:text-gray-600 font-semibold"
            >
              Privacy Policy
            </Link>
            {' '}e nella{' '}
            <Link 
              href="/cookie" 
              target="_blank"
              className="text-black underline hover:text-gray-600 font-semibold"
            >
              Cookie Policy
            </Link>
            . I tuoi dati saranno trattati in conformità al Regolamento UE 2016/679 (GDPR) 
            per la gestione della prenotazione e per le comunicazioni relative al servizio richiesto.
          </span>
        </label>
      </div>
    </div>
  );
}
