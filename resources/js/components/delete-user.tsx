import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

export default function DeleteUser() {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message ?? 'An error occurred.');
                return;
            }

            await logout();
            navigate('/login');
        } catch {
            setError('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-medium">Delete account</h3>
                <p className="text-sm text-muted-foreground">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                </p>
            </div>

            <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setPassword(''); setError(null); } }}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete account</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. Please enter your password to confirm.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleDelete} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="delete_password">Password</Label>
                            <Input
                                id="delete_password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        {error && <p className="text-sm text-destructive">{error}</p>}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="destructive" disabled={loading}>
                                {loading ? 'Deleting…' : 'Delete account'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
