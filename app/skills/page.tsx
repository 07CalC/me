'use client';
import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import { FaGamepad } from 'react-icons/fa';

const frontendSkills = [
    {
        name: "React",
        img: "/react.svg"
    },
    {
        name: "TailwindCSS",
        img: "/tailwind.svg"
    },
    {
        name: "Next.js",
        img: "/nextjs.svg"
    },
    {
        name: "Expo",
        img: "/expo.svg"
    },
    {
        name: "Yew",
        img: "/yew.svg"
    },
    {
        name: "Zustand",
        img: "/zustand.svg"
    }
];

const backendSkills = [
    {
        name: "Bun",
        img: "/bun.svg"
    },
    {
        name: "Actix",
        img: "/actix.svg"
    },
    {
        name: "ExpressJs",
        img: "/express.svg"
    },
    {
        name: "HonoJs",
        img: "/hono.svg"
    },
    {
        name: "PostgreSQl",
        img: "/Postgres.svg"
    },
    {
        name: "MongoDB",
        img: "/mongo.svg"
    },
    {
        name: "Sqlite",
        img: "/sqlite.svg"
    },
    {
        name: "Redis",
        img: "/redis.svg"
    },
    {
        name: "Prisma",
        img: "/prisma.svg"
    },
    {
        name: "Drizzle",
        img: "/drizzle.svg"
    }
];

const tools = [
    {
        name: "Git",
        img: "/git.svg"
    },
    {
        name: "Github",
        img: "/github.svg"
    },
    {
        name: "Docker",
        img: "/docker.svg"
    },
    {
        name: "Nginx",
        img: "/nginx.svg"
    },
    {
        name: "Supabase",
        img: "/supabase.svg"
    },
    {
        name: "Firebase",
        img: "/firebase.svg"
    },
    {
        name: "Postman",
        img: "/postman.svg"
    },
    {
        name: "Linux",
        img: "/linux.svg"
    }
];

const otherSKills = [
    {
        name: "Figma",
        img: "/figma.svg"
    },
    {
        name: "Canva",
        img: "/canva.svg"
    },
    {
        name: "Gimp",
        img: "/gimp.svg"
    },
];

