'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const PRIMARY_COLOR = '#4ade80';
const DARKER_COLOR = '#22c55e';
const DARKEST_COLOR = '#16a34a';
const BG_COLOR = 'rgba(20, 83, 45, 0.1)';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'NONE';

export default function SnakeGame() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const [snake, setSnake] = useState<Position[]>([]);
  const [apple, setApple] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>('NONE');
  const [nextDirection, setNextDirection] = useState<Direction>('NONE');
  
  const SQUARE_SIZE = 40;
  const SNAKE_SPEED = 120;
  
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({
          width: Math.floor(offsetWidth / SQUARE_SIZE) * SQUARE_SIZE,
          height: Math.floor(offsetHeight / SQUARE_SIZE) * SQUARE_SIZE
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    resetGame();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const COLS = Math.floor(dimensions.width / SQUARE_SIZE);
  const ROWS = Math.floor(dimensions.height / SQUARE_SIZE);

  const resetGame = () => {
    const centerX = Math.floor(COLS / 2);
    const centerY = Math.floor(ROWS / 2);
    
    setSnake([{ x: centerX, y: centerY }]);
    generateNewApple([{ x: centerX, y: centerY }]);
    setDirection('NONE');
    setNextDirection('NONE');
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
  };

  const generateNewApple = (snakeBody: Position[]) => {
    if (COLS <= 0 || ROWS <= 0) return;
    
    let newApple: Position;
    do {
      newApple = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS),
      };
    } while (snakeBody.some(segment => segment.x === newApple.x && segment.y === newApple.y));
    
    setApple(newApple);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setNextDirection('UP');
          if (!gameStarted) setGameStarted(true);
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setNextDirection('DOWN');
          if (!gameStarted) setGameStarted(true);
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setNextDirection('LEFT');
          if (!gameStarted) setGameStarted(true);
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setNextDirection('RIGHT');
          if (!gameStarted) setGameStarted(true);
          break;
        case ' ':
          if (gameOver) resetGame();
          else if (!gameStarted) setGameStarted(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction, gameOver, gameStarted, COLS, ROWS]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameOver) return;
    
    const touch = e.touches[0];
    const touchStartX = touch.clientX;
    const touchStartY = touch.clientY;
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const touchEndX = touch.clientX;
      const touchEndY = touch.clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30) {
          if (direction !== 'LEFT') setNextDirection('RIGHT');
        } else if (deltaX < -30) {
          if (direction !== 'RIGHT') setNextDirection('LEFT');
        }
      } else {
        if (deltaY > 30) {
          if (direction !== 'UP') setNextDirection('DOWN');
        } else if (deltaY < -30) {
          if (direction !== 'DOWN') setNextDirection('UP');
        }
      }
      
      if (!gameStarted) setGameStarted(true);
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      drawGrid(ctx);
      snake.forEach((segment, index) => {
        const isHead = index === 0;
        drawSnakeSegment(ctx, segment, isHead);
      });
      drawApple(ctx);
    };
    
    draw();
    
    if (!gameStarted) return;
    
    const gameLoop = setInterval(() => {
      if (gameOver) return;
      
      setDirection(nextDirection);
      
      let dx = 0, dy = 0;
      switch (nextDirection) {
        case 'UP': dy = -1; break;
        case 'DOWN': dy = 1; break;
        case 'LEFT': dx = -1; break;
        case 'RIGHT': dx = 1; break;
      }
      
      if (nextDirection === 'NONE') return;
      
      const head = { ...snake[0] };
      head.x += dx;
      head.y += dy;
      
      if (head.x < 0) head.x = COLS - 1;
      if (head.x >= COLS) head.x = 0;
      if (head.y < 0) head.y = ROWS - 1;
      if (head.y >= ROWS) head.y = 0;
      
      if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        return;
      }
      
      let newSnake = [head, ...snake];
      
      if (head.x === apple.x && head.y === apple.y) {
        const newScore = score + 1;
        setScore(newScore);
        generateNewApple(newSnake);
      } else {
        newSnake.pop();
      }
      
      setSnake(newSnake);
      draw();
    }, SNAKE_SPEED);
    
    return () => clearInterval(gameLoop);
  }, [snake, direction, nextDirection, apple, gameOver, gameStarted, dimensions, score, highScore, COLS, ROWS]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    
    ctx.strokeStyle = 'rgba(74, 222, 128, 0.1)';
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x <= dimensions.width; x += SQUARE_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, dimensions.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= dimensions.height; y += SQUARE_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(dimensions.width, y);
      ctx.stroke();
    }
  };
  
  const drawSnakeSegment = (ctx: CanvasRenderingContext2D, position: Position, isHead: boolean) => {
    const x = position.x * SQUARE_SIZE;
    const y = position.y * SQUARE_SIZE;
    const size = SQUARE_SIZE;
    
    const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
    
    if (isHead) {
      gradient.addColorStop(0, DARKER_COLOR);
      gradient.addColorStop(1, PRIMARY_COLOR);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, size, size);
      
      ctx.fillStyle = 'white';
      
      const eyeSize = size / 8;
      let eye1X, eye1Y, eye2X, eye2Y;
      
      switch (direction) {
        case 'UP':
          eye1X = x + size / 4;
          eye1Y = y + size / 4;
          eye2X = x + size * 3/4;
          eye2Y = y + size / 4;
          break;
        case 'DOWN':
          eye1X = x + size / 4;
          eye1Y = y + size * 3/4;
          eye2X = x + size * 3/4;
          eye2Y = y + size * 3/4;
          break;
        case 'LEFT':
          eye1X = x + size / 4;
          eye1Y = y + size / 4;
          eye2X = x + size / 4;
          eye2Y = y + size * 3/4;
          break;
        case 'RIGHT':
        default:
          eye1X = x + size * 3/4;
          eye1Y = y + size / 4;
          eye2X = x + size * 3/4;
          eye2Y = y + size * 3/4;
      }
      
      ctx.beginPath();
      ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
      ctx.fill();
    } else {
      gradient.addColorStop(0, PRIMARY_COLOR);
      gradient.addColorStop(1, DARKEST_COLOR);
      
      ctx.fillStyle = gradient;
      
      const radius = size / 6;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + size - radius, y);
      ctx.arcTo(x + size, y, x + size, y + radius, radius);
      ctx.lineTo(x + size, y + size - radius);
      ctx.arcTo(x + size, y + size, x + size - radius, y + size, radius);
      ctx.lineTo(x + radius, y + size);
      ctx.arcTo(x, y + size, x, y + size - radius, radius);
      ctx.lineTo(x, y + radius);
      ctx.arcTo(x, y, x + radius, y, radius);
      ctx.closePath();
      ctx.fill();
    }
  };
  
  const drawApple = (ctx: CanvasRenderingContext2D) => {
    const x = apple.x * SQUARE_SIZE;
    const y = apple.y * SQUARE_SIZE;
    const size = SQUARE_SIZE;
    
    const gradient = ctx.createRadialGradient(
      x + size/2, y + size/2, size/10,
      x + size/2, y + size/2, size/2
    );
    gradient.addColorStop(0, '#a3e635');
    gradient.addColorStop(1, '#4ade80');
    
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/2 - 1, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#713f12';
    ctx.fillRect(x + size/2 - 1, y + 2, 2, 4);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(x + size/3, y + size/3, size/6, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center text-green-400 hover:text-green-300 transition-colors">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
      
      <div className="text-center mb-4 z-10">
        <h1 className="text-2xl md:text-4xl font-bold text-green-400">Snake Game</h1>
        <div className="flex justify-center gap-8 text-white mt-2">
          <div>Score: <span className="text-green-400 font-bold">{score}</span></div>
          <div>High Score: <span className="text-green-400 font-bold">{highScore}</span></div>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative flex-1 w-full max-w-[800px] max-h-[80vh] border-2 border-green-400 rounded-md overflow-hidden"
        onTouchStart={handleTouchStart}
      >
        <canvas 
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="block w-full h-full"
        />
        
        {!gameStarted && !gameOver && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h2 
              className="text-2xl md:text-4xl text-green-400 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Press any arrow key to start
            </motion.h2>
            <p className="text-white text-lg max-w-md text-center px-4">
              Use <span className="text-green-400">arrow keys</span> or <span className="text-green-400">swipe</span> on mobile to control the snake
            </p>
          </motion.div>
        )}
        
        {gameOver && (
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl md:text-4xl text-red-500 font-bold mb-2">Game Over</h2>
            <p className="text-xl text-white mb-6">Your score: <span className="text-green-400 font-bold">{score}</span></p>
            <motion.button
              onClick={resetGame}
              className="px-6 py-3 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </div>
      
      <div className="mt-4 text-center text-white text-sm opacity-80 px-4">
        <p className="md:hidden">Swipe on the game area to change direction</p>
        <p className="hidden md:block">Use arrow keys to control the snake</p>
      </div>
    </div>
  );
}
