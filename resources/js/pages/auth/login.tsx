import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/password-input';
import InputError from '@/components/input-error';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message ?? 'Login failed.');
                return;
            }

            login(data.token);
            navigate('/dashboard');
        } catch {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCardLayout title="Connexion" description="Entrez vos identifiants pour accéder à votre compte">
            <div className="flex flex-col gap-3 mb-2">
                <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 px-4 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition text-sm">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    Continuer avec Google
                </button>
                <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 px-4 font-semibold text-gray-700 bg-white hover:bg-gray-50 transition text-sm">
                    <img src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" className="w-5 h-5" />
                    Continuer avec Facebook
                </button>
            </div>

            <div className="flex items-center gap-3 my-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="text-gray-400 text-sm">Ou continuer avec email</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Link
                            to="/forgot-password"
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Mot de passe oublié ?
                        </Link>
                    </div>
                    <PasswordInput
                        id="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputError message={error} />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                    {loading ? 'Connexion en cours…' : 'Se connecter'}
                </Button>

                <p className="text-center text-sm text-gray-700">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="underline underline-offset-4">
                        Créer un compte
                    </Link>
                </p>
            </form>
        </AuthCardLayout>
    );
}
