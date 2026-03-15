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
        <AuthCardLayout title="Log in" description="Enter your credentials to access your account">
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
                        <Label htmlFor="password">Password</Label>
                        <Link
                            to="/forgot-password"
                            className="text-sm text-muted-foreground hover:underline"
                        >
                            Forgot password?
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

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in…' : 'Log in'}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/register" className="underline underline-offset-4">
                        Register
                    </Link>
                </p>
            </form>
        </AuthCardLayout>
    );
}
