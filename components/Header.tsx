import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-[#1e40af] text-white py-4 shadow-md">
            <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                <div id="header-title" className="text-2xl font-bold">Adelso Tzep</div>
                <nav>
                    <ul className="flex gap-6">
                        <li><Link href="/" className="text-white font-medium hover:underline">Home</Link></li>
                        <li><Link href="/about" className="text-white font-medium hover:underline">About</Link></li>
                        <li><Link href="/projects" className="text-white font-medium hover:underline">Projects</Link></li>
                        <li><Link href="/contact" className="text-white font-medium hover:underline">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}