export default function SkillsPage() {
  const controls = useAnimation();
  const ref = useRef(null);
  
  const inView = useInView(ref, { 
    once: false, 
    amount: 0.1 
  });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const leftSectionVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  const rightSectionVariants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 70
      }
    }
  };

  return (
    <div 
      ref={ref} 
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 md:py-8 overflow-x-hidden"
    >
      <Link 
          href={"/games"} 
          className='fixed z-10 md:bottom-5 md:left-5 bottom-5 left-1/2 transform md:transform-none -translate-x-1/2 md:translate-x-0 p-4 flex border-2 border-green-800 rounded-2xl text-green-800 bg-green-400 hover:bg-green-500/50 hover:text-green-300 transition-colors duration-100 animate-bounce group'
        >
            <FaGamepad className='md:text-3xl text-xl group-hover:animate-wiggle' />
            <span className='md:text-lg ml-2 text-sm'>Games</span>
        </Link>
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl mb-6 text-center underline text-green-400 font-bold"
      > 
        Technical Skills
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl'
      >
        <motion.div
          variants={leftSectionVariants}
          className="flex flex-col text-center w-full"
        >
          <motion.div 
            variants={cardVariants}
            className="text-green-400 p-4 md:p-6 rounded-lg shadow-xl space-y-4 mb-4"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-start">Frontend</h2>
            <div className="gap-2 md:gap-4 bg-green-900/20 border-green-400 border-2 rounded-xl p-3 md:p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-center">
              {frontendSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  variants={skillVariants}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center gap-1 md:gap-2 text-center p-1"
                >
                  <ReactSVG 
                    src={skill.img} 
                    beforeInjection={(svg) => {
                      svg.setAttribute('style', 'width: 80px; height: 80px; max-width: 100%; margin: 0 auto; @media (min-width: 768px) { width: 100px; height: 100px; }');
                      svg.querySelectorAll('path, circle, rect').forEach(path => {
                        path.setAttribute('style', 'transition: all 0.3s ease;');
                      });
                    }} 
                    className="glow-logo text-green-400 flex items-center justify-center w-10 h-10 md:w-20 md:h-20 lg:w-24 lg:h-24" 
                  
                  />
                  <h3 className="text-xs md:text-sm whitespace-break-spaces font-mono font-semibold text-center">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            className="text-green-400 p-4 md:p-6 rounded-lg shadow-xl space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-start">Backend</h2>
            <div className="gap-2 md:gap-4 bg-green-900/20 border-green-400 border-2 rounded-xl p-3 md:p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-center">
              {backendSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  variants={skillVariants}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center gap-1 md:gap-2 text-center p-1"
                >
                  <ReactSVG 
                    src={skill.img} 
                    beforeInjection={(svg) => {
                      svg.setAttribute('style', 'width: 80px; height: 80px; max-width: 100%; margin: 0 auto; @media (min-width: 768px) { width: 100px; height: 100px; }');
                    }}
                    className="glow-logo text-green-400 flex items-center justify-center w-10 h-10 md:w-20 md:h-20 lg:w-24 lg:h-24" 
                    
                  />
                  <h3 className="text-xs md:text-sm whitespace-break-spaces font-mono font-semibold text-center">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={rightSectionVariants}
          className="flex flex-col text-center w-full"
        >
          <motion.div 
            variants={cardVariants}
            className="text-green-400 p-4 md:p-6 rounded-lg shadow-xl space-y-4 mb-4"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-start">Other Skills</h2>
            <div className="gap-2 md:gap-4 bg-green-900/20 border-green-400 border-2 rounded-xl p-3 md:p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-center">
              {otherSKills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  variants={skillVariants}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center gap-1 md:gap-2 text-center p-1"
                >
                  <ReactSVG 
                    src={skill.img} 
                    beforeInjection={(svg) => {
                      svg.setAttribute('style', 'width: 80px; height: 80px; max-width: 100%; margin: 0 auto; @media (min-width: 768px) { width: 100px; height: 100px; }');
                    }}
                    className="glow-logo text-green-400 flex items-center justify-center w-10 h-10 md:w-20 md:h-20 lg:w-24 lg:h-24" 
                    
                  />
                  <h3 className="text-xs md:text-sm whitespace-break-spaces font-mono font-semibold text-center">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={cardVariants}
            className="text-green-400 p-4 md:p-6 rounded-lg shadow-xl space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-start">Tools</h2>
            <div className="gap-2 md:gap-4 bg-green-900/20 border-green-400 border-2 rounded-xl p-3 md:p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-center">
              {tools.map((skill, index) => (
                <motion.div 
                  key={index} 
                  variants={skillVariants}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className="flex flex-col items-center gap-1 md:gap-2 text-center p-1"
                >
                  <ReactSVG 
                    src={skill.img} 
                    beforeInjection={(svg) => {
                      svg.setAttribute('style', 'width: 80px; height: 80px; max-width: 100%; margin: 0 auto; @media (min-width: 768px) { width: 100px; height: 100px; }');
                    }}
                    className="glow-logo text-green-400 flex items-center justify-center w-10 h-10 md:w-20 md:h-20 lg:w-24 lg:h-24" 
                    
                  />
                  <h3 className="text-xs md:text-sm whitespace-break-spaces font-mono font-semibold text-center">{skill.name}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex gap-4 mt-6 md:mt-10"
      >
        <Link 
          href="/projects" 
          className="border-2 border-green-400 px-4 md:px-6 py-2 hover:bg-green-700 transition-all duration-300 rounded-md text-sm md:text-base"
        >
          Next
        </Link>
      </motion.div>
    </div>
  );
}
