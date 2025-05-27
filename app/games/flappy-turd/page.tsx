'use client';
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const GRAVITY = 0.3;
const JUMP = -5;
const PIPE_WIDTH = 60;
const GAP = 180;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const PIPE_INTERVAL = 2000;
const BIRD_SIZE = 40;
const BIRD_X = 100;

export default function FlappyTurdGame() {
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [velocity, setVelocity] = useState(0);
  const [rotation, setRotation] = useState(0);
  interface Pipe {
    id: number;
    x: number;
    topHeight: number;
    passed: boolean;
  }
  
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('flappyHighScore') || '0');
    }
    return 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const [gameSize, setGameSize] = useState({ width: GAME_WIDTH, height: GAME_HEIGHT });

  const lastTimeRef = useRef(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, isRunning]);

  const handleJump = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setIsRunning(true);
    }
    
    if (!isRunning) {
      resetGame();
    } else {
      setVelocity(JUMP);
    }
  };

  const resetGame = () => {
    setBirdY(GAME_HEIGHT / 2);
    setVelocity(0);
    setRotation(0);
    setPipes([]);
    setScore(0);
    setIsRunning(true);
  };

  useAnimationFrame((time) => {
    if (!isRunning) return;
  
    lastTimeRef.current = time;

    setVelocity(v => Math.min(v + GRAVITY, 15));
    setBirdY(y => {
      const newY = y + velocity;
      if (newY < 0 || newY > GAME_HEIGHT - BIRD_SIZE) {
        endGame();
        return y;
      }
      return newY;
    });
    setRotation(velocity * 4);

    setPipes(prevPipes => {
      return prevPipes
        .map(pipe => ({
          ...pipe,
          x: pipe.x - 3
        }))
        .filter(pipe => pipe.x + PIPE_WIDTH > -50);
    });
  });

  // Pipe generator
  useEffect(() => {
    if (!isRunning) return;
    
    const interval = setInterval(() => {
      const topHeight = Math.random() * (GAME_HEIGHT - GAP - 200) + 100;
      setPipes(prev => [...prev, {
        id: Date.now(),
        x: GAME_WIDTH,
        topHeight,
        passed: false
      }]);
    }, PIPE_INTERVAL);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const checkCollisions = () => {
      pipes.forEach(pipe => {
        const birdRight = BIRD_X + BIRD_SIZE;
        const birdLeft = BIRD_X;
        
        if (pipe.x < birdRight && pipe.x + PIPE_WIDTH > birdLeft) {
          if (birdY < pipe.topHeight || birdY + BIRD_SIZE > pipe.topHeight + GAP) {
            endGame();
          }
        }
        
        if (!pipe.passed && pipe.x + PIPE_WIDTH < birdLeft) {
          setScore(prevScore => prevScore + 1);
          pipe.passed = true;
        }
      });
    };

    const collisionFrame = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(collisionFrame);
  }, [pipes, birdY, isRunning]);

  const endGame = () => {
    setIsRunning(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyHighScore', score.toString());
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { 
        setGameSize({
          width: Math.min(window.innerWidth - 32, GAME_WIDTH),
          height: Math.min(window.innerHeight - 200, GAME_HEIGHT)
        });
      } else {
        setGameSize({
          width: GAME_WIDTH,
          height: GAME_HEIGHT
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 p-4 md:p-0">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4 px-2 md:px-4">
          <Link 
            href="/games" 
            className="text-green-400 hover:text-green-300 flex items-center transition-colors duration-300 text-sm md:text-base"
          >
            <motion.span 
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mr-2"
            >
              <FaArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </motion.span>
            Back
          </Link>
        </div>

        <div className="text-center mb-4 w-full">
          <h1 className="text-xl md:text-4xl font-bold text-green-400 mb-2">Flappy Turd</h1>
          <div className="flex justify-center gap-4 md:gap-8 text-sm md:text-base text-white">
            <div>Score: <span className="text-green-400 font-bold">{score}</span></div>
            <div>High Score: <span className="text-green-400 font-bold">{highScore}</span></div>
          </div>
        </div>

        <div 
          className="relative overflow-hidden border-4 border-green-400 rounded-lg shadow-xl bg-black/70 cursor-pointer"
          style={{ 
            width: gameSize.width,
            height: gameSize.height,
            maxWidth: '100%',
            maxHeight: 'calc(100vh - 200px)'
          }}
          onClick={handleJump}
        >
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ 
              width: BIRD_SIZE * (gameSize.width / GAME_WIDTH),
              height: BIRD_SIZE * (gameSize.height / GAME_HEIGHT),
              left: BIRD_X * (gameSize.width / GAME_WIDTH)
            }}
            animate={{ 
              y: birdY * (gameSize.height / GAME_HEIGHT),
              rotate: rotation
            }}
            transition={{ type: "tween", duration: 0.1 }}
          >
            <span className="text-2xl md:text-3xl text-green-400" 
                  style={{ transform: 'scale(1.2)' }}>💩</span>
          </motion.div>

          {pipes.map((pipe) => (
            <div key={pipe.id}>
              <div
                className="absolute bg-green-700 border-4 border-t-0 border-green-400"
                style={{
                  left: pipe.x * (gameSize.width / GAME_WIDTH),
                  top: 0,
                  width: PIPE_WIDTH * (gameSize.width / GAME_WIDTH),
                  height: pipe.topHeight * (gameSize.height / GAME_HEIGHT),
                }}
              />
              <div
                className="absolute bg-green-700 border-4 border-b-0 border-green-400"
                style={{
                  left: pipe.x * (gameSize.width / GAME_WIDTH),
                  top: (pipe.topHeight + GAP) * (gameSize.height / GAME_HEIGHT),
                  width: PIPE_WIDTH * (gameSize.width / GAME_WIDTH),
                  height: gameSize.height,
                }}
              />
            </div>
          ))}

          {!gameStarted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/80 p-4 text-center">
              <h1 className="text-2xl md:text-4xl font-bold text-zinc-100 mb-2 md:mb-4">Flappy Turd</h1>
              <p className="text-base md:text-xl text-zinc-300">Press Space or Click to Start</p>
            </div>
          )}

          {!isRunning && gameStarted && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-xl md:text-4xl text-red-500 font-bold mb-2">Game Over</h2>
              <p className="text-base md:text-xl text-white mb-4 md:mb-6">
                Your score: <span className="text-green-400 font-bold">{score}</span>
              </p>
              <motion.button
                onClick={resetGame}
                className="px-4 py-2 md:px-6 md:py-3 bg-green-500 text-white rounded-md text-sm md:text-lg 
                         hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}