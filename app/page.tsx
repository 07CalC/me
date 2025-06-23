'use client';
import { GamesFAB } from '@/components/GamesFAB';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Ref } from 'react';
import { useAsciiText, slant } from 'react-ascii-text';


export default function HomePage() {
  const asciiTextRef = useAsciiText({
    animationCharacters: "▒░█",
    animationCharacterSpacing: 1,
    animationDelay: 2000,
    animationDirection: "down",
    animationInterval: 100,
    animationLoop: true,
    animationSpeed: 30,
    font: slant,
    text: ["Vinayak"],
  });
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <GamesFAB />
      <motion.pre
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-xs md:text-base text-center mb-6 whitespace-pre leading-tight"
      >
        <pre ref={asciiTextRef as Ref<HTMLPreElement>}></pre>
      </motion.pre>
      <div className='flex gap-x-5'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4"
        >
          <Link href="/about" className="border-2 border-border rounded-2xl px-4 py-2 hover:bg-glow">Walkthrough</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4"
        >
          <Link href="/home" className="border-2 border-border rounded-2xl px-4 py-2 hover:bg-glow">Home</Link>
        </motion.div>
      </div>
    </main>
  );
}
