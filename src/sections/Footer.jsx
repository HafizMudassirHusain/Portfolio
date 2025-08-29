import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FiGithub className="text-xl" />,
      url: "https://github.com/HafizMudassirHusain",
      name: "GitHub"
    },
    {
      icon: <FiLinkedin className="text-xl" />,
      url: "https://linkedin.com/in/hafiz-mudassir-husain",
      name: "LinkedIn"
    },
    {
      icon: <FiInstagram className="text-xl" />,
      url: "https://www.instagram.com/hafizmudassirhusain/",
      name: "Twitter"
    },
    {
      icon: <FiMail className="text-xl" />,
      url: "mailto:hmudassir511@gmail.com",
      name: "Email"
    }
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-teal-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4 text-teal-300">About Me</h3>
            <p className="text-teal-100 mb-4">
              I'm a passionate developer creating beautiful, functional digital experiences with a focus on user-centered design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-teal-800 hover:bg-teal-700 text-teal-200 hover:text-white transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-teal-300">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-teal-100 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-teal-300">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-teal-300">
                  <FiMail />
                </div>
                <div>
                  <p className="text-teal-100">hmudassir511@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-teal-300">
                  <FiLinkedin />
                </div>
                <div>
                  <p className="text-teal-100">in/hafiz-mudassir-husain</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-teal-600 to-transparent my-8"
        ></motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-center"
        >
          <p className="text-teal-300 mb-4 md:mb-0">
            &copy; {currentYear} Hafiz Mudassir. All rights reserved.
          </p>
          <p className="text-teal-200 flex items-center">
            Made with <FiHeart className="mx-1 text-rose-400" /> using React & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}