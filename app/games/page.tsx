'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaChevronRight, FaGamepad, FaSnowflake } from "react-icons/fa";
import { BsJoystick } from "react-icons/bs";
import { GiPingPongBat, GiSpaceship } from "react-icons/gi";
import { SiTrueup } from "react-icons/si";

export default function GamesPage() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  const games = [
    {
      title: "Snake",
      description: "Classic snake game with a modern twist. Collect dots and grow your snake without hitting the walls or yourself.",
      icon: <FaSnowflake className="text-3xl md:text-5xl" />,
      link: "/games/snake",
      available: true
    },
    {
      title: "Flappy Turd",
      description: "fly through the pipes and avoid obstacles in this addictive flappy bird clone. Tap to flap your turd!",
      icon: <GiSpaceship className="text-3xl md:text-5xl" />,
      link: "/games/flappy-turd",
      available: SiTrueup
    },
    {
      title: "Pong",
      description: "The original arcade classic. Control your paddle and beat the AI in this simple yet addictive game.",
      icon: <GiPingPongBat className="text-3xl md:text-5xl" />,
      link: "/games/pong",
      available: false
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-16 md:py-24 px-4 md:px-8">
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

      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex items-center mb-6"
          variants={titleVariants}
        >
          <FaGamepad className="text-accent text-5xl md:text-6xl mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold text-accent">Games</h1>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl">
          {games.map((game) => (
            <motion.div
              key={game.title}
              variants={itemVariants}
              className={`relative border-2  ${game.available
                ? "border-border bg-surface "
                : "border-border opacity-70"
                } overflow-hidden flex flex-col h-full transition ease-in-out    
  duration-200 
  shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] 
  hover:-translate-y-2 
  hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] 
  active:translate-y-2
  active:translate-x-2
  active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]
`}
              onMouseLeave={() => setHoveredGame(null)}
            >
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-accent">
                    {game.icon}
                  </div>
                  {!game.available && (
                    <span className="bg-gray-700/70 text-text text-xs px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-accent mb-3">
                  {game.title}
                </h2>

                <p className="text-white mb-4 flex-grow">
                  {game.description}
                </p>

                {game.available ? (
                  <Link
                    href={game.link}
                    className="flex items-center justify-center hover:bg-glow border-2 border-border white font-medium py-3 px-4 rounded-md transition-colors duration-300"
                  >
                    Play Now
                    <motion.div
                      animate={hoveredGame === game.title ? { x: [0, 5, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <FaChevronRight className="ml-2" />
                    </motion.div>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center bg-gray-800 text-gray-400 font-medium py-3 px-4 rounded-md cursor-not-allowed"
                  >
                    Coming Soon <BsJoystick className="ml-2" />
                  </button>
                )}
              </div>

              {game.available && (
                <motion.div
                  className="absolute inset-0 bg-accent2/5 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredGame === game.title ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
