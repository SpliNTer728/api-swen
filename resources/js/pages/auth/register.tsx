import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCardLayout from '@/layouts/auth/auth-card-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/password-input';
import InputError from '@/components/input-error';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors({});

        if (password !== passwordConfirmation) {
            setErrors({ password_confirmation: 'Passwords do not match.' });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    const flat: Record<string, string> = {};
                    for (const [field, msgs] of Object.entries(data.errors)) {
                        flat[field] = (msgs as string[])[0];
                    }
                    setErrors(flat);
                } else {
                    setErrors({ general: data.message ?? 'Registration failed.' });
                }
                return;
            }

            login(data.token);
            navigate('/dashboard');
        } catch {
            setErrors({ general: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCardLayout title="Create an account" description="Enter your details to get started">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>

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
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                    <PasswordInput
                        id="password_confirmation"
                        autoComplete="new-password"
                        required
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <InputError message={errors.general} />

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating account…' : 'Create account'}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="underline underline-offset-4">
                        Log in
                    </Link>
                </p>
            </form>
        </AuthCardLayout>
    );
}
