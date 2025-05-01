import { useState } from 'react';
import ProjectModal from './ProjectModal';
import img1 from '../assets/ecom.png';
import img2 from '../assets/kitchen.png';
import img3 from '../assets/tazQ.png';
import img4 from '../assets/postfoliosMy.png';
import img5 from '../assets/malickrestuarent.png';
import img6 from '../assets/advantureweb.png';

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: img1,
    description: 'Full-featured online store with payment integration',
    link: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    tags: ['Next.js', 'Tailwind CSS'],
    image: img2,
    description: 'A modern, responsive portfolio website to showcase projects and blogs.',
    link: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Task Management App',
    tags: ['React', 'Firebase'],
    image: img3,
    description: 'A task tracking app with real-time updates and user authentication.',
    link: '#',
    github: '#'
  },
  {
    id: 4,
    title: 'Portfolio 2.0',
    tags: ['React', 'Firebase'],
    image: img4,
    description: 'A second version portfolio showcasing animation and SEO practices.',
    link: '#',
    github: '#'
  },
  {
    id: 5,
    title: 'Restaurant Website',
    tags: ['React', 'Tailwind'],
    image: img5,
    description: 'A restaurant landing page with a menu, contact form, and booking system.',
    link: '#',
    github: '#'
  },
  {
    id: 6,
    title: 'Adventure Travel Site',
    tags: ['React', 'GSAP'],
    image: img6,
    description: 'A visually rich adventure site with parallax scroll effects.',
    link: '#',
    github: '#'
  },
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Get unique tags for filtering
  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section className="relative bg-neutral-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-teal-500 bg-teal-50 dark:bg-gray-800 rounded-full">
            PORTFOLIO
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            A collection of my recent work showcasing different technologies and design approaches.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeFilter === tag
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image with Gradient Overlay */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm mb-2">{project.description}</p>
                    <div className="flex gap-2">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-white text-gray-900 hover:bg-gray-100"
                      >
                        Live Demo
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-white hover:bg-gray-700"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* View More Button */}
              <button
                onClick={() => setSelectedProject(project)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md hover:bg-white dark:hover:bg-gray-700"
                aria-label="View project details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}