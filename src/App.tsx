import React, { useState, useEffect, useRef } from 'react';

// Custom SF Symbols-style icons matching exact design
const PauseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5.5" y="3.5" width="3.5" height="13" rx="0.8" fill="currentColor"/>
    <rect x="11" y="3.5" width="3.5" height="13" rx="0.8" fill="currentColor"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 4.5c-.3-.2-.5 0-.5.3v10.4c0 .3.2.5.5.3l8-5.2c.3-.2.3-.6 0-.8l-8-5z" fill="currentColor"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.28 5.28a.75.75 0 0 1 1.06 0L10 8.94l3.66-3.66a.75.75 0 1 1 1.06 1.06L11.06 10l3.66 3.66a.75.75 0 1 1-1.06 1.06L10 11.06l-3.66 3.66a.75.75 0 0 1-1.06-1.06L8.94 10 5.28 6.34a.75.75 0 0 1 0-1.06z" fill="white"/>
  </svg>
);

function TimerDigit({ digit }: { digit: string }) {
  return (
    <div className="relative h-[45px] w-[25px] overflow-hidden">
      <div
        key={`${digit}-exit`}
        className="absolute w-full animate-slide-out"
      >
        {digit}
      </div>
      <div
        key={`${digit}-enter`}
        className="absolute w-full animate-slide-up"
      >
        {digit}
      </div>
    </div>
  );
}

function App() {
  const [seconds, setSeconds] = useState(60);
  const [isPaused, setIsPaused] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!isPaused && isExpanded) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev > 0 ? prev - 1 : 60);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, isExpanded]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused(!isPaused);
  };

  const handleClose = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsContentVisible(false);
    await new Promise(resolve => setTimeout(resolve, 50));
    setIsExpanded(false);
    setIsPaused(true);
  };

  const handleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setTimeout(() => {
        setIsContentVisible(true);
      }, 100);
      setSeconds(60);
      setIsPaused(true);
    }
  };

  const formattedSeconds = seconds.toString().padStart(2, '0');

  return (
    <div className="min-h-screen dark:bg-[#1c1c1c] bg-white">
      {/* Dynamic Island Container */}
      <div 
        onClick={handleExpand}
        className={`
          fixed left-1/2 top-14 bg-black shadow-lg cursor-pointer origin-top
          ${isExpanded 
            ? 'rounded-[55px] pl-3 pr-4 py-[10px] w-auto' 
            : 'rounded-[25px] w-[120px] h-[40px]'
          }
        `}
        style={{
          transform: `translate(-50%, 0) ${!isExpanded ? 'scale(0.7)' : 'scale(1.3)'}`,
          transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformOrigin: 'top center',
          willChange: 'transform, width, border-radius'
        }}
      >
        {/* Expanded State Content */}
        <div 
          className={`
            flex items-center
            transition-[opacity,transform]
            ${isContentVisible ? 'opacity-100' : 'opacity-0'}
            ${isExpanded ? 'pointer-events-auto' : 'pointer-events-none'}
          `}
          style={{
            transform: isContentVisible ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 150ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            willChange: 'transform, opacity'
          }}
        >
          {/* Buttons Group */}
          <div className="flex gap-2">
            {/* Play/Pause Button */}
            <button 
              onClick={handlePlayPause}
              className="w-[42px] h-[42px] rounded-full bg-[#5a3c07] hover:bg-[#694608] flex items-center justify-center transition-colors relative overflow-hidden"
            >
              <div className="relative w-7 h-7">
                <div 
                  className={`
                    absolute inset-0 flex items-center justify-center text-[#FFB800]
                    transition-all duration-150 transform
                    ${isPaused ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                  `}
                  style={{
                    transition: 'all 150ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <PlayIcon />
                </div>
                <div 
                  className={`
                    absolute inset-0 flex items-center justify-center text-[#FFB800]
                    transition-all duration-150 transform
                    ${!isPaused ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                  `}
                  style={{
                    transition: 'all 150ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <PauseIcon />
                </div>
              </div>
            </button>
            
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="w-[42px] h-[42px] rounded-full bg-[#3A3A3C] hover:bg-[#4A4A4C] flex items-center justify-center transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
          
          {/* Timer Text */}
          <div className="flex items-center ml-[51px]">
            <span className="font-['system-ui'] text-[#F0A500] text-[18px] mr-2.5 translate-y-[5px]">Timer</span>
            <div className="flex font-['system-ui'] text-[#F0A500] text-[38px] leading-none translate-y-[5px]">
              0:
              <TimerDigit digit={formattedSeconds[0]} />
              <TimerDigit digit={formattedSeconds[1]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;