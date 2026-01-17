import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowUpRight, FiGithub, FiExternalLink, FiChevronRight, FiTrendingUp } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { projects } from '../data/projectsData';

export default function ProjectsListing() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filter, setFilter] = useState('all');
  
  const categories = ['all', 'full-stack', 'frontend', 'design', 'mobile'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category?.includes(filter));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Handle navigation to home page sections
  const handleSectionNavigate = (sectionId) => {
    // Navigate to home page with hash
    navigate(`/#${sectionId}`);
    
    // Scroll to section after navigation
    // Use a slightly longer timeout to ensure page has loaded
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Account for navbar height
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
      </div>

      <section className="relative pt-40 pb-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="mb-24"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-teal-500 to-cyan-500"></div>
              <span className="text-sm tracking-widest text-teal-400 uppercase">PORTFOLIO</span>
            </div>
            
            <div className="max-w-4xl">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-300">
                  CREATIVE
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400">
                  ARCHIVE
                </span>
              </h1>
              
              <div className="flex items-center justify-between mt-12">
                <p className="text-xl text-gray-400 max-w-xl">
                  A curated collection of premium digital experiences 
                  where innovation meets exceptional craftsmanship.
                </p>
                
                <div className="hidden lg:flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
                      {projects.length}
                    </div>
                    <div className="text-sm text-gray-500">Projects</div>
                  </div>
                  <div className="w-px h-12 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700"></div>
                  <FiTrendingUp className="w-8 h-8 text-cyan-400/50" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Card with Premium Effects */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10 hover:border-teal-500/30 transition-all duration-500">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Project Number */}
                  <div className="absolute top-8 left-8 z-10">
                    <div className="text-6xl font-black text-white/10">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <Link to={`/projects/${project.slug}`}>
                    <div className="relative p-8">
                      {/* Category & Year */}
                      <div className="flex items-center justify-between mb-12">
                        <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-teal-400 border border-white/10">
                          {project.category || 'Premium'}
                        </span>
                        <span className="text-sm text-gray-500">2023</span>
                      </div>
                      
                      {/* Title & Description */}
                      <div className="mb-8">
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 transition-all duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {project.shortDescription}
                        </p>
                      </div>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 text-sm bg-white/5 backdrop-blur-sm rounded-lg text-gray-300 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Preview Image (Visible on Hover) */}
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
                          >
                            <img
                              src={project.thumbnailImage}
                              alt={project.title}
                              className="w-full h-full object-cover opacity-20"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Link>
                  
                  {/* Action Bar */}
                  <div className="px-8 pb-8">
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="group/link inline-flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          View Case Study
                          <FiChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                      
                      <div className="flex items-center gap-3">
                        <a
                          href={project.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-teal-500/30 text-white transition-all duration-300 group/demo"
                          title="Live Demo"
                        >
                          <FiExternalLink className="w-4 h-4 group-hover/demo:scale-110 transition-transform" />
                        </a>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 text-white transition-all duration-300 group/code"
                          title="Source Code"
                        >
                          <FiGithub className="w-4 h-4 group-hover/code:scale-110 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl ring-2 ring-inset ring-transparent group-hover:ring-teal-500/20 transition-all duration-500 pointer-events-none"></div>
                </div>
                
                {/* External Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-teal-500/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
              </motion.div>
            ))}
          </div>

          {/* Premium CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-32"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 p-12">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(94,234,212,0.3),transparent_50%)]"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                    Ready to Build
                  </span>{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400">
                    Something Amazing?
                  </span>
                </h2>
                
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                  Let's collaborate on your next premium digital experience
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button
                    onClick={() => handleSectionNavigate('contact')}
                    className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <span>Start a Project</span>
                      <FiArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <button
                    onClick={() => handleSectionNavigate('about')}
                    className="px-8 py-4 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 rounded-xl font-medium transition-all duration-300"
                  >
                    Learn About My Process
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}