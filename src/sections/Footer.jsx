import { useEffect, useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiInstagram } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const quickLinksRef = useRef(null);
  const contactInfoRef = useRef(null);
  const socialLinksRef = useRef([]);
  const footerLinksRef = useRef([]);
  const dividerRef = useRef(null);
  const copyrightRef = useRef(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // About section
      if (aboutSectionRef.current) {
        gsap.from(aboutSectionRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Quick links
      if (quickLinksRef.current) {
        gsap.from(quickLinksRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: -30,
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out'
        });
      }

      // Contact info
      if (contactInfoRef.current) {
        gsap.from(contactInfoRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: 30,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out'
        });
      }

      // Social links stagger
      socialLinksRef.current.forEach((link, index) => {
        if (!link) return;
        
        gsap.from(link, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 0.5,
          delay: 0.3 + index * 0.1,
          ease: 'back.out(1.7)'
        });

        // Hover effect
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            y: -5,
            scale: 1.1,
            rotation: 360,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // Footer links stagger
      footerLinksRef.current.forEach((link, index) => {
        if (!link) return;
        
        gsap.from(link, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: -20,
          duration: 0.5,
          delay: 0.4 + index * 0.05,
          ease: 'power2.out'
        });

        // Hover effect
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            x: 5,
            duration: 0.2,
            ease: 'power2.out'
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            x: 0,
            duration: 0.2,
            ease: 'power2.out'
          });
        });
      });

      // Divider
      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          scaleX: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }

      // Copyright
      if (copyrightRef.current) {
        gsap.from(copyrightRef.current, {
          scrollTrigger: {
            trigger: copyrightRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out'
        });
      }

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-teal-900 dark:bg-slate-950 text-white pt-16 pb-8 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div ref={aboutSectionRef} className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-teal-300 dark:text-teal-400">About Me</h3>
            <p className="text-teal-100 dark:text-gray-300 mb-4">
              I'm a passionate developer creating beautiful, functional digital experiences with a focus on user-centered design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  ref={el => socialLinksRef.current[index] = el}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-teal-800 dark:bg-slate-800 hover:bg-teal-700 dark:hover:bg-slate-700 text-teal-200 dark:text-slate-300 hover:text-white transition-all duration-500"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div ref={quickLinksRef}>
            <h3 className="text-2xl font-bold mb-4 text-teal-300 dark:text-teal-400">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    ref={el => footerLinksRef.current[index] = el}
                    href={link.href}
                    className="text-teal-100 dark:text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={contactInfoRef}>
            <h3 className="text-2xl font-bold mb-4 text-teal-300 dark:text-teal-400">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-teal-300 dark:text-teal-400">
                  <FiMail />
                </div>
                <div>
                  <p className="text-teal-100 dark:text-gray-300">hmudassir511@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mt-1 mr-4 text-teal-300 dark:text-teal-400">
                  <FiLinkedin />
                </div>
                <div>
                  <p className="text-teal-100 dark:text-gray-300">in/hafiz-mudassir-husain</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="h-px bg-gradient-to-r from-transparent via-teal-600 dark:via-teal-700 to-transparent my-8"
        ></div>

        {/* Copyright */}
        <div
          ref={copyrightRef}
          className="flex flex-col md:flex-row justify-between items-center text-center"
        >
          <p className="text-teal-300 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Hafiz Mudassir. All rights reserved.
          </p>
          <p className="text-teal-200 dark:text-gray-400 flex items-center">
            Made with <FiHeart className="mx-1 text-rose-400" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
