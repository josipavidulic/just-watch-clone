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
  }, [value, min, max]);

  const getTooltipOffset = (value: number) => {
    const rangeInput = document.querySelectorAll(
      'input[type="range"]'
    )[0] as HTMLInputElement;
    const offset = (rangeInput.clientWidth * (value - min)) / (max - min);
    return offset;
  };

  return (
    <>
      <div className=" flex justify-between">
        <h2 className="text-md md:text-xl text-[#d5d5d5]">Release year</h2>
        <button
          className="flex items-center gap-1 py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-md hover:bg-[#5e6b76] hover:bg-opacity-10"
          onClick={handleResetButton}
        >
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
                onTouchStart={handleMouseDownMin}
                onTouchEnd={handleMouseUpMin}
                type="range"
                min={min}
                step={step}
                max={max}
                value={value.min}
                className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-auto cursor-grab"
              />
              {showTooltip.min && (
                <div
                  className="absolute -top-8 left-0 transform -translate-x-1/2 bg-[#4c5a67] text-white text-center rounded px-1"
                  style={{ left: `${getTooltipOffset(value.min)}px` }}
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
                onTouchStart={handleMouseDownMax}
                onTouchEnd={handleMouseUpMax}
                type="range"
                min={min}
                step={step}
                max={max}
                value={value.max}
                className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none cursor-grab"
              />
              {showTooltip.max && (
                <div
                  className="absolute -top-8 transform -translate-x-1/2 bg-[#4c5a67] text-white text-center rounded px-1"
                  style={{ left: `${getTooltipOffset(value.max)}px` }}
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
