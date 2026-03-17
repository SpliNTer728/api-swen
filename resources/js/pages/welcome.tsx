import { Link } from 'react-router-dom';
import AppLayout from '@/layouts/app-layout';
import { useAuth } from '@/contexts/AuthContext';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Welcome', href: '/welcome' },
];

export default function Welcome() {
    const { user } = useAuth();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome{user?.name ? `, ${user.name}` : ''}!
                </h1>
                <p className="mt-3 text-muted-foreground">
                    You're successfully logged in.
                </p>
                <Link
                    to="/dashboard"
                    className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                    Go to dashboard
                </Link>
            </div>
        </AppLayout>
    );
}
