import { useFilter } from "@/context/FilterContext";
import { X } from "lucide-react";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";

interface DualRangeSliderProps {
  min: number;
  max: number;
  step: number;
}

const DualRangeSlider = ({ min, max, step }: DualRangeSliderProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const tooltipMinRef = useRef<HTMLDivElement>(null);
  const tooltipMaxRef = useRef<HTMLDivElement>(null);
  const { filters, setFilters } = useFilter();
  const [value, setValue] = useState<{ min: number; max: number }>({
    min: filters.releaseYearFrom,
    max: filters.releaseYearUntil,
  });
  const [showTooltip, setShowTooltip] = useState<{
    min: boolean;
    max: boolean;
  }>({ min: false, max: false });

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (newValue <= value.max) {
      setValue((prevState) => ({ ...prevState, min: newValue }));
    }
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (newValue >= value.min) {
      setValue((prevState) => ({ ...prevState, max: newValue }));
    }
  };

  const handleMouseDownMin = () => {
    setShowTooltip((prevState) => ({ ...prevState, min: true }));
  };

  const handleMouseUpMin = () => {
    setShowTooltip((prevState) => ({ ...prevState, min: false }));
    setFilters((prevState) => ({
      ...prevState,
      releaseYearFrom: value.min,
    }));
  };

  const handleMouseDownMax = () => {
    setShowTooltip((prevState) => ({ ...prevState, max: true }));
  };

  const handleMouseUpMax = () => {
    setShowTooltip((prevState) => ({ ...prevState, max: false }));
    setFilters((prevState) => ({
      ...prevState,
      releaseYearUntil: value.max,
    }));
  };

  const handleResetButton = useCallback(() => {
    setValue({ min: min, max: max });
    setFilters((prevState) => ({
      ...prevState,
      releaseYearFrom: min,
      releaseYearUntil: max,
    }));
  }, [min, max, setFilters]);

  useEffect(() => {
    if (progressRef.current) {
      const progressBar = progressRef.current;
      const range = max - min;
      const minPercent = ((value.min - min) / range) * 100;
      const maxPercent = ((max - value.max) / range) * 100;
      progressBar.style.left = `${minPercent}%`;
      progressBar.style.right = `${maxPercent}%`;
    }

    if (tooltipMinRef.current) {
      const rangeInput = tooltipMinRef.current
        .previousElementSibling as HTMLInputElement;
      const offset = (rangeInput.clientWidth * (value.min - min)) / (max - min);
      tooltipMinRef.current.style.left = `calc(${offset}px)`;
    }
    if (tooltipMaxRef.current) {
      const rangeInput = tooltipMaxRef.current
        .previousElementSibling as HTMLInputElement;
      const offset = (rangeInput.clientWidth * (value.max - min)) / (max - min);
      tooltipMaxRef.current.style.left = `calc(${offset}px)`;
    }
  }, [value, min, max]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl text-[#d5d5d5]">Release year</h2>
        <button className="flex items-center gap-1" onClick={handleResetButton}>
          <X className="text-[#4c5a67] w-4 h-4" />
          <h2 className="text-sm text-[#4c5a67] uppercase font-bold">reset</h2>
        </button>
      </div>
      <div className="flex justify-center items-center gap-2 text-xs text-[#d5d5d5]">
        <span>{min}</span>
        <div className="flex flex-col w-full">
          <div className="relative h-1 rounded-md bg-[#1e2328]">
            <div
              className="absolute h-1 bg-[#4c5a67] rounded"
              ref={progressRef}
            ></div>
          </div>
          <div className="relative">
            <>
              <input
                onChange={handleMinChange}
                onMouseDown={handleMouseDownMin}
                onMouseUp={handleMouseUpMin}
                type="range"
                min={min}
                step={step}
                max={max}
                value={value.min}
                className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-auto cursor-grab"
              />
              {showTooltip.min && (
                <div
                  ref={tooltipMinRef}
                  className="absolute -top-8 left-0 transform -translate-x-1/2 bg-[#4c5a67] text-white text-center rounded px-1"
                >
                  {value.min}
                </div>
              )}
            </>
            <>
              <input
                onChange={handleMaxChange}
                onMouseDown={handleMouseDownMax}
                onMouseUp={handleMouseUpMax}
                type="range"
                min={min}
                step={step}
                max={max}
                value={value.max}
                className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none cursor-grab"
              />
              {showTooltip.max && (
                <div
                  ref={tooltipMaxRef}
                  className="absolute -top-8 transform -translate-x-1/2 bg-[#4c5a67] text-white text-center rounded px-1"
                >
                  {value.max}
                </div>
              )}
            </>
          </div>
        </div>
        <span>{max}</span>
      </div>
    </>
  );
};

export default DualRangeSlider;
