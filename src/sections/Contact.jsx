import { useState, useEffect, useRef } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

emailjs.init('Pv3yL9ioNcyiGiaxV');

const socialLinks = [
  { name: 'GitHub', icon: <FaGithub className="w-6 h-6" />, url: 'https://github.com/HafizMudassirHusain' },
  { name: 'LinkedIn', icon: <FaLinkedin className="w-6 h-6" />, url: 'https://linkedin.com/in/hafiz-mudassir-husain' },
  { name: 'Instagram', icon: <FaInstagram className="w-6 h-6" />, url: 'https://www.instagram.com/hafizmudassirhusain/' },
  { name: 'Facebook', icon: <FaFacebook className="w-6 h-6" />, url: 'https://www.facebook.com/hafizmudassir.hussain.5/' }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const contactInfoHeadingRef = useRef(null);
  const contactMethodsRef = useRef([]);
  const socialLinksRef = useRef([]);
  const formFieldsRef = useRef([]);
  const submitButtonRef = useRef(null);
  const shineRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await emailjs.send(
        'service_kj0ipdq',
        'template_ax35b4d',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      );

      if (response.status === 200) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setErrors({ submit: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const contactMethods = [
    {
      icon: <FiMail className="text-2xl" />,
      title: 'Email',
      value: 'hmudassir511@gmail.com',
      href: 'mailto:hmudassir511@gmail.com'
    },
    {
      icon: <FiPhone className="text-2xl" />,
      title: 'Phone',
      value: '+92 3442241275',
      href: 'tel:+923442241275'
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: 'Location',
      value: 'Karachi Pakistan',
      href: 'https://maps.google.com'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animations
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(subheadingRef.current, {
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out'
      });

      // Contact info heading
      if (contactInfoHeadingRef.current) {
        gsap.from(contactInfoHeadingRef.current, {
          scrollTrigger: {
            trigger: contactInfoHeadingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Contact methods stagger
      contactMethodsRef.current.forEach((method, index) => {
        if (!method) return;
        
        gsap.from(method, {
          scrollTrigger: {
            trigger: method,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: -50,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power3.out'
        });

        // Hover effect
        method.addEventListener('mouseenter', () => {
          gsap.to(method, {
            x: 10,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        method.addEventListener('mouseleave', () => {
          gsap.to(method, {
            x: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // Social links stagger
      socialLinksRef.current.forEach((link, index) => {
        if (!link) return;
        
        gsap.from(link, {
          scrollTrigger: {
            trigger: link,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'back.out(1.7)'
        });

        // Hover effect
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            y: -5,
            scale: 1.1,
            rotation: 360,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });

      // Form fields stagger
      formFieldsRef.current.forEach((field, index) => {
        if (!field) return;
        
        gsap.from(field, {
          scrollTrigger: {
            trigger: field,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out'
        });

        // Focus animation
        const input = field.querySelector('input, textarea');
        if (input) {
          input.addEventListener('focus', () => {
            gsap.to(field, {
              scale: 1.02,
              duration: 0.2,
              ease: 'power2.out'
            });
          });

          input.addEventListener('blur', () => {
            gsap.to(field, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out'
            });
          });
        }
      });

      // Submit button shine effect
      if (submitButtonRef.current && shineRef.current) {
        const shineTimeline = gsap.timeline({ paused: true });
        shineTimeline.to(shineRef.current, {
          x: '100%',
          duration: 0.6,
          ease: 'power2.inOut'
        });

        submitButtonRef.current.addEventListener('mouseenter', () => {
          gsap.to(submitButtonRef.current, {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: 'power2.out'
          });
          shineTimeline.restart();
        });

        submitButtonRef.current.addEventListener('mouseleave', () => {
          gsap.to(submitButtonRef.current, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-500"
      id="contact"
    >
      <div className="container mx-auto px-6 py-12">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300"
        >
          Get In Touch
        </h2>
        <p
          ref={subheadingRef}
          className="text-xl text-center mb-12 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
        >
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3
              ref={contactInfoHeadingRef}
              className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300"
            >
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  ref={el => contactMethodsRef.current[index] = el}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800 dark:text-gray-200">{method.title}</h4>
                    <a 
                      href={method.href} 
                      className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition"
                    >
                      {method.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map(({ name, icon, url }, index) => (
                  <a
                    key={name}
                    ref={el => socialLinksRef.current[index] = el}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-teal-100 dark:bg-teal-900 hover:bg-teal-200 dark:hover:bg-teal-800 transition text-teal-600 dark:text-teal-400"
                    aria-label={`Follow on ${name}`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div ref={el => formFieldsRef.current[0] = el}>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-teal-200 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-gray-900 dark:text-slate-100 transition-all duration-500`}
                />
                {errors.name && <p className="mt-1 text-red-500">{errors.name}</p>}
              </div>

              <div ref={el => formFieldsRef.current[1] = el}>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-teal-200 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-gray-900 dark:text-slate-100 transition-all duration-500`}
                />
                {errors.email && <p className="mt-1 text-red-500">{errors.email}</p>}
              </div>

              <div ref={el => formFieldsRef.current[2] = el}>
                <label htmlFor="subject" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border ${errors.subject ? 'border-red-500' : 'border-teal-200 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-gray-900 dark:text-slate-100 transition-all duration-500`}
                />
                {errors.subject && <p className="mt-1 text-red-500">{errors.subject}</p>}
              </div>

              <div ref={el => formFieldsRef.current[3] = el}>
                <label htmlFor="message" className="block mb-2 font-medium text-gray-800 dark:text-gray-200">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border ${errors.message ? 'border-red-500' : 'border-teal-200 dark:border-slate-700'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm text-gray-900 dark:text-slate-100 transition-all duration-500`}
                />
                {errors.message && <p className="mt-1 text-red-500">{errors.message}</p>}
              </div>

              {errors.submit && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
                  {errors.submit}
                </div>
              )}

              <div>
                <button
                  ref={submitButtonRef}
                  type="submit"
                  disabled={isSubmitting}
                  className="relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition overflow-hidden bg-teal-600 dark:bg-teal-700 hover:bg-teal-700 dark:hover:bg-teal-600 text-white shadow-lg hover:shadow-xl disabled:bg-teal-700 dark:disabled:bg-teal-800"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? 'Sending...' : <><FiSend /> Send Message</>}
                  </span>
                  <span
                    ref={shineRef}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                    style={{ transform: 'skewX(-20deg)' }}
                  />
                </button>
              </div>

              {submitSuccess && (
                <div className="p-4 bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg text-teal-800 dark:text-teal-300">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
