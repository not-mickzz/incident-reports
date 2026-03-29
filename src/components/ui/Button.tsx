'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'danger' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm',
  danger:
    'bg-red-600 hover:bg-red-700 text-white font-bold shadow-sm',
  secondary:
    'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold',
  ghost:
    'text-slate-600 hover:text-slate-800 hover:bg-slate-100 font-semibold',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-6 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-base rounded-xl shadow-lg shadow-blue-200 hover:-translate-y-0.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${variantStyles[variant]} ${sizeStyles[size]} transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
