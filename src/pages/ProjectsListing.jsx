import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { projects } from '../data/projectsData';

export default function ProjectsListing() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Modern Minimal Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="text-gray-900 dark:text-white">My </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300">
                  Projects
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Selected works showcasing modern web development and design principles
              </p>
            </div>
            
            {/* Project Count Indicator */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-slate-800 rounded-full">
                <span className="text-teal-600 dark:text-teal-400 font-semibold">
                  {projects.length} Projects
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Full-stack, Frontend & UI/UX
                </span>
              </div>
            </div>
          </motion.div>

          {/* Clean Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Link to={`/projects/${project.slug}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                    {/* Image with subtle overlay */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.thumbnailImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Live Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-medium rounded-full shadow-lg">
                          Live
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 text-xs font-medium bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          <span>View Details</span>
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        
                        <div className="flex gap-2">
                          <a
                            href={project.liveDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200"
                            title="Live Demo"
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </a>
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200"
                            title="Source Code"
                          >
                            <FiGithub className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-teal-100 dark:border-slate-700">
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Interested in working together?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Have a project in mind? Let's build something amazing
                </p>
              </div>
              <a
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}