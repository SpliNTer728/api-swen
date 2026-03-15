import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'blueOutline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'btn-primary hover:bg-opacity-90 shadow-lg hover:shadow-xl',
    secondary: 'btn-gold hover:bg-opacity-90 shadow-lg hover:shadow-xl',
    outline: 'border-2 stepper-current hover:bg-opacity-90 hover:stepper-current hover:text-white',
    blueOutline: 'border-2 border-[#10113A] text-[#10113A] bg-white hover:bg-[#f5f6fa]',
    gold: 'bg-[#D4AF37] text-[#10113A] border-2 border-[#D4AF37] hover:bg-[#c9a233] hover:border-[#c9a233] shadow-lg',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
