import { Link } from 'react-router-dom';
import type { ComponentProps } from 'react';

export default function TextLink({ href, children, ...props }: ComponentProps<'a'> & { href: string }) {
    return <Link to={href} {...(props as object)}>{children}</Link>;
}
