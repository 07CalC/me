'use client';

import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiGithubFill, RiInstagramLine, RiLinkedinBoxLine, RiTwitterXLine } from "react-icons/ri";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { GrArchlinux } from "react-icons/gr";

export const About = () => {
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
        delayChildren: 0.1
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
        stiffness: 80,
        duration: 0.4
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 70,
        staggerChildren: 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <main
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center py-8 md:py-0 px-4 overflow-x-hidden"
    >

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col md:flex-row items-center w-full max-w-6xl gap-6 md:gap-8"
      >
        <motion.div
          variants={leftVariants}
          className="w-full flex flex-col justify-center items-center md:items-start md:w-1/2 text-center md:text-left order-2 md:order-1"
        >
          <motion.p
            variants={textVariants}
            className="text-base md:text-lg mb-4 text-pink"
          >
            Hi, I&apos;m <strong className='text-xl md:text-2xl text-accent2'>Vinayak Maheshwari</strong>, a <strong className="text-xl md:text-2xl text-accent">Sophomore</strong> at <strong className='text-xl md:text-2xl text-accent2'>Indian Institute of Information Technology Allahabad</strong>.
            I enjoy working across the stack, especially on web and mobile apps, and I’m always looking for ways to turn ideas into clean, functional products.
          </motion.p>
          <motion.p
            variants={textVariants}
            className='text-lg md:text-xl text-accent mt-4'
          >
            i like cats, dogs and racoons
          </motion.p>


          <motion.div className="flex-mt-4 justify-center md:justify-start">
            <motion.a
              variants={iconVariants}
              href="https://github.com/07calc/aurora"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-accent hover:bg-accent/60 px-2 py-2 justify-center gap-2  mt-4 rounded-lg transition-colors w-56"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GrArchlinux className="text-lg md:text-3xl text-white" />
              <span className="font-medium text-sm md:text-base text-white">Arch btw</span>
            </motion.a>
          </motion.div>

          <motion.div className="flex mt-4 justify-center md:justify-start">
            <motion.a
              variants={iconVariants}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-2 bg-accent2 rounded-lg hover:bg-accent2/60 transition-colors w-40 md:w-44"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineDocumentDownload className="text-lg md:text-3xl text-white" />
              <span className="font-medium text-sm md:text-base text-white">Resume</span>
            </motion.a>
          </motion.div>


          <motion.div
            variants={socialVariants}
            className="flex flex-wrap gap-3 md:gap-5 justify-center md:justify-start mt-5"
          >
            <motion.a
              variants={iconVariants}
              href="mailto:hello@vinm.me"
              whileHover={{ scale: 1.2 }}
              className="transition-colors"
            >
              <MdOutlineMailOutline className="text-3xl text-accent2 sm:text-4xl lg:text-5xl cursor-pointer" />
            </motion.a>

            <motion.a
              variants={iconVariants}
              href="https://github.com/07CalC"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="transition-colors"
            >
              <RiGithubFill className="text-3xl text-accent2 sm:text-4xl lg:text-5xl cursor-pointer" />
            </motion.a>


            <motion.a
              variants={iconVariants}
              href="https://www.linkedin.com/in/maheshwarivinayak"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="transition-colors"
            >
              <RiLinkedinBoxLine className="text-3xl text-accent2 sm:text-4xl lg:text-5xl cursor-pointer" />
            </motion.a>

            <motion.a
              variants={iconVariants}
              href="https://www.instagram.com/_kysvin/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="transition-colors"
            >
              <RiInstagramLine className="text-3xl text-accent2 sm:text-4xl lg:text-5xl cursor-pointer" />
            </motion.a>

            <motion.a
              variants={iconVariants}
              href="https://x.com/Not_CalC"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="transition-colors"
            >
              <RiTwitterXLine className="text-3xl text-accent2 sm:text-4xl lg:text-5xl cursor-pointer" />
            </motion.a>

          </motion.div>
        </motion.div>

        <motion.div
          variants={rightVariants}
          whileHover={{
            scale: 1.05,
            rotate: [0, -5, 5, -5, 5, 0]

          }}
          className="w-full md:w-1/2 mb-6 md:mb-0 order-1 md:order-2"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={inView ? { rotate: [0, -5, 5, -5, 5, 0] } : { rotate: 0 }}

            transition={{
              duration: 2,
              delay: 0.5,
              ease: "easeInOut",
              times: [0, 0.2, 0.4, 0.6, 0.8, 1]
            }}
            className="flex justify-center"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/96346957?v=4"
              alt="Vinayak Maheshwari"
              width={300}
              height={300}

              className="rounded-full w-48 sm:w-64 md:w-72 border-4 border-accent shadow-[0_0_25px_rgba(134, 180, 250,0.5)] hover:shadow-[0_0_25px_rgba(134,180,250,0.5)]"
              priority
            />
          </motion.div>

          <motion.div
            variants={textVariants}
            className="relative flex flex-col items-center mt-2"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={inView ? { height: 20 } : { height: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="border-l-8 border-r-8 border-t-8 border-t-accent border-l-transparent border-r-transparent"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="text-sm text-center text-accent2"
            >
              It&apos;s me
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
};

