import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  help?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, help, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2 text-black">
            {label}
            {props.required && <span className="text-black ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 border-2 border-black bg-white text-black
            focus:outline-none focus:ring-2 focus:ring-black focus:border-black
            transition-all duration-200
            placeholder:text-gray-500
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        {help && !error && (
          <p className="mt-1 text-xs text-gray-500">{help}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
