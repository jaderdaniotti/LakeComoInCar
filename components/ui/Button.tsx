import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300 uppercase tracking-wider';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-900 active:scale-95',
    secondary: 'bg-white text-black hover:bg-gray-100 active:scale-95',
    outline: 'border-2 border-black text-black hover:bg-black hover:text-white active:scale-95',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
