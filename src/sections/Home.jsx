import myImage from '../assets/perf.png';
import { FiCode, FiUser, FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import bg from '../assets/bg.png';
// Make sure to import your CV file (adjust the path as needed)
import cvFile from '../assets/backendCv.pdf';

export default function Home() {
  // Function to handle the download
  const handleDownload = () => {
    try {
      // Create a temporary anchor element
      const link = document.createElement('a');
      
      // Use the imported file or a public path
      link.href = cvFile;
      
      // Suggest a filename for the download
      link.download = 'HafizMudassir_Cv.pdf'; // Change to your name
      
      // Append to the document, trigger click, then remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Optional: Track download event
      console.log('CV downloaded successfully');
    } catch (error) {
      console.error('Error downloading CV:', error);
      // You could add a toast notification here
      alert('Failed to download CV. Please try again later.');
    }
  };

  return (
    <div className="relative h-screen flex items-center bg-[#00b899] text-gray-100 overflow-hidden">
      {/* Soft Texture Overlay */}
      <div className={`absolute inset-0 bg-[url(${bg})] opacity-10 pointer-events-none`}></div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-white">Welcome to My Portfolio</h1>
          <p className="text-xl mb-8 text-teal-600">Crafting immersive digital experiences</p>

          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors text-white font-medium shadow-lg flex items-center gap-2"
          >
            <FiDownload /> Download CV
          </motion.button>
        </motion.div>

        {/* Right Section - Image with AboutMe-style treatment */}
        <div className="relative w-full flex justify-center">
          {/* Floating Particles */}
          <div className="absolute inset-0 z-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="particle absolute rounded-full"
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: -100,
                  opacity: [0, 1, 0],
                  x: Math.random() * 100 - 50
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  backgroundColor: `rgba(13, 148, 136, ${Math.random() * 0.4 + 0.2})`, // teal-ish particles
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          {/* Image Container */}
          <div className="relative aspect-square max-w-md">
            {/* Background layers */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-indigo-900/20 rounded-2xl rotate-6"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute inset-0 bg-indigo-900/20 rounded-2xl -rotate-6"
            />

            {/* Main Image */}
            <motion.img 
              src={myImage}
              alt="Profile"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 bg-indigo-900/20 rounded-2xl w-full h-full object-cover shadow-xl"
            />

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-teal-500 p-4 rounded-lg shadow-lg z-20 max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full">
                  <FiCode className="text-xl text-teal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-white">React Expert</h4>
                  <p className="text-sm text-white">5+ years experience</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-teal-500 p-4 rounded-lg shadow-lg z-20 max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-full">
                  <FiUser className="text-xl text-teal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-white">UI/UX Designer</h4>
                  <p className="text-sm text-white">User-first approach</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}