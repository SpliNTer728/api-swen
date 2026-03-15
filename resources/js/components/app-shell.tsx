// Ce fichier est un stub temporaire. Ce composant est le conteneur principal du layout
// de l'application (sidebar + contenu). Il n'a pas encore été migré car il dépend
// de composants Inertia (app-sidebar, nav-main, nav-user) qui seront réécrits
// dans une prochaine étape de la migration.
// NE PAS utiliser ce stub dans du nouveau code.
import type { PropsWithChildren } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
export function AppShell({ children }: PropsWithChildren) {
    return <SidebarProvider>{children}</SidebarProvider>;
}
