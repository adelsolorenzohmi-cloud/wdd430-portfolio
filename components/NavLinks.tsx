'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    const links = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="flex gap-6 text-sm font-medium">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`transition-colors ${isActive
                                ? 'text-indigo-400 font-semibold underline'
                                : 'text-neutral-300 hover:text-indigo-300'
                            }`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}