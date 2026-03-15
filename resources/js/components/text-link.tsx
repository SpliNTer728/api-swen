// Ce fichier est un stub temporaire. Le composant original utilisait le composant Link
// d'Inertia.js qui n'est plus disponible dans cette version de l'application.
// Il sera réécrit une fois que les pages qui l'utilisent seront migrées vers l'API REST.
// NE PAS utiliser ce stub dans du nouveau code.
import { Link } from 'react-router-dom';
import type { ComponentProps } from 'react';
export default function TextLink({ href, children, ...props }: ComponentProps<'a'> & { href: string }) {
    return <Link to={href} {...(props as object)}>{children}</Link>;
}
