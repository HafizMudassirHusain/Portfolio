import { motion } from 'framer-motion';
import { FiAward, FiUser, FiBriefcase, FiCode } from 'react-icons/fi';
import { FaSearch, FaPaintBrush, FaLaptopCode } from 'react-icons/fa';
import images from '../assets/perf.png';

export default function AboutMe() {
  // // Color theme variables
  // const colors = {
  //   primary: 'text-teal-500',
  //   primaryBg: 'bg-teal-500',
  //   secondary: 'text-teal-400',
  //   secondaryBg: 'bg-teal-600',
  //   dark: 'text-gray-800',
  //   darkBg: 'bg-teal-800',
  //   light: 'text-white',
  //   lightBg: 'bg-teal-600',
  //   cardBg: 'bg-white',
  //   overlay: 'bg-teal-900/20',
  //   buttonBg: 'bg-teal-600',
  //   buttonHover: 'hover:bg-teal-700'
  // };

  const stats = [
    { icon: <FiBriefcase />, value: '3+', label: 'Years Experience' },
    { icon: <FiAward />, value: '12', label: 'Projects Completed' },
    { icon: <FiUser />, value: '12', label: 'Happy Clients' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-b from-teal-50 to-white"
      id="about"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500">
              About Me
            </h2>
          <p className="text-xl mb-6 text-gray-600">
  I'm a dedicated <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500">Full Stack Developer</span> passionate about building seamless, scalable, and impactful digital solutions.
</p>

<div className="space-y-4 text-gray-600">
  <p>
    My journey into web and app development began during my college years, where I developed my first interactive project. Since then, I’ve collaborated with startups and organizations to design and develop end-to-end solutions that solve real-world problems.
  </p>
  <p>
    I specialize in the <span className="font-medium">React ecosystem, Node.js, and modern JavaScript frameworks</span>, backed by solid experience in database management and backend APIs. With a strong eye for design and user experience, I bridge the gap between front-end creativity and back-end functionality.
  </p>
  <p>
    Beyond coding, I enjoy exploring new technologies, working on side projects, and learning continuously. My problem-solving mindset allows me to craft solutions that are not only technically sound but also intuitive for users.
  </p>
  <p>
    My mission is to combine <span className="font-medium">technical expertise</span> with <span className="font-medium">creative thinking</span> to build digital experiences that inspire, engage, and deliver measurable value.
  </p>
</div>


            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-4 rounded-lg text-center shadow-lg border border-teal-100"
                >
                  <div className="text-teal-500 text-2xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                  <p className="text-teal-500 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Image with Badges */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background layers */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-[#1c917cc0] rounded-2xl rotate-6"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute inset-0 bg-[#1c917cc0] rounded-2xl -rotate-6"
              />

              {/* Main Image */}
              <motion.img 
                src={images}
                alt="Profile"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 rounded-2xl bg-[#239b85a5] w-full h-full object-cover shadow-xl"
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
                    <FiCode className="text-xl text-teal-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Full-Stack Specialist</h4>
                    <p className="text-sm text-teal-100">3+ years experience</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-6 -right-6 bg-teal-600 p-4 rounded-lg shadow-lg z-20 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full">
                    <FiUser className="text-xl text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">UI/UX Focus</h4>
                    <p className="text-sm text-teal-100">User-centered design</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Approach Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500">
            My Approach
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Discovery',
                description: 'Thorough research to understand project goals and user needs',
                icon: <FaSearch className="text-white text-4xl" />,
                color: 'bg-teal-500'
              },
              {
                title: 'Design',
                description: 'Creating intuitive interfaces with attention to detail',
                icon: <FaPaintBrush className="text-white text-4xl" />,
                color: 'bg-teal-600'
              },
              {
                title: 'Development',
                description: 'Clean, efficient code with modern best practices',
                icon: <FaLaptopCode className="text-white text-4xl" />,
                color: 'bg-teal-700'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${item.color} p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-teal-100">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}