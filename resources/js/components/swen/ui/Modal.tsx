import { X } from 'lucide-react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
}

export function Modal({ isOpen, onClose, children, title, className, childrenClassName }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2">
      <div
        className="absolute inset-0 bg-[#10113A]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={`relative card shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn ${className ? className : 'max-w-md w-full'}`}
        onClick={e => e.stopPropagation()}
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          {title && (
            <h2 className="text-2xl font-bold modal-title">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className={`overflow-y-auto flex-1 p-6 ${childrenClassName || ''}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
