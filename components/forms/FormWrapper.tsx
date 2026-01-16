import { FormHTMLAttributes, ReactNode } from 'react';

interface FormWrapperProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function FormWrapper({
  children,
  title,
  subtitle,
  className = '',
  ...props
}: FormWrapperProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && (
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
        </div>
      )}
      <form
        className={`bg-white border-2 border-black p-8 md:p-12 space-y-6 ${className}`}
        {...props}
      >
        {children}
      </form>
    </div>
  );
}
