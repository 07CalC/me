'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import Experience from '@/components/Experience';
import { GamesFAB } from '@/components/GamesFAB';
import { Gort } from '@/components/Gort';
import { BlogFAB } from '@/components/BlogFAB';
import Heatmap from '@/components/HeatMap';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const gortRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.2 });
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.2 });
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.2 });
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.2 })
  const gortInView = useInView(gortRef, { once: true, amount: 0.2 });

  return (
    <>
      <GamesFAB />
      <BlogFAB />
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="section-container"
      >
        <About />
      </motion.section>

      <motion.section
        ref={skillsRef}
        initial="hidden"
        animate={skillsInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="section-container"
      >
        <Heatmap />
      </motion.section>

      <motion.section ref={projectsRef}
        initial="hidden"
        animate={projectsInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="section-container"
      >
        <Projects />
      </motion.section>
      <motion.section
        ref={experienceRef}
        initial="hidden"
        animate={experienceInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="section-container"
      >
        <Experience />
      </motion.section>

      <motion.section
        ref={gortRef}
        initial="hidden"
        animate={gortInView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="section-container"
      >
        <Gort />
      </motion.section>
    </>
  );
}
