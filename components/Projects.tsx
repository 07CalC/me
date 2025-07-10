import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Image from "next/image";

const projects = [
  {
    title: "Crux",
    description: `A web platform that provides previous years' opening and closing ranks for various colleges under JoSAA and CSAB,
  helping students make informed decisions during counseling.`,
    image: "/crux.png",
    tech: [
      {
        name: "Next.js",
        icon: "/nextjs.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "/tailwind.svg",
      },
      {
        name: "PostgreSQL",
        icon: "/Postgres.svg",
      },
      {
        name: "Docker",
        icon: "/docker.svg",
      },
      {
        name: "Prisma",
        icon: "/prisma.svg",
      }
    ],
    github: "https://github.com/07calc/crux",
    demo: "https://crux.ix.tc/",
  },
  {
    title: "Cook.nvim",
    description: `cook.nvim is a modular and extensible Neovim plugin that lets you effortlessly compile or run the current file based on its filetype — inside a floating terminal.`,
    image: "/cook.gif",
    tech: [
      {
        name: "Lua",
        icon: "/lua.svg"
      },
      {
        name: "Neovim",
        icon: "/neovim.svg"
      }
    ],
    github: "https://github.com/07calc/cook.nvim",
  },

  {
    title: "Dorara",
    description: `An all-in-one productivity app that combines to-do lists, notes, and journaling to help users stay organized and track their
  daily activities.`,
    image: "/dorara.png",
    tech: [
      {
        name: "React Native",
        icon: "/react.svg",
      },
      {
        name: "Expo",
        icon: "/expo.svg",
      },
      {
        name: "Sqlite",
        icon: "/sqlite.svg",
      },
      {
        name: "Nativewind CSS",
        icon: "/tailwind.svg",
      },
    ],
    github: "https://github.com/07Calc/dorara",
    demo: "https://github.com/07CalC/Dorara/releases/tag/v1.2"
  },
  {
    title: "LaxCI",
    description: `LaxCI is a blazing-fast, minimal CI runner written in Rust that executes workflows defined in a laxci.yml file — just like GitHub Actions, but entirely local.`,
    image: "/laxci.png",
    tech: [
      {
        name: "Rust",
        icon: "/rust.svg"
      }
    ],
    github: "https://github.com/07calc/laxci",
    demo: "https://crates.io/crates/laxci"
  },
  {
    title: "JeeLore",
    description: `A community-driven web forum where JEE and NEET aspirants can post questions, share answers, and collaborate to
  solve academic doubts.`,
    image: "/jeelore.png",
    tech: [
      {
        name: "Express.js",
        icon: "/express.svg",
      },
      {
        name: "React",
        icon: "/react.svg",
      },
      {
        name: "MongoDB",
        icon: "/mongo.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "/tailwind.svg",
      },
      {
        name: "Cloudinary",
        icon: "/cloudinary.svg",

      },
      {
        name: "Docker",
        icon: "/docker.svg",
      }
    ],
    github: "https://github.com/07calc/jeelore",
    demo: "https://jeelore.site/",
  }, {
    title: "Batua",
    description: `A web application that allows users to track their expenses and providing insights into their financial habits.`,
    image: "https://media.licdn.com/dms/image/v2/D4E22AQFQ2WB2M59kHQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1728992067665?e=1755129600&v=beta&t=-YMEbcw8LN7yNI7C6nOgS5OtR7ls0dlV6u_ctVHEAdI",
    tech: [
      {
        name: "Express.js",
        icon: "/express.svg",
      },
      {
        name: "React",
        icon: "/react.svg",
      },

      {
        name: "Tailwind CSS",
        icon: "/tailwind.svg",
      },
      {
        name: "MongoDb",
        icon: "/mongo.svg",
      },
    ],
    github: "https://github.com/07calc/batua",
    demo: "https://batua.site/",
  },
  {
    title: "RustProx",
    tech: [
      {
        name: "Rust",
        icon: "/rust.svg"
      }
    ],
    description: `RustProx is a lightweight, command-line proxy toggler built with Rust, designed to quickly enable or disable system or application-level proxy settings. Ideal for developers and network administrators.`,
    image: "https://media.licdn.com/dms/image/v2/D4E22AQFVX4gmvMTzFA/feedshare-shrink_2048_1536/B4EZaNNe1AHoAo-/0/1746125844714?e=1755129600&v=beta&t=XKk21g1uc6NrlI3slkYRP4VQghSYPQNhBZy7q5FQoM8",
    github: "https://github.com/07calc/rustprox"
  },
  {
    title: "VtreeX",
    description: `A fast and colorful Rust CLI tool to print directory trees — like tree, but better.
Includes stats, ignore filters, text export, and human-readable performance timing.`,
    image: "/vtreex.png",
    tech: [
      {
        name: "Rust",
        icon: "/rust.svg"
      }
    ],
    github: "https://github.com/07calc/vtreex",
    demo: "https://crates.io/crates/vtreex"
  },
];

export const Projects = () => {
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
        staggerChildren: 0.3,
      }
    }
  };

  return (
    <div ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-6 overflow-x-hidden">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-6 text-center underline text-accent font-bold"
      >
        Projects
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {projects.map((project, idx) => {
          const isEven = idx % 2 === 0;

          const itemVariants = {
            hidden: {
              opacity: 0,
              x: isEven ? -50 : 50,
              y: 20
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6,
                delay: idx * 0.1,
              }
            }
          };

          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-surface border-border border-2  p-4 sm:p-6 h-full flex flex-col justify-between
                transition-all 
  ease-in-out 
  duration-200 
  shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] 
  hover:-translate-y-2 
  hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] 
"
            >
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl mb-2 md:mb-4 text-accent font-bold">{project.title}</h2>
                <p className="mb-3 md:mb-5 text-sm md:text-md text-text ">{project.description}</p>
                <div className="flex flex-wrap gap-3  mb-4">
                  {project.tech && project.tech.map((tech, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-1 sm:gap-2 bg-accent/30 px-2 sm:px-3 py-1   transition-all 
  ease-in-out 
  duration-200 
  shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] 
  hover:-translate-y-1 
  hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] 
"
                    >
                      <Image
                        width={500}
                        height={500}
                        src={tech.icon}
                        alt={tech.name}
                        className="w-4 sm:w-8 h-4 sm:h-8 object-contain"
                      />
                      <span className="text-xs sm:text-lg text-white">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
                {project.image && (
                  <motion.div
                    className="relative w-full flex justify-end items-end mb-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      width={1920}
                      height={1080}
                      className="rounded-lg"
                    />
                  </motion.div>
                )}
              </div>

              <div className="flex flex-wrap justify-end gap-2 sm:gap-4 text-sm sm:text-base md:text-lg mt-auto">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex border-2 hover:bg-glow/50 border-border px-2 py-1 sm:p-2 justify-center items-center gap-1 flex-1 md:flex-none  transition-all 
  ease-in-out 
  duration-200 
  shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] 
  active:translate-y-2
  active:translate-x-2
  active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]"
                  >
                    <FaGithub className="text-sm sm:text-base md:text-3xl text-accent" />
                    <span className="hidden xs:inline">Code</span>
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex border-2 hover:bg-glow/50 border-border px-2 py-1 sm:p-2 justify-center items-center gap-1 flex-1 md:flex-none
                    transition-all 
  ease-in-out 
  duration-200 
  shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] 
  active:translate-y-2
  active:translate-x-2
  active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)]"
                  >
                    <FaExternalLinkAlt className="text-sm sm:text-base md:text-3xl text-accent" />
                    <span className="hidden xs:inline">Demo</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
