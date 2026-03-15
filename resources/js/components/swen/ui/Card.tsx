import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, onClick, selected = false, className = '', hoverable = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        card transition-all duration-300
        ${selected ? 'stepper-current shadow-xl scale-105' : 'stepper-upcoming shadow-md'}
        ${hoverable ? 'hover:stepper-current hover:shadow-xl hover:scale-105 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
