import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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

  useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);

  if (!project) return null;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.fullPreviewImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.fullPreviewImages.length) % project.fullPreviewImages.length);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-8 rounded-2xl overflow-hidden bg-slate-900"
          >
            <div className="relative h-[60vh] md:h-[70vh]">
              <img
                src={project.fullPreviewImages[currentImageIndex]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              
              {/* Image Navigation */}
              {project.fullPreviewImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm text-white hover:bg-white/20 dark:hover:bg-slate-700/50 transition-colors"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm text-white hover:bg-white/20 dark:hover:bg-slate-700/50 transition-colors"
                    aria-label="Next image"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.fullPreviewImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white w-6'
                            : 'bg-white/40'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors duration-200"
              >
                <FiExternalLink className="w-4 h-4" />
                Live Demo
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-medium transition-colors duration-200"
              >
                <FiGithub className="w-4 h-4" />
                View Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-teal-50/30 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {project.fullDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem → Solution → Result */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-3">Problem</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.problem}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-3">Solution</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-3">Result</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.result}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Details */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-teal-50/30 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-center"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 md:py-20 border-t border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex justify-between items-center">
            {prev ? (
              <Link
                to={`/projects/${prev.slug}`}
                className="group flex items-center gap-3 px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white transition-colors"
              >
                <FiChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Previous</div>
                  <div className="font-medium">{prev.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {next && (
              <Link
                to={`/projects/${next.slug}`}
                className="group flex items-center gap-3 px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white transition-colors"
              >
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Next</div>
                  <div className="font-medium">{next.title}</div>
                </div>
                <FiChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

