import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiLayers, FiCpu, FiAward, FiUsers, FiClock, FiCheckCircle } from 'react-icons/fi';

// Updated Color and Gradient Constants to match Hero theme (#00b899 teal)
const COLORS = {
  primary: {
    text: 'text-teal-400',
    bg: 'bg-teal-500',
    lightBg: 'bg-teal-100',
    border: 'border-teal-200'
  },
  secondary: {
    text: 'text-teal-300',
    bg: 'bg-teal-600',
    lightBg: 'bg-teal-100'
  },
  accent: {
    text: 'text-amber-400',
    bg: 'bg-amber-500',
    lightBg: 'bg-amber-100'
  },
  dark: {
    text: 'text-gray-800',
    bg: 'bg-gray-800',
    lightBg: 'bg-gray-50',
    border: 'border-gray-200'
  },
  light: {
    text: 'text-gray-600',
    bg: 'bg-white',
    border: 'border-gray-100'
  }
};

const GRADIENTS = {
  primary: 'bg-gradient-to-r from-teal-500 to-teal-600',
  secondary: 'bg-gradient-to-r from-teal-400 to-teal-500',
  card: 'bg-gradient-to-br from-white to-gray-50'
};

// Skill Categories (unchanged)
const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: <FiLayers className="text-lg" />,
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'XML/HTML/CSS', level: 100 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Next.js', level: 80 }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: <FiDatabase className="text-lg" />,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'Django', level: 70 },
      { name: 'GraphQL', level: 75 }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: <FiCpu className="text-lg" />,
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 70 },
      { name: 'CI/CD', level: 85 },
      { name: 'Linux', level: 75 }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    icon: <FiCode className="text-lg" />,
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Figma', level: 70 },
      { name: 'Three.js', level: 65 },
      { name: 'GSAP', level: 80 }
    ]
  }
];

// Experience Timeline (unchanged)
const experienceItems = [
  {
    year: '2025 - Present',
    role: 'Senior Web Developer',
    company: 'TazQ Solution',
    description: 'Leading the frontend team building responsive web applications with React and Next.js'
  },
  {
    year: '2025 - Present',
    role: 'Full_Stack Developer',
    company: 'HS_Solutions',
    description: 'Developed and maintained multiple client projects using modern JavaScript frameworks'
  },
  {
    year: '2023 - Present',
    role: 'CLient Dealing',
    company: 'Blitz Wings',
    description: 'Managed client relationships and supported product development, implementing best practices in [specific area, e.g., customer onboarding, feedback analysis].'   }
];

// Stats Section (updated colors)
const stats = [
  { icon: <FiAward />, value: '12+', label: 'Projects', color: COLORS.accent.bg },
  { icon: <FiClock />, value: '1+', label: 'Years Exp', color: COLORS.primary.bg },
  { icon: <FiUsers />, value: '12', label: 'Clients', color: COLORS.secondary.bg },
  { icon: <FiCheckCircle />, value: '100%', label: 'Satisfaction', color: COLORS.accent.bg }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-gradient-to-b from-teal-50 to-white"
      id="skills"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500"
          >
            My Skills & Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg max-w-2xl mx-auto text-gray-600"
          >
            Technologies I've mastered through professional experience and personal projects
          </motion.p>
        </div>

        {/* Skill Categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === category.id
                  ? `${GRADIENTS.primary} text-white shadow-lg`
                  : `${COLORS.light.bg} text-gray-700 border ${COLORS.dark.border} hover:bg-teal-50 shadow-sm`
              }`}
            >
              {category.icon}
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {skillCategories.find(cat => cat.id === activeCategory).skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`p-5 rounded-xl ${GRADIENTS.card} border ${COLORS.dark.border} shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${COLORS.dark.text}`}>
                  {skill.name}
                </span>
                <span className={`font-mono ${COLORS.primary.text}`}>
                  {skill.level}%
                </span>
              </div>
              <div className={`h-2 rounded-full ${COLORS.primary.lightBg} overflow-hidden`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  className={`h-full ${GRADIENTS.primary} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <div className="mt-20">
          <motion.h3 
            className="text-2xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Professional Journey
          </motion.h3>

          <motion.div 
            className="relative max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Vertical Line */}
            <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-600 transform -translate-x-1/2" />

            {experienceItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.15 }}
                className={`relative mb-10 ${index % 2 === 0 ? 'pr-10 text-right' : 'pl-10 text-left'}`}
              >
                {/* Dot */}
                <div className={`absolute top-5 rounded-full w-4 h-4 ${GRADIENTS.primary} ${index % 2 === 0 ? '-right-2' : '-left-2'} shadow-md`} />
                
                {/* Timeline Card */}
                <div className={`p-6 rounded-lg ${GRADIENTS.card} border ${COLORS.dark.border} shadow-sm hover:shadow-md transition-all`}>
                  <p className={`text-sm ${COLORS.primary.text} mb-1`}>{item.year}</p>
                  <h4 className={`font-bold text-lg ${COLORS.dark.text}`}>{item.role}</h4>
                  <p className={`text-sm ${COLORS.secondary.text} mb-2`}>{item.company}</p>
                  <p className={`text-sm ${COLORS.light.text}`}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section (optional) */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className={`p-6 rounded-xl ${GRADIENTS.card} border ${COLORS.dark.border} shadow-sm text-center`}
            >
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3`}>
                {stat.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h4>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}