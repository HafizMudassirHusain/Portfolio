import { useState, useEffect, useRef } from "react";
import {
  FiCode,
  FiDatabase,
  FiLayers,
  FiCpu,
  FiAward,
  FiUsers,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =======================
   DATA
======================= */

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: <FiLayers />,
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "HTML / CSS / Tailwind", level: 100 },
      { name: "React Native", level: 90 },
      { name: "Next.js", level: 80 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: <FiDatabase />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
      { name: "Java", level: 70 },
      { name: "Django", level: 70 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    icon: <FiCpu />,
    skills: [
      { name: "Docker", level: 80 },
      { name: "AWS", level: 70 },
      { name: "CI/CD", level: 85 },
      { name: "Linux", level: 75 },
    ],
  },
  {
    id: "other",
    title: "Other",
    icon: <FiCode />,
    skills: [
      { name: "Git", level: 90 },
      { name: "Figma", level: 70 },
      { name: "Three.js", level: 65 },
      { name: "GSAP", level: 80 },
    ],
  },
];

const experienceItems = [
  {
    year: "2025 Feb - Present",
    role: "Senior Web Developer",
    company: "TazQ Solution",
    description:
      "Leading the frontend team building responsive web applications with Modern frameworks",
  },
  {
    year: "2025 June - Present",
    role: "Frontend Engineer",
    company: "Intelik Immutable Intelligence",
    description:
      "Developed and maintained multiple client projects using modern JavaScript frameworks",
  },
  {
    year: "Feb 2023 - July 2025",
    role: "Client Dealing",
    company: "Blitz Wings",
    description:
      "Managed client relationships and supported product development, implementing best practices",
  },
];

const stats = [
  { icon: <FiAward />, value: 12, label: "Projects", suffix: "+" },
  { icon: <FiClock />, value: 3, label: "Years Exp", suffix: "+" },
  { icon: <FiUsers />, value: 12, label: "Clients", suffix: "" },
  { icon: <FiCheckCircle />, value: 100, label: "Satisfaction", suffix: "%" },
];

/* =======================
   COMPONENT
======================= */

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend");

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subheaderRef = useRef(null);
  const categoryButtonsRef = useRef([]);
  const skillCardsRef = useRef([]);
  const progressBarsRef = useRef([]);
  const timelineHeadingRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const statsRef = useRef([]);

  /* =======================
     INITIAL ANIMATIONS
  ======================= */

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(subheaderRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subheaderRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Category buttons
      gsap.from(categoryButtonsRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: categoryButtonsRef.current[0],
          start: "top 85%",
          once: true,
        },
        onComplete: () => {
          gsap.set(categoryButtonsRef.current, {
            opacity: 1,
            scale: 1,
            clearProps: "all",
          });
        },
      });

      // Timeline heading
      if (timelineHeadingRef.current) {
        gsap.from(timelineHeadingRef.current, {
          scrollTrigger: {
            trigger: timelineHeadingRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Timeline items
      timelineItemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          scale: 0.95,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
        });

        // Hover effect
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Stats cards with counting animation
      statsRef.current.forEach((statCard, index) => {
        if (!statCard) return;

        const valueElement = statCard.querySelector("h4");
        if (!valueElement) return;

        const stat = stats[index];
        const countObj = { value: 0 };

        gsap.from(statCard, {
          scrollTrigger: {
            trigger: statCard,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 30,
          scale: 0.9,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Count up animation
            gsap.to(countObj, {
              value: stat.value,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                const currentValue = Math.round(countObj.value);
                valueElement.textContent = `${currentValue}${stat.suffix}`;
              },
            });
          },
        });

        // Hover effect
        statCard.addEventListener("mouseenter", () => {
          gsap.to(statCard, {
            y: -8,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        statCard.addEventListener("mouseleave", () => {
          gsap.to(statCard, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Category button hover effects
      categoryButtonsRef.current.forEach((button) => {
        if (!button) return;

        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            y: -3,
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* =======================
     SKILLS ANIMATION
  ======================= */

  useEffect(() => {
    skillCardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, x: -20, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.4,
          delay: index * 0.08,
          ease: "power2.out",
        }
      );

      const bar = progressBarsRef.current[index];
      if (bar) {
        const skill =
          skillCategories
            .find((c) => c.id === activeCategory)
            ?.skills[index];

        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${skill.level}%`,
            duration: 1,
            delay: 0.2 + index * 0.08,
            ease: "power2.out",
          }
        );
      }
    });
  }, [activeCategory]);

  const activeSkills =
    skillCategories.find((c) => c.id === activeCategory)?.skills || [];

  /* =======================
     RENDER
  ======================= */

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-500"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            ref={headerRef}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300"
          >
            My Skills & Experience
          </h2>
          <p
            ref={subheaderRef}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Technologies I use to build scalable, modern, and performant
            applications
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.id}
              ref={(el) => (categoryButtonsRef.current[i] = el)}
              onClick={() => setActiveCategory(cat.id)}
              className={`opacity-100 visible px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 border-2 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-400 shadow-xl"
                  : "bg-white dark:bg-slate-700 text-gray-800 dark:text-teal-100 border-teal-300 dark:border-teal-500 hover:bg-teal-50 dark:hover:bg-slate-600 shadow-md"
              }`}
            >
              {cat.icon}
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {activeSkills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillCardsRef.current[index] = el)}
              className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {skill.name}
                </span>
                <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">
                  {skill.level}%
                </span>
              </div>

              <div className="h-2.5 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden shadow-inner">
                <div
                  ref={(el) => (progressBarsRef.current[index] = el)}
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-sm"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mt-20">
          <h3
            ref={timelineHeadingRef}
            className="text-2xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300"
          >
            Professional Journey
          </h3>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 w-1 h-full bg-gradient-to-b from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 transform -translate-x-1/2" />

            {experienceItems.map((item, index) => (
              <div
                key={index}
                ref={(el) => (timelineItemsRef.current[index] = el)}
                className={`relative mb-10 ${
                  index % 2 === 0 ? "pr-10 text-right" : "pl-10 text-left"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute top-5 rounded-full w-4 h-4 bg-gradient-to-r from-teal-500 to-teal-600 ${
                    index % 2 === 0 ? "-right-2" : "-left-2"
                  } shadow-md`}
                />
                
                {/* Timeline Card */}
                <div className="p-6 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm cursor-pointer transition-all duration-300">
                  <p className="text-sm text-teal-600 dark:text-teal-400 mb-1 font-medium">
                    {item.year}
                  </p>
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1">
                    {item.role}
                  </h4>
                  <p className="text-sm text-teal-600 dark:text-teal-300 mb-2 font-medium">
                    {item.company}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
                </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-center shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md"
            >
              <div className="w-12 h-12 bg-teal-500 dark:bg-teal-600 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
                {stat.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                0{stat.suffix}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
