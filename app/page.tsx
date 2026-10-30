import ProjectList from '@/components/ProjectList';

const projects = [
  {
    title: 'Full-Stack Store API',
    description: 'A robust Node.js, Express, and MongoDB Atlas backend with Google OAuth authentication, session management, input validation, and Swagger documentation hosted on Render.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Swagger'],
    link: 'https://github.com/adelsolorenzohmi-cloud'
  },
  {
    title: 'Global Scholar Dashboard',
    description: 'A dynamic web application built for exploring country data utilizing the REST Countries API, custom local JSON filters, CSS Grid, and responsive design.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
    link: 'https://github.com/adelsolorenzohmi-cloud'
  }
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to My Portfolio</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          I am a software development student and full-stack developer building robust web applications with modern technologies like Next.js, React, and Node.js.
        </p>
      </section>
      <ProjectList projects={projects} />
    </div>
  );
}