import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { ReactSVG } from "react-svg";

const projects = [
    {
      title: "Dorara",
      description: `An all-in-one productivity app that combines to-do lists, notes, and journaling to help users stay organized and track their
  daily activities.`,
      tech: [
        {
          name: "React Native",
          icon: "/react.svg",
        },
        {
          name: "Expo",
          icon: "/expo.svg",
        },
        {
          name: "Sqlite",
          icon: "/sqlite.svg",
        },
        {
          name: "Nativewind CSS",
          icon: "/tailwind.svg",
        },
      ],
      github: "https://github.com/07Calc/dorara",
      demo: "https://github.com/07CalC/Dorara/releases/tag/v1.2"
    },
    {
      title: "Crux",
      description: `A web platform that provides previous years' opening and closing ranks for various colleges under JoSAA and CSAB,
  helping students make informed decisions during counseling.`,
      tech: [
        {
          name: "Next.js",
          icon: "/nextjs.svg",
        },
        {
          name: "Tailwind CSS",
          icon: "/tailwind.svg",
        },
        {
          name: "PostgreSQL",
          icon: "/Postgres.svg",
        },
        {
          name: "Docker",
          icon: "/docker.svg",
        },
        {
          name: "Prisma",
          icon: "/prisma.svg",
        }
      ],
      github: "https://github.com/07calc/crux",
      demo: "https://crux.ix.tc/",
    },
    {
      title: "JeeLore",
      description: `A community-driven web forum where JEE and NEET aspirants can post questions, share answers, and collaborate to
  solve academic doubts.`,
  tech: [
      {
          name: "Express.js",
          icon: "/express.svg",
      },
      {
          name: "React",
          icon: "/react.svg",
      },
      {
          name: "MongoDB",
          icon: "/mongo.svg",
      },
      {
          name: "Tailwind CSS",
          icon: "/tailwind.svg",
      },
      {
          name: "Cloudinary",
          icon: "/cloudinary.svg",
  
      },
      {
          name: "Docker",
          icon: "/docker.svg",
      }
  ],
  github: "https://github.com/07calc/jeelore",
  demo: "https://jeelore.site/",
    },
    {
      title: "Batua",
      description: `A web application that allows users to track their expenses and providing insights into their financial habits.`,
      tech: [
        {
          name: "Express.js",
          icon: "/express.svg",
        },
        {
          name: "React",
          icon: "/react.svg",
        },
        
        {
          name: "Tailwind CSS",
          icon: "/tailwind.svg",
        },
        {
          name: "MongoDb",
          icon: "/mongo.svg",
        },
      ],
      github: "https://github.com/07calc/batua",
      demo: "https://batua.site/",
    },
    {
      title: "TaskyBara",
      description: `TaskyBara is a modern, intuitive web application designed to help individuals and teams stay organized and productive. With a clean interface and powerful features, TaskFlow lets you create, manage, and prioritize tasks seamlessly.`,
      tech: [
          {
              name: "Next.js",
              icon: "/nextjs.svg"
          },
          {
              name: "Tailwind CSS",
              icon: "tailwind.svg"
          },
          {
              name: "PostgreSQL",
              icon: "Postgres.svg"
          },
          {
              name: "Drizzle",
              icon: "drizzle.svg"
          }
      ],
      github: "https://github.com/07calc/taskybara"
    },
    {
      title: "RustProx",
      description: `RustProx is a lightweight, command-line proxy toggler built with Rust, designed to quickly enable or disable system or application-level proxy settings. Ideal for developers and network administrators.`,
      github: "https://github.com/07calc/rustprox"
    }
  ];

export const Projects = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  
  // Remove 'once: true' to allow reanimation
  const inView = useInView(ref, { 
    once: false, 
    amount: 0.1 // Reduced threshold for better mobile triggering
  });
  
  // Reset and restart animation when view changes
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
      } 
    }
  };

  return (
    <div ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-6 overflow-x-hidden">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-6 text-center underline text-purple-400 font-bold"
      >
        Projects
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {projects.map((project, idx) => {
          // Alternate between left and right animations
          const isEven = idx % 2 === 0;
          
          const itemVariants = {
            hidden: { 
              opacity: 0, 
              x: isEven ? -50 : 50,
              y: 20
            },
            visible: { 
              opacity: 1, 
              x: 0,
              y: 0,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6,
                delay: idx * 0.1, // Add slight delay based on index
              }
            }
          };

          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-purple-900/20 border-purple-400 border-2 rounded-xl p-4 sm:p-6 shadow-lg h-full flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 md:mb-4 text-purple-400 font-bold">{project.title}</h2>
                <p className="mb-3 md:mb-5 text-sm md:text-md text-white/80">{project.description}</p>
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                  {project.tech && project.tech.map((tech, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-1 sm:gap-2 bg-purple-900/40 px-2 sm:px-3 py-1 rounded-lg"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <ReactSVG
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            "style",
                            "width: 16px; height: 16px;"
                          );
                        }}
                        src={tech.icon}
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                      <span className="text-xs sm:text-sm text-purple-300">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base md:text-lg mt-auto">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex border-2 hover:bg-purple-500/50 border-purple-400 px-2 py-1 sm:p-2 justify-center items-center gap-1 transition-colors duration-200 rounded-md flex-1 md:flex-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="text-sm sm:text-base md:text-xl" /> 
                    <span className="hidden xs:inline">Code</span>
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex border-2 hover:bg-purple-500/50 border-purple-400 px-2 py-1 sm:p-2 justify-center items-center gap-1 transition-colors duration-200 rounded-md flex-1 md:flex-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="text-sm sm:text-base md:text-xl" /> 
                    <span className="hidden xs:inline">Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};