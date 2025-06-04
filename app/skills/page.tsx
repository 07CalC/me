'use client';
import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import { GamesFAB } from '@/components/GamesFAB';
import { Skills } from '@/components/Skills';

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



  return (
    <div 
      ref={ref} 
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 md:py-8 overflow-x-hidden"
    >
      <GamesFAB />
      <Skills />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-center mb-4 w-full"
      >
        <Link 
          href="/projects" 
          className="group flex items-center gap-2 px-6 py-3 bg-purple-500
                    hover:bg-purple-600 transition-all duration-300 
                    rounded-lg text-base font-medium text-white"
        >
          <span>Next</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </Link>
      </motion.div> 
    </div>
  );
}
