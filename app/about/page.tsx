import SkillCard from '@/components/SkillCard';

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-white">About Me</h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-4">
                    I am a software development student at Brigham Young University-Idaho with a strong background in technical support, quality assurance auditing, and full-stack web engineering. My passion lies in building scalable web architectures and clean, responsive interfaces.
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-6 text-white">Technical Expertise</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <SkillCard
                        category="Frontend Development"
                        skills={['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML5/CSS3']}
                    />
                    <SkillCard
                        category="Backend & Databases"
                        skills={['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB Atlas', 'REST APIs']}
                    />
                </div>
            </section>
        </div>
    );
}