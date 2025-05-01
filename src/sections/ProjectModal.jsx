import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose, AiOutlineGithub, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';

export default function ProjectModal({ project, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // For demo purposes - in reality you might have multiple screenshots per project
  const projectImages = [
    project.image,
    project.image, // would be different images in real implementation
    project.image
  ];

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      // Arrow key navigation
      if (e.key === 'ArrowRight') {
        handleNext();
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, currentImageIndex]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <AnimatePresence>
      {/* Backdrop animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
        {/* Modal content */}
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ 
            type: 'spring',
            damping: 25,
            stiffness: 400,
            duration: 0.3
          }}
          className={`relative w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col ${
            isZoomed ? 'max-w-full' : ''
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            onClick={onClose}
            aria-label="Close modal"
          >
            <AiOutlineClose className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          </button>

          {/* Image viewer section */}
          <div className="relative flex-grow overflow-hidden bg-gray-100 dark:bg-gray-900">
            {/* Navigation arrows */}
            {projectImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors transform -translate-y-1/2"
                  aria-label="Previous image"
                >
                  <AiOutlineArrowLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors transform -translate-y-1/2"
                  aria-label="Next image"
                >
                  <AiOutlineArrowRight className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                </button>
              </>
            )}

            {/* Full page screenshot */}
            <div 
              className={`w-full h-full flex items-center justify-center overflow-auto cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={projectImages[currentImageIndex]}
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className={`object-contain ${isZoomed ? 'object-scale-down' : 'object-cover'} w-full h-full`}
              />
            </div>

            {/* Image counter */}
            {projectImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                {currentImageIndex + 1} / {projectImages.length}
              </div>
            )}
          </div>

          {/* Project info footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <a
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  <FiExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
                <a
                  href={project.github || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  <AiOutlineGithub className="w-4 h-4" />
                  View Code
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}