'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';



export const BackButton = () => {
  return (

    <Link
      href="/home"
      className="absolute top-6 left-6 text-accent hover:text-glow flex items-center transition-colors duration-300"
    >
      <motion.span
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mr-2"
      >
        <FaArrowLeft className="mr-2" />
      </motion.span>
      Home
    </Link>

  )
}
