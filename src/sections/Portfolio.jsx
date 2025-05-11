import { useState } from 'react';
import ProjectModal from './ProjectModal';
import img1 from '../assets/ecom.png';
import img2 from '../assets/kitchen.png';
import img3 from '../assets/tazQ.png';
import img4 from '../assets/port.png';
import img5 from '../assets/malickrestuarent.png';
import img6 from '../assets/advantureweb.png';
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: img1,
    description: 'Full-featured online store with payment integration',
    link: 'https://furniro1.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/Furniro'
  },
  {
    id: 2,
    title: 'Restuarent Website',
    tags: ['Next.js', 'Tailwind CSS', 'MongoDB'],
    image: img2,
    description: 'A modern, responsive portfolio website to showcase projects and blogs.',
    link: 'https://al-frontend-eight.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/AL-Frontend'
  },
  {
    id: 3,
    title: 'Agencies Web App',
    tags: ['React', 'Firebase'],
    image: img3,
    description: 'A task tracking app with real-time updates and user authentication.',
    link: 'https://tazq-frontend.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/TazqFrontend'
  },
  {
    id: 4,
    title: 'Portfolio 2.0',
    tags: ['React', 'Firebase'],
    image: img4,
    description: 'A second version portfolio showcasing animation and SEO practices.',
    link: 'https://tazq-frontend.vercel.app/',
    github: 'https://github.com/HafizMudassirHusain/TazqFrontend'
  },
  {
    id: 5,
    title: 'Restaurant Website',
    tags: ['React', 'Tailwind'],
    image: img5,
    description: 'A restaurant landing page with a menu, contact form, and booking system.',
    link: 'https://dumi-maliksresturent.netlify.app/',
    github: 'https://github.com/HafizMudassirHusain/JS-Assignment/tree/master/MaliksFoodsResturent'
  },
  {
    id: 6,
    title: 'Adventure Travel Site',
    tags: ['React', 'GSAP'],
    image: img6,
    description: 'A visually rich adventure site with parallax scroll effects.',
    link: 'https://adventureguidence.netlify.app/',
    github: 'https://github.com/HafizMudassirHusain/SecAdvantureweb'
  },
];


export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const allTags = ['All', ...new Set(projects.flatMap(project => project.tags))];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section className="relative bg-gradient-to-b from-teal-50 to-white dark:bg-gray-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 mb-3 md:mb-4 text-xs font-semibold text-teal-600 bg-teal-100 dark:bg-gray-800 rounded-full">
            PORTFOLIO
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300 px-4">
            A collection of my recent work showcasing different technologies and design approaches.
          </p>
        </div>

        {/* Filter Buttons - Improved for mobile */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 ${
                activeFilter === tag
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md md:shadow-lg shadow-cyan-500/20'
                  : 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid - Improved mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg md:rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2"
            >
              {/* Image with always-visible overlay on mobile */}
              <div className="relative h-48 sm:h-52 md:h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                  <div className="translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs md:text-sm mb-2">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-white text-gray-900 hover:bg-gray-100"
                      >
                        Live Demo
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-800 text-white hover:bg-gray-700"
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* View More Button - Always visible on mobile */}
              <button
                onClick={() => setSelectedProject(project)}
                className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm md:shadow-md hover:bg-white dark:hover:bg-gray-700"
                aria-label="View project details"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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