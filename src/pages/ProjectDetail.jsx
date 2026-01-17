import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiClock, FiUsers, FiTarget, FiCheckCircle } from 'react-icons/fi';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import { getProjectBySlug, getAdjacentProjects } from '../data/projectsData';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);
  const heroRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
    window.scrollTo(0, 0);
  }, [project, navigate]);

  if (!project) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.fullPreviewImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.fullPreviewImages.length) % project.fullPreviewImages.length);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <Navbar />
      
      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            onClick={closeFullscreen}
          >
            <div className="relative h-full flex items-center justify-center p-4">
              <button
                onClick={closeFullscreen}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors z-50"
              >
                <span className="text-white text-xl">×</span>
              </button>
              
              <div className="relative max-w-7xl max-h-[90vh]">
                <img
                  src={project.fullPreviewImages[currentImageIndex]}
                  alt={project.title}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
                
                {/* Navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
                
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {project.fullPreviewImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 sm:px-6">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 via-transparent to-transparent" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Back Button - Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-teal-500/30 transition-colors">
                <FiArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-sm">Back to Portfolio</span>
            </Link>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Left Column - Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Category & Year */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-sm text-teal-400 border border-white/10">
                    {project.category || 'Premium Project'}
                  </span>
                  <span className="text-sm text-gray-500">2023</span>
                </div>
                
                {/* Title */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                    {project.title}
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mb-12">
                  {project.shortDescription}
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                      <FiClock className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{project.duration || '3 Months'}</div>
                      <div className="text-sm text-gray-500">Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <FiUsers className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{project.teamSize || 'Solo'}</div>
                      <div className="text-sm text-gray-500">Team</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <FiCheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm text-gray-500">Success</div>
                    </div>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium rounded-xl overflow-hidden"
                  >
                    <div className="relative z-10 flex items-center gap-3">
                      <FiExternalLink className="w-5 h-5" />
                      <span>View Live Demo</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-white/20 text-white hover:border-teal-500/30 hover:bg-teal-500/10 rounded-xl font-medium transition-all duration-300 flex items-center gap-3"
                  >
                    <FiGithub className="w-5 h-5" />
                    <span>Source Code</span>
                  </a>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                ref={heroRef}
                className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-teal-500/30 transition-all duration-500 cursor-pointer group"
                onClick={openFullscreen}
              >
                <div className="aspect-video relative">
                  <img
                    src={project.fullPreviewImages[currentImageIndex]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-sm">Click to view fullscreen</span>
                    </div>
                  </div>
                </div>
                
                {/* Navigation */}
                {project.fullPreviewImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.fullPreviewImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-6'
                              : 'bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Tech Stack Preview */}
              <div className="mt-8">
                <h3 className="text-sm text-gray-500 mb-4">TECH STACK</h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-sm bg-white/5 backdrop-blur-sm rounded-lg text-gray-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="space-y-20 px-4 sm:px-6">
        {/* Problem -> Solution -> Result */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-6xl"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 flex items-center justify-center mb-4">
                  <FiTarget className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Challenge</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {project.problem}
              </p>
            </div>
            
            <div className="group">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-600/10 border border-teal-500/20 flex items-center justify-center mb-4">
                  <FiCheckCircle className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Solution</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {project.solution}
              </p>
            </div>
            
            <div className="group">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <FiUsers className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Impact</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {project.result}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Full Description */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="container mx-auto max-w-4xl"
        >
          <div className="relative">
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500 via-cyan-500 to-transparent"></div>
            <h2 className="text-4xl font-bold text-white mb-8">Project Deep Dive</h2>
            <p className="text-lg text-gray-400 leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>
        </motion.section>

        {/* Tech Stack Detail */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="container mx-auto max-w-6xl"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-4xl font-bold text-white mb-8">Technology Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {project.techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:border-teal-500/30 transition-colors"
                >
                  <span className="text-sm font-medium text-white">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Project Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
            {prev ? (
              <Link
                to={`/projects/${prev.slug}`}
                className="group flex-1 w-full sm:w-auto"
              >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-teal-500/30 hover:bg-white/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiChevronLeft className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-gray-500 mb-1">Previous Project</div>
                    <div className="text-white font-medium truncate">{prev.title}</div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <span className="text-sm text-gray-400">More Projects</span>
            </div>

            {next ? (
              <Link
                to={`/projects/${next.slug}`}
                className="group flex-1 w-full sm:w-auto"
              >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 hover:bg-white/5 transition-all duration-300">
                  <div className="flex-1 text-right">
                    <div className="text-xs text-gray-500 mb-1">Next Project</div>
                    <div className="text-white font-medium truncate">{next.title}</div>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FiChevronRight className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}