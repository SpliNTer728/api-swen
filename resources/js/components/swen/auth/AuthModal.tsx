import { Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, mode: initialMode }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Erreur de connexion');
      return;
    }
    login(data.token);
    onClose();
    setEmail('');
    setPassword('');
    navigate('/dashboard');
  } catch {
    setError('Erreur de connexion');
  } finally {
    setLoading(false);
  }
};

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const signupError = false;
      if (signupError) throw signupError;
      onClose();
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Permute entre login et signup
  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    setError(null);
    setSuccess(null);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const error = false; //} = await supabase.auth.resetPasswordForEmail();

      if (error) throw error;

      setSuccess('Un email de réinitialisation a été envoyé à votre adresse');
      setEmail('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
/*
  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    console.log(provider)
    setLoading(true);
    setError(null);

    try {
      const error = false; // } = await supabase.auth.signInWithOAuth();

      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
*/
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg w-full">
      <div className="mx-auto">
        <h2
          className="text-3xl font-bold modal-title mb-6 text-center"
        >
          {mode === 'login' ? t.auth.loginTitle : mode === 'signup' ? t.auth.signupTitle : 'Réinitialiser le mot de passe'}
        </h2>

        {/* <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-semibold text-gray-700">Continuer avec Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin('facebook')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="font-semibold">Continuer avec Facebook</span>
          </button>
        </div> */}

        {/* {mode !== 'reset' && (
          <>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec email</span>
              </div>
            </div>
          </>
        )} */}

        {mode === 'reset' && (
          <p className="text-sm text-gray-600 mb-6 text-center">
            Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
          </p>
        )}

        <form onSubmit={mode === 'reset' ? handleResetPassword : mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.auth.firstName}
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10113A] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.auth.lastName}
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10113A] focus:border-transparent"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t.auth.email}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10113A] focus:border-transparent"
              required
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t.auth.password}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10113A] focus:border-transparent"
                required
              />
            </div>
          )}

          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setMode('reset');
                  setError(null);
                  setSuccess(null);
                }}
                className="text-sm text-[#10113A] hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? '...' : mode === 'reset' ? (
              <>
                <Mail className="w-5 h-5 mr-2 inline" />
                Envoyer le lien
              </>
            ) : mode === 'login' ? t.auth.loginButton : t.auth.signupButton}
          </Button>
        </form>

        <div className="mt-6 text-center">
          {mode === 'reset' ? (
            <button
              onClick={() => {
                setMode('login');
                setError(null);
                setSuccess(null);
              }}
              className="text-[#10113A] hover:text-opacity-80 text-sm font-medium"
            >
              Retour à la connexion
            </button>
          ) : (
            <button
              onClick={toggleMode}
              className="text-[#10113A] hover:text-opacity-80 text-sm font-medium"
            >
              {mode === 'login' ? t.auth.noAccount : t.auth.hasAccount}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
