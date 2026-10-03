import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Gauge, Clock } from 'lucide-react';
import { BREW_METHODS, BrewMethod } from '../data/cafeData';

export const BrewCompanionSection: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<BrewMethod>(BREW_METHODS[0]);
  const [cups, setCups] = useState<number>(1);
  
  // Timer State
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Calculations based on method
  const coffeeGrams = cups * 15;
  const waterGrams = coffeeGrams * selectedMethod.defaultRatio;

  useEffect(() => {
    // Reset timer when changing method
    setIsRunning(false);
    setSecondsElapsed(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [selectedMethod]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSecondsElapsed((prev) => {
          if (prev >= selectedMethod.brewTimeSeconds) {
            setIsRunning(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, selectedMethod.brewTimeSeconds]);

  const handleToggleTimer = () => {
    if (secondsElapsed >= selectedMethod.brewTimeSeconds) {
      setSecondsElapsed(0);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setSecondsElapsed(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Find active step
  const activeStepIndex = selectedMethod.steps.findIndex((step, idx) => {
    const nextStep = selectedMethod.steps[idx + 1];
    if (!nextStep) return true;
    return secondsElapsed >= step.timeSec && secondsElapsed < nextStep.timeSec;
  });

  return (
    <section id="brew-guide" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-[#78422A] font-semibold mb-2">
            The Barista Academy
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C241E] font-medium tracking-tight">
            Interactive Brew Guide & Ratio Calculator
          </h2>
          <p className="text-sm sm:text-base text-[#5F5245] mt-2">
            Brewing coffee at home is a quiet science. Adjust your cup yield, follow our step-by-step stopwatch, and extract pure clarity every morning.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 scrollbar-none">
          {BREW_METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMethod(m)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm border transition-all cursor-pointer whitespace-nowrap ${
                selectedMethod.id === m.id
                  ? 'bg-[#2C241E] text-white border-[#2C241E] shadow-xs'
                  : 'bg-white text-[#5F5245] border-[#D7CCC2] hover:border-[#78422A]'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Calculator & Live Timer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-4">
          
          {/* Left Column: Ratio & Metric Calculator */}
          <div className="lg:col-span-6 bg-white border border-[#E3D8CC] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#2C241E] font-semibold">
                  {selectedMethod.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6B5C] mt-1">
                  {selectedMethod.tagline}
                </p>
              </div>

              {/* Yield Selector */}
              <div className="space-y-2 p-4 bg-[#FAF7F2] border border-[#E8DFD5] rounded-sm">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#5F5245]">
                  <span>Number of Cups to Brew</span>
                  <span className="font-mono text-sm text-[#78422A]">{cups} {cups === 1 ? 'Cup' : 'Cups'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={cups}
                  onChange={(e) => setCups(parseInt(e.target.value, 10))}
                  className="w-full accent-[#78422A] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#8A7B6D] font-mono">
                  <span>1 Cup (240ml)</span>
                  <span>2 Cups (480ml)</span>
                  <span>3 Cups (720ml)</span>
                  <span>4 Cups (960ml)</span>
                </div>
              </div>

              {/* Calculated Specifications */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-sm">
                  <div className="text-[10px] uppercase font-semibold text-[#8A7B6D] mb-1">
                    Coffee Dose
                  </div>
                  <div className="font-mono text-xl font-bold text-[#2C241E] tabular-nums">
                    {coffeeGrams}g
                  </div>
                  <div className="text-[10px] text-[#7A6B5C] mt-0.5 font-mono">Fresh Whole Beans</div>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-sm">
                  <div className="text-[10px] uppercase font-semibold text-[#8A7B6D] mb-1">
                    Water Volume
                  </div>
                  <div className="font-mono text-xl font-bold text-[#2C241E] tabular-nums">
                    {waterGrams}g
                  </div>
                  <div className="text-[10px] text-[#7A6B5C] mt-0.5 font-mono">Ratio 1:{selectedMethod.defaultRatio}</div>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] border border-[#E8DFD5] rounded-sm">
                  <div className="text-[10px] uppercase font-semibold text-[#8A7B6D] mb-1">
                    Water Temp
                  </div>
                  <div className="font-mono text-xl font-bold text-[#78422A] tabular-nums">
                    {selectedMethod.tempC}°C
                  </div>
                  <div className="text-[10px] text-[#7A6B5C] mt-0.5 font-mono">
                    {Math.round(selectedMethod.tempC * 1.8 + 32)}°F
                  </div>
                </div>
              </div>

              {/* Grind Recommendation */}
              <div className="p-3.5 border border-[#E8DFD5] rounded-sm flex items-center gap-3 text-xs text-[#5F5245]">
                <Gauge className="w-5 h-5 text-[#78422A] shrink-0" />
                <div>
                  <span className="font-semibold text-[#2C241E] block">Recommended Grind Size:</span>
                  <span>{selectedMethod.grindSize}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#8A7B6D] italic mt-4 pt-4 border-t border-[#F2ECE4]">
              Tip: Always use filtered water with TDS between 75–150 ppm for optimal sweetness extraction.
            </div>
          </div>

          {/* Right Column: Live Stopwatch & Interactive Steps */}
          <div className="lg:col-span-6 bg-[#2C241E] text-[#FAF7F2] border border-[#3E342B] rounded-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Timer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#4A3E34]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#CBB8A7]" />
                  <span className="text-xs uppercase tracking-wider font-medium text-[#CBB8A7]">
                    Live Brew Stopwatch
                  </span>
                </div>
                <span className="text-xs font-mono text-[#D7CCC2]">
                  Target: {formatTime(selectedMethod.brewTimeSeconds)}
                </span>
              </div>

              {/* Huge Stopwatch Display */}
              <div className="py-8 text-center">
                <div className="font-mono text-6xl sm:text-7xl font-light tracking-tight tabular-nums text-white">
                  {formatTime(secondsElapsed)}
                </div>

                {/* Play / Pause / Reset Controls */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={handleToggleTimer}
                    className="flex items-center gap-2 px-6 py-3 bg-[#78422A] hover:bg-[#8F4F32] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md cursor-pointer"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>{secondsElapsed > 0 ? 'Resume' : 'Start Brew'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleResetTimer}
                    className="p-3 text-[#CBB8A7] hover:text-white border border-[#4A3E34] hover:border-[#78422A] rounded-sm transition-colors cursor-pointer"
                    title="Reset Stopwatch"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Step by step timeline */}
              <div className="space-y-3 pt-4 border-t border-[#4A3E34]">
                <span className="text-xs uppercase tracking-wider text-[#A39281] font-semibold block">
                  Method Instructions
                </span>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {selectedMethod.steps.map((step, idx) => {
                    const isCurrent = activeStepIndex === idx;
                    const isPast = secondsElapsed >= (selectedMethod.steps[idx + 1]?.timeSec || selectedMethod.brewTimeSeconds);
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-sm text-xs transition-colors flex gap-3 ${
                          isCurrent
                            ? 'bg-[#3E342B] border border-[#78422A] text-white'
                            : isPast
                            ? 'text-[#8A7B6D] line-through opacity-70'
                            : 'text-[#CBB8A7]'
                        }`}
                      >
                        <span className="font-mono text-[11px] shrink-0 text-[#E0D4C7]">
                          {formatTime(step.timeSec)}
                        </span>
                        <p className="leading-relaxed">{step.instruction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {secondsElapsed >= selectedMethod.brewTimeSeconds && (
              <div className="mt-4 p-3 bg-[#78422A]/30 border border-[#78422A] rounded-sm text-center text-xs text-amber-200">
                ✨ Extraction complete! Enjoy your freshly brewed {selectedMethod.name}.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
