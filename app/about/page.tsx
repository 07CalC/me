'use client';
import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { GamesFAB } from '@/components/GamesFAB';

export default function AboutPage() {
  const controls = useAnimation();
  const ref = useRef(null);
  
  const inView = useInView(ref, { 
    once: false, 
    amount: 0.2 
  });
  
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

  const leftVariants = {
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

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        delay: 0.6
      }
    }
  };

  return (
    <main ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 lg:py-0">
      <GamesFAB />
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl mb-6 text-center underline text-green-400 font-bold"
      >
        About Me
      </motion.h1>

      {/* Content container with improved responsive layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-8 lg:gap-12"
      >
        {/* Text on the left/top - improved responsive text alignment */}
        <motion.div 
          variants={leftVariants}
          className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
        >
          <motion.p 
            variants={textVariants}
            className="text-base md:text-lg mb-4"
          >
            Hi, I&apos;m <strong className='text-xl md:text-2xl text-green-300'>Vinayak Maheshwari</strong>, a fresher at the <strong className='text-xl md:text-2xl text-green-300'>Indian Institute of Information Technology Allahabad</strong>.
            I&apos;m passionate about software development, particularly in web and mobile applications.
          </motion.p>
          
          <motion.p 
            variants={textVariants}
            className="text-base md:text-lg mb-4"
          >
            I enjoy learning new technologies and building projects that solve real-world problems.
            I&apos;m currently honing my skills in App development and I love experimenting with different frameworks and tools.
          </motion.p>
          
          <motion.p
            variants={textVariants}
            className='text-lg md:text-xl text-green-300 mt-4'
          >
            i like cats, dogs and racoons
          </motion.p>
          
          {/* Move button to bottom on mobile, but keep it with text on desktop */}
          <motion.div
            variants={buttonVariants}
            className="hidden lg:flex justify-start mt-8"
          >
            <Link 
              href="/skills" 
              className="border-2 border-green-400 px-6 py-2 hover:bg-green-700 transition-colors duration-300 rounded-md text-base md:text-lg"
            >
              Next
            </Link>
          </motion.div>
        </motion.div>

        {/* Image on the right/top - responsive sizing */}
        <motion.div
          variants={rightVariants}
          className="w-full lg:w-1/2 mb-6 lg:mb-0 order-1 lg:order-2"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -5, 5, -5, 0],
              transition: { 
                duration: 0.5,
                ease: "easeInOut"
              }
            }}
            className="flex justify-center"
          >
            <Image 
              src="/racoon.png" 
              alt="Vinayak Maheshwari"
              width={300}
              height={300}
              className="rounded-full w-48 sm:w-56 md:w-64 border-4 border-green-400/30 shadow-lg shadow-green-400/20"
              priority
            />
          </motion.div>
          
          <motion.div 
            variants={textVariants}
            className="relative gap-y-2 flex flex-col items-center mt-2"
          >
            <motion.div 
              initial={{ height: 0 }}
              animate={inView ? { height: 20 } : { height: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-l-8 border-r-8 border-t-8 border-t-green-500 border-l-transparent border-r-transparent" 
            />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm text-center"
            >
              It&apos;s me
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Mobile-only button that appears at the bottom */}
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate={controls}
        className="flex lg:hidden justify-center mt-6 order-3"
      >
        <Link 
          href="/skills" 
          className="border-2 border-green-400 px-6 py-2 hover:bg-green-700 transition-colors duration-300 rounded-md text-base md:text-lg"
        >
          Next
        </Link>
      </motion.div>
    </main>
  );
}
