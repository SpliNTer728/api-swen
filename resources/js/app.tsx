import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Pages
import Dashboard from '@/pages/dashboard';
import Welcome from '@/pages/welcome';
import Swen from '@/pages/swen';

// Auth pages
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import ForgotPassword from '@/pages/auth/forgot-password';
import ResetPassword from '@/pages/auth/reset-password';
import VerifyEmail from '@/pages/auth/verify-email';
import ConfirmPassword from '@/pages/auth/confirm-password';
import TwoFactorChallenge from '@/pages/auth/two-factor-challenge';

// Settings pages
import Appearance from '@/pages/settings/appearance';
import Password from '@/pages/settings/password';
import Profile from '@/pages/settings/profile';
import TwoFactor from '@/pages/settings/two-factor';

import '../css/app.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
}

function AppRoutes() {
    return (
        <Routes>
            {/* Root */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Guest-only */}
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
            <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
            <Route path="/reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>} />
            <Route path="/two-factor-challenge" element={<GuestRoute><TwoFactorChallenge /></GuestRoute>} />

            {/* Semi-protected (require auth but not full session) */}
            <Route path="/verify-email" element={<ProtectedRoute><VerifyEmail /></ProtectedRoute>} />
            <Route path="/confirm-password" element={<ProtectedRoute><ConfirmPassword /></ProtectedRoute>} />

            {/* Protected */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
            <Route path="/swen" element={<ProtectedRoute><Swen /></ProtectedRoute>} />

            {/* Settings */}
            <Route path="/settings/appearance" element={<ProtectedRoute><Appearance /></ProtectedRoute>} />
            <Route path="/settings/password" element={<ProtectedRoute><Password /></ProtectedRoute>} />
            <Route path="/settings/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/settings/two-factor" element={<ProtectedRoute><TwoFactor /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

const root = document.getElementById('app');
if (!root) throw new Error('No #app element found');

createRoot(root).render(
    <StrictMode>
        <AuthProvider>
            <LanguageProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </LanguageProvider>
        </AuthProvider>
    </StrictMode>,
);
