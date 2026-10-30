interface SkillCardProps {
    category: string;
    skills: string[];
}

export default function SkillCard({ category, skills }: SkillCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
            <h3 className="text-xl font-bold mb-3 text-gray-800">{category}</h3>
            <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <li key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
}