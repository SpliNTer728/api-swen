import { User, LogOut, Globe, Home, Settings } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from '@/components/swen/auth/AuthModal';
import { Button } from '@/components/swen/ui/Button';
interface UserType {
  first_name?: string;
  prenom?: string;
  email?: string;
}

interface HeaderProps {
  user?: UserType | null;
  language?: string;
}

export function Header({ user = null, language = 'fr' }: HeaderProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAccountClick = () => {
    console.log(setAuthMode);
    setIsAuthModalOpen(true);
  };

  return (
    <>

      <header className="card shadow-sm sticky top-0 z-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8">
            <div className="flex-1"></div>

            <div className="flex items-center gap-4">

              {/* Language */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
                <Globe className="w-5 h-5 modal-title" />
                <span className="text-sm font-medium uppercase modal-title">
                  {language}
                </span>
              </div>

              {/* User */}
              {user ? (
                <div className="flex items-center gap-3">

                  <div className="flex items-center gap-2 px-3 py-2 text-[#10113A]">
                    <Home className="w-5 h-5" />
                    <span className="text-sm font-medium">Accueil</span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 text-[#10113A]">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {user.first_name || user.prenom
                        ? `Bienvenue ${user.first_name || user.prenom}`
                        : 'Mon compte'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 text-[#10113A]">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm">Paramètres</span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 text-red-600">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">Logout</span>
                  </div>

                </div>
              ) : (
                <Button onClick={handleAccountClick} variant="primary" size="sm">
                  Connexion
                </Button>
              )}

            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />
    </>
  );
}