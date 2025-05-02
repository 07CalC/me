import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { ReactSVG } from "react-svg";

const frontendSkills = [
    {
        name: "React",
        img: "/react.svg"
    },
    {
        name: "TailwindCSS",
        img: "/tailwind.svg"
    },
    {
        name: "Next.js",
        img: "/nextjs.svg"
    },
    // {
    //     name: "Vue",
    //     img: "/vue.svg"
    // },
    {
        name: "Expo",
        img: "/expo.svg"
    },
    {
        name: "Yew",
        img: "/yew.svg"
    },
    {
        name: "Zustand",
        img: "/zustand.svg"
    }
];

const backendSkills = [
    {
        name: "Bun",
        img: "/bun.svg"
    },
    {
        name: "Actix",
        img: "/actix.svg"
    },
    {
        name: "ExpressJs",
        img: "/express.svg"
    },
    {
        name: "HonoJs",
        img: "/hono.svg"
    },
    {
        name: "PostgreSQl",
        img: "/Postgres.svg"
    },
    {
        name: "MongoDB",
        img: "/mongo.svg"
    },
    {
        name: "Sqlite",
        img: "/sqlite.svg"
    },
    {
        name: "Redis",
        img: "/redis.svg"
    },
    {
        name: "Prisma",
        img: "/prisma.svg"
    },
    {
        name: "Drizzle",
        img: "/drizzle.svg"
    }
];

const tools = [
    {
        name: "Git",
        img: "/git.svg"
    },
    {
        name: "Github",
        img: "/github.svg"
    },
    {
        name: "Docker",
        img: "/docker.svg"
    },
    {
        name: "Nginx",
        img: "/nginx.svg"
    },
    {
        name: "Supabase",
        img: "/supabase.svg"
    },
    {
        name: "Firebase",
        img: "/firebase.svg"
    },
    {
        name: "Postman",
        img: "/postman.svg"
    },
    {
        name: "Linux",
        img: "/linux.svg"
    }
];

const otherSKills = [
    {
        name: "Figma",
        img: "/figma.svg"
    },
    {
        name: "Canva",
        img: "/canva.svg"
    },
    {
        name: "Gimp",
        img: "/gimp.svg"
    },
];

export const Skills = () => {
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
                staggerChildren: 0.1,
            } 
        }
    };
    
    const leftSectionVariants = {
        hidden: { 
            opacity: 0, 
            x: -50 
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6,
            }
        }
    };
    
    const rightSectionVariants = {
        hidden: { 
            opacity: 0, 
            x: 50 
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.6,
            }
        }
    };
    
    const skillItemVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8 
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 80,
            }
        }
    };

    return (
        <div ref={ref} className="min-h-screen w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 overflow-x-hidden">
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-8 text-center underline text-green-400 font-bold"
            > Technical Skills
            </motion.h1>
            
            <motion.div 
                className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-7xl'
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                <motion.div
                    variants={leftSectionVariants}
                    className="flex flex-col text-center w-full"
                >
                    <div className="text-green-400 p-4 sm:p-6 rounded-lg shadow-xl space-y-3 md:space-y-4 mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-4 text-start">Frontend</h2>
                        <motion.div 
                            className="gap-2 md:gap-4 bg-green-900/20 border-green-400 border-2 rounded-xl p-3 sm:p-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-center"
                            variants={containerVariants}
                        >
                            {frontendSkills.map((skill, index) => (
                                <motion.div 
                                    key={index} 
                                    variants={skillItemVariants}
                                    whileHover={{ 
                                        scale: 1.1,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="flex flex-col items-center gap-1 sm:gap-2 text-center p-1"
                                >
                                    <ReactSVG 
                                        src={skill.img} 
                                        beforeInjection={(svg) => {
                                            svg.setAttribute('style', 'width: 80px; height: 80px; max-width: 100%; margin: 0 auto;');
                                            svg.querySelectorAll('path, circle, rect').forEach(path => {
                                                path.setAttribute('style', 'transition: all 0.3s ease;');
                                            });
                                        }} 
                                        className="glow-logo text-green-400 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                                        
                                    />
                                    <h3 className="text-xs sm:text-sm md:text-md whitespace-break-spaces font-mono font-semibold text-center">{skill.name}</h3>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    
                    <div className="text-green-400 p-4 sm:p-6 rounded-lg shadow-xl space-y-3 md:space-y-4">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-4 text-start">Backend</h2>
                        <motion.div 
                            className="gap-2 md:gap-4 bg-green-900/20 border-green-400 border-2 rounded-xl p-3 sm:p-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-center"
                            variants={containerVariants}
                        >
                            {backendSkills.map((skill, index) => (
                                <motion.div 
                                    key={index} 
                                    variants={skillItemVariants}
                                    whileHover={{ 
                                        scale: 1.1,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="flex flex-col items-center gap-1 sm:gap-2 text-center p-1"
                                >
                                    <ReactSVG 
                                        src={skill.img} 
                                        beforeInjection={(svg) => {
                                            svg.setAttribute('style', 'width: 80px; height: 80px; max-width: 100%; margin: 0 auto;');
                                        }} 
                                        className="glow-logo text-green-400 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                                        
                                    />
                                    <h3 className="text-xs sm:text-sm md:text-md whitespace-break-spaces font-mono font-semibold text-center">{skill.name}</h3>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
                
                <motion.div
                    variants={rightSectionVariants}
                    className="flex flex-col text-center w-full"
                >
                    <div className="text-green-400 p-4 sm:p-6 rounded-lg shadow-xl space-y-3 md:space-y-4 mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-4 text-start">Other Skills</h2>
                        <motion.div 
                            className="gap-2 md:gap-4 bg-green-900/20 border-green-400 border-2 rounded-xl p-3 sm:p-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-center"
                            variants={containerVariants}
                        >
                            {otherSKills.map((skill, index) => (
                                <motion.div 
                                    key={index} 
                                    variants={skillItemVariants}
                                    whileHover={{ 
                                        scale: 1.1,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="flex flex-col items-center gap-1 sm:gap-2 text-center p-1"
                                >
                                    <ReactSVG 
                                        src={skill.img} 
                                        beforeInjection={(svg) => {
                                            svg.setAttribute('style', 'width: 80px; height: 80px; max-width: 100%; margin: 0 auto;');
                                        }} 
                                        className="glow-logo text-green-400 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                                       
                                    />
                                    <h3 className="text-xs sm:text-sm md:text-md whitespace-break-spaces font-mono font-semibold text-center">{skill.name}</h3>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    
                    <div className="text-green-400 p-4 sm:p-6 rounded-lg shadow-xl space-y-3 md:space-y-4">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-2 md:mb-4 text-start">Tools</h2>
                        <motion.div 
                            className="gap-2 md:gap-4 bg-green-900/20 border-green-400 border-2 rounded-xl p-3 sm:p-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-center"
                            variants={containerVariants}
                        >
                            {tools.map((skill, index) => (
                                <motion.div 
                                    key={index} 
                                    variants={skillItemVariants}
                                    whileHover={{ 
                                        scale: 1.1,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="flex flex-col items-center gap-1 sm:gap-2 text-center p-1"
                                >
                                    <ReactSVG 
                                        src={skill.img} 
                                        beforeInjection={(svg) => {
                                            svg.setAttribute('style', 'width: 80px; height: 80px; max-width: 100%; margin: 0 auto;');
                                        }} 
                                        className="glow-logo text-green-400 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                                       
                                    />
                                    <h3 className="text-xs sm:text-sm md:text-md whitespace-break-spaces font-mono font-semibold text-center">{skill.name}</h3>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};