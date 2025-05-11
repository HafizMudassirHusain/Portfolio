import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble, FaInstagram, FaFacebook } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Initialize EmailJS (you should call this once in your app)
// Typically you would put this in a useEffect or in your app initialization
emailjs.init('Pv3yL9ioNcyiGiaxV'); // Replace with your EmailJS public key

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
    subject: '', // Added subject field
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'; // Validate subject
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
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_kj0ipdq', // Replace with your EmailJS service ID
        'template_ax35b4d', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject, // Include subject
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-b from-teal-50 to-white"
      id="contact"
    >
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500">
          Get In Touch
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-gray-600">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-teal-700">Contact Information</h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-full bg-teal-100 text-teal-600">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-gray-800">{method.title}</h4>
                    <a 
                      href={method.href} 
                      className="text-teal-600 hover:text-teal-800 transition"
                    >
                      {method.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-teal-700">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map(({ name, icon, url }) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-teal-100 hover:bg-teal-200 transition text-teal-600"
                    aria-label={`Follow on ${name}`}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="name" className="block mb-2 font-medium text-gray-800">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.name ? 'border-red-500' : 'border-teal-200'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm`}
                />
                {errors.name && <p className="mt-1 text-red-500">{errors.name}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block mb-2 font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.email ? 'border-red-500' : 'border-teal-200'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm`}
                />
                {errors.email && <p className="mt-1 text-red-500">{errors.email}</p>}
              </motion.div>

              {/* Added Subject Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label htmlFor="subject" className="block mb-2 font-medium text-gray-800">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.subject ? 'border-red-500' : 'border-teal-200'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm`}
                />
                {errors.subject && <p className="mt-1 text-red-500">{errors.subject}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="message" className="block mb-2 font-medium text-gray-800">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-white border ${errors.message ? 'border-red-500' : 'border-teal-200'} focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm`}
                />
                {errors.message && <p className="mt-1 text-red-500">{errors.message}</p>}
              </motion.div>

              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-100 border border-red-200 rounded-lg text-red-700"
                >
                  {errors.submit}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${isSubmitting ? 'bg-teal-700' : 'bg-teal-600 hover:bg-teal-700'} text-white shadow-lg hover:shadow-xl`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend /> Send Message
                    </>
                  )}
                </button>
              </motion.div>

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-teal-100 border border-teal-200 rounded-lg text-teal-800"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}