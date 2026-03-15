import { Info } from 'lucide-react';
import React from 'react';

interface InfoIconButtonProps {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

export const InfoIconButton: React.FC<InfoIconButtonProps> = ({ onClick, ariaLabel = 'Aide', className }) => (
  <button
    type="button"
    aria-label={ariaLabel}
    onClick={onClick}
    className={`p-0.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 ml-1 flex items-center justify-center ${className || ''}`}
    style={{ width: 22, height: 22 }}
  >
    <Info className="w-4 h-4 text-blue-700" />
  </button>
);
