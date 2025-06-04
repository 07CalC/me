'use client';

import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';

// Define experience data structure - remains the same
const experienceData = [
  {
    company: "Kiran Foundation",
    position: "React Native Intern",
    duration: "March'25 - April'25",
    logo: "/kiranFoundation.jpeg",
    description: `Implemented real-time chat functionality using React Native and Chat-Stream, enabling seamless user communication
within the app.`,
    techStack: ["React Native", "TypeScript", "Firebase", "Nativewind"]
  },
];

export function Experience() {
  const controls = useAnimation();
  const ref = useRef(null);
  
  // Set up the InView hook to trigger animations
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

  // Animation variants remain the same
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
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
  
  const techStackVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.4
      }
    }
  };

  return (
    <div 
      ref={ref} 
      className="min-h-screen w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-8 overflow-x-hidden"
    >
      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-purple-400 underline"
      >
        Professional Experience
      </motion.h2>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col items-center justify-center w-full max-w-4xl"
      >
        {experienceData.map((job, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="bg-purple-900/20 border-purple-400 border-2 rounded-xl p-4 sm:p-6 md:p-8 w-full"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Company logo - smaller on mobile */}
              <motion.div 
                className="flex-shrink-0 flex justify-center md:block"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-md overflow-hidden bg-black/30 flex items-center justify-center">
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      height={400}
                      width={400}
                      alt={job.company}
                      className="object-cover w-full h-full"
                      priority
                    />
                  ) : (
                    <div className="text-2xl sm:text-3xl md:text-4xl text-purple-400 font-bold">
                      {job.company.charAt(0)}
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Job details - stacks below logo on mobile */}
              <div className="flex-grow">
                <motion.div 
                  className="flex flex-col md:flex-row md:justify-between"
                  initial={{ opacity: 0, y: -10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-400">{job.position}</h3>
                  <span className="text-sm md:text-base text-purple-400 font-mono mt-1 md:mt-0">{job.duration}</span>
                </motion.div>
                
                <motion.h4 
                  className="text-lg sm:text-xl text-purple-300 mb-2 md:mb-4"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  {job.company}
                </motion.h4>
                
                <motion.p 
                  className="mb-3 md:mb-4 text-sm sm:text-base text-white/80"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  {job.description}
                </motion.p>
                
                {/* Tech stack tags - smaller on mobile with flex-wrap */}
                <motion.div 
                  className="flex flex-wrap gap-1 sm:gap-2 mt-3 md:mt-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate={controls}
                >
                  {job.techStack.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      variants={techStackVariants}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "rgba(34, 197, 94, 0.3)",
                        transition: { duration: 0.2 }
                      }}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-purple-900/40 text-purple-400 text-xs sm:text-sm font-mono rounded-md transition-colors duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Experience;



