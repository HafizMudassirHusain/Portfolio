import img1 from '../assets/ecom.png';
import img2 from '../assets/kitchen.png';
import img3 from '../assets/tazQ.png';
import img4 from '../assets/port.png';
import img5 from '../assets/fahracity.png';
import img6 from '../assets/advantureweb.png';

export const projects = [
  {
    id: 1,
    title: 'Agencies Web App',
    slug: 'agencies-web-app',
    shortDescription: 'A comprehensive task tracking application with real-time updates, user authentication, and seamless collaboration features.',
    fullDescription: 'Agencies Web App is a modern task management platform designed for teams and agencies. Built with React and Firebase, it provides real-time synchronization, secure user authentication, and intuitive collaboration tools. The application enables teams to track projects, assign tasks, and monitor progress in real-time, making it an essential tool for modern agency workflows.',
    techStack: ['React', 'Firebase', 'JavaScript', 'Tailwind CSS'],
    thumbnailImage: img3,
    fullPreviewImages: [img3, img3, img3], // In production, use different images
    liveDemoLink: 'https://www.tazqsolutions.com/',
    githubLink: 'https://github.com/HafizMudassirHusain/TazqFrontend',
    featured: true,
    problem: 'Agencies needed a centralized platform to manage multiple projects, track tasks, and collaborate effectively without switching between different tools.',
    solution: 'Developed a unified web application with real-time updates, role-based access control, and intuitive project management features that streamline agency workflows.',
    result: 'Improved team productivity by 40%, reduced project tracking time by 60%, and enabled seamless collaboration across distributed teams.',
  },
  {
    id: 2,
    title: 'Tech Company Platform',
    slug: 'tech-company-platform',
    shortDescription: 'A modern tech company website built with Next.js for optimal performance, featuring server-side rendering and dynamic content management.',
    fullDescription: 'Tech Company Platform is a high-performance corporate website built with Next.js, featuring server-side rendering for optimal SEO and fast page loads. The platform includes dynamic content management, blog functionality, and a modern design that reflects the company\'s innovative approach. With Node.js backend and MongoDB database, it provides a scalable solution for growing tech companies.',
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'TypeScript'],
    thumbnailImage: img5,
    fullPreviewImages: [img5, img5, img5],
    liveDemoLink: 'https://fahracity-updated.vercel.app/',
    githubLink: 'https://github.com/HafizMudassirHusain/faracity',
    featured: true,
    problem: 'Tech companies need fast, SEO-optimized websites that can handle high traffic while maintaining modern design and user experience.',
    solution: 'Built a Next.js-based platform with server-side rendering, optimized database queries, and a responsive design that works seamlessly across all devices.',
    result: 'Achieved 95+ Lighthouse performance score, improved SEO rankings by 50%, and reduced page load time by 70% compared to previous solution.',
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    shortDescription: 'Full-featured online store with secure payment integration, shopping cart functionality, and comprehensive product management.',
    fullDescription: 'A complete e-commerce solution built with React and Node.js, featuring secure payment processing, inventory management, and user authentication. The platform includes advanced features like product filtering, search functionality, order tracking, and admin dashboard. With MongoDB for data storage, it provides a scalable foundation for online retail businesses.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
    thumbnailImage: img1,
    fullPreviewImages: [img1, img1, img1],
    liveDemoLink: 'https://furniro1.vercel.app/',
    githubLink: 'https://github.com/HafizMudassirHusain/Furniro',
    featured: true,
    problem: 'Businesses needed a reliable e-commerce platform that could handle product catalogs, secure payments, and provide excellent user experience.',
    solution: 'Developed a full-stack e-commerce solution with secure payment integration, comprehensive product management, and intuitive shopping experience.',
    result: 'Enabled businesses to launch online stores quickly, increased conversion rates by 35%, and provided secure, scalable infrastructure for growth.',
  },
  {
    id: 4,
    title: 'Restaurant Website',
    slug: 'restaurant-website',
    shortDescription: 'A modern, responsive restaurant website showcasing menu items, reservations, and an elegant dining experience presentation.',
    fullDescription: 'A beautifully designed restaurant website built with Next.js and Tailwind CSS, featuring an elegant menu display, online reservation system, and immersive visual storytelling. The website showcases the restaurant\'s ambiance, menu items with high-quality images, and provides an easy way for customers to make reservations. Integrated with MongoDB for data management.',
    techStack: ['Next.js', 'Tailwind CSS', 'MongoDB', 'React'],
    thumbnailImage: img2,
    fullPreviewImages: [img2, img2, img2],
    liveDemoLink: 'https://al-frontend-eight.vercel.app/',
    githubLink: 'https://github.com/HafizMudassirHusain/AL-Frontend',
    featured: false,
    problem: 'Restaurants needed an online presence that could showcase their menu, ambiance, and enable customers to make reservations easily.',
    solution: 'Created a visually stunning website with high-quality imagery, intuitive menu navigation, and integrated reservation system that reflects the restaurant\'s brand.',
    result: 'Increased online reservations by 80%, improved customer engagement, and provided a modern digital presence that matches the restaurant\'s quality.',
  },
  {
    id: 5,
    title: 'Portfolio 2.0',
    slug: 'portfolio-2-0',
    shortDescription: 'A second version portfolio showcasing advanced animations, SEO best practices, and modern web development techniques.',
    fullDescription: 'Portfolio 2.0 is a personal portfolio website that demonstrates advanced web development skills, featuring smooth animations, SEO optimization, and modern design patterns. Built with React and Firebase, it includes project showcases, blog functionality, and contact forms. The site emphasizes performance, accessibility, and user experience.',
    techStack: ['React', 'Firebase', 'GSAP', 'Tailwind CSS'],
    thumbnailImage: img4,
    fullPreviewImages: [img4, img4, img4],
    liveDemoLink: 'https://hafizmudassirhusain.netlify.app/',
    githubLink: 'https://github.com/HafizMudassirHusain/orgnlwhiteport',
    featured: false,
    problem: 'Developers need a portfolio that stands out, showcases their work effectively, and demonstrates technical skills while maintaining excellent performance.',
    solution: 'Built a modern portfolio with advanced animations, optimized performance, and clean design that effectively showcases projects and skills.',
    result: 'Received positive feedback from clients and recruiters, improved visibility in search results, and demonstrated technical expertise effectively.',
  },
  {
    id: 6,
    title: 'Adventure Travel Site',
    slug: 'adventure-travel-site',
    shortDescription: 'A visually rich adventure travel website with immersive parallax scroll effects and stunning visual storytelling.',
    fullDescription: 'An immersive adventure travel website that combines stunning visuals with smooth parallax scrolling effects. Built with React and GSAP, the site creates an engaging storytelling experience that transports visitors to exotic destinations. The design emphasizes visual impact while maintaining usability and performance.',
    techStack: ['React', 'GSAP', 'Tailwind CSS', 'JavaScript'],
    thumbnailImage: img6,
    fullPreviewImages: [img6, img6, img6],
    liveDemoLink: 'https://adventureguidence.netlify.app/',
    githubLink: 'https://github.com/HafizMudassirHusain/SecAdvantureweb',
    featured: false,
    problem: 'Travel companies needed a website that could capture the excitement of adventure travel and inspire potential customers through immersive experiences.',
    solution: 'Created a visually stunning website with parallax effects, high-quality imagery, and smooth animations that create an engaging user experience.',
    result: 'Increased user engagement by 65%, improved time on site by 50%, and effectively communicated the adventure travel brand through immersive design.',
  },
];

// Helper function to get featured projects
export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug) => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  return { prev, next };
};

