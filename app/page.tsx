'use client';
import { BlogFAB } from '@/components/BlogFAB';
import { GamesFAB } from '@/components/GamesFAB';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Ref } from 'react';
import { useAsciiText, slant } from 'react-ascii-text';


export default function HomePage() {
  const asciiTextRefLeft = useAsciiText({
    animationCharacters: "▒░█",
    animationCharacterSpacing: 5,
    animationDelay: 2000,
    animationDirection: "vertical",
    animationInterval: 200,
    animationLoop: true,
    animationSpeed: 30,
    font: slant,
    text: ["Vina", "Ca"],
  });
  const asciiTextRefRight = useAsciiText({
    animationCharacters: "▒░█",
    animationCharacterSpacing: 5,
    animationDelay: 2000,
    animationDirection: "vertical",
    animationInterval: 200,
    animationLoop: true,
    animationSpeed: 30,
    font: slant,
    text: ["yaK", "lC"],
  });
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <GamesFAB />
      <BlogFAB />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-row text-xs md:text-base text-center mb-6 leading-tight font-mono"
      >
        <pre
          ref={asciiTextRefLeft as Ref<HTMLPreElement>}
          className="text-accent whitespace-pre leading-tight"
          style={{ marginRight: '-0.5ch' }} // Tune this value
        />
        <pre
          ref={asciiTextRefRight as Ref<HTMLPreElement>}
          className="text-accent2 whitespace-pre leading-tight"
        />
      </motion.div>
      <div className='flex gap-x-5'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4"
        >
          <Link href="/blog"
            className="border-2 border-border bg-accent text-white px-4 py-2 hover:bg-accent/60 transition-all ease-in-out duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]   active:translate-y-2 active:translate-x-2 active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]">Blog</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4"
        >
          <Link href="/home"
            className="border-2 border-border bg-accent2 text-white px-4 py-2 hover:bg-accent2/60 transition-all ease-in-out duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]   active:translate-y-2 active:translate-x-2 active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]"
          >Home</Link>
        </motion.div>
      </div>
    </main >
  );
}
