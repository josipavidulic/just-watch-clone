import { useFilter } from "@/context/FilterContext";
import { X } from "lucide-react";
import Image from "next/image";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
} from "react";

interface SingleRangeSliderProps {
  min: number;
  max: number;
  step: number;
}

const SingleRangeSlider: React.FC<SingleRangeSliderProps> = ({
  min,
  max,
  step,
}) => {
  const { filters, setFilters } = useFilter();
  const progressRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<number>(filters.rating);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setValue(value);
  };

  const handleMouseDown = () => {
    setShowTooltip(true);
  };

  const handleMouseUp = () => {
    setShowTooltip(false);
    setFilters((prevState) => ({ ...prevState, rating: value }));
  };

  const handleResetButton = () => {
    setValue(min);
    setFilters((prevState) => ({ ...prevState, rating: min }));
  };

  const handleBarClick = (e: MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickPercent = (clickX / rect.width) * 100;
      const newValue = min + (clickPercent / 100) * (max - min);
      setValue(Math.round(newValue / step) * step);
    }
  };

  useEffect(() => {
    if (progressRef.current) {
      const progressBar = progressRef.current;
      const range = max - min;
      const percent = ((value - min) / range) * 100;
      progressBar.style.right = `0%`;
      progressBar.style.left = `${percent}%`;
    }

    if (tooltipRef.current) {
      const rangeInput = tooltipRef.current
        .previousElementSibling as HTMLInputElement;
      const offset = (rangeInput.clientWidth * (value - min)) / (max - min);
      tooltipRef.current.style.left = `calc(${offset}px)`;
    }
  }, [value, min, max]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-md md:text-xl text-[#d5d5d5]">Rating</h2>
        <button
          className="flex items-center gap-1 py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-md hover:bg-[#5e6b76] hover:bg-opacity-10"
          onClick={handleResetButton}
        >
          <X className="text-[#4c5a67] w-4 h-4" />
          <h2 className="text-sm text-[#4c5a67] uppercase font-bold">reset</h2>
        </button>
      </div>
      <div className="flex justify-center items-center gap-3 text-xs text-[#d5d5d5]">
        <Image
          src="/imdb-logo.jpg"
          alt="imdb-logo"
          width={20}
          height={20}
          className="rounded-sm"
        />
        <span>{min}</span>
        <div className="flex flex-col w-full">
          <div
            className="relative h-1 rounded-md bg-[#1e2328]"
            onClick={handleBarClick}
          >
            <div
              className="absolute h-1 bg-[#4c5a67] rounded"
              ref={progressRef}
            ></div>
          </div>
          <div className="relative">
            <input
              onChange={handleChange}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              type="range"
              min={min}
              step={step}
              max={max}
              value={value}
              className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-auto cursor-grab"
            />
            {showTooltip && (
              <div
                ref={tooltipRef}
                className="absolute -top-8 left-0 transform -translate-x-1/2 bg-[#4c5a67] text-white text-center rounded px-1"
              >
                {value}
              </div>
            )}
          </div>
        </div>
        <span>{max}</span>
      </div>
    </>
  );
};

export default SingleRangeSlider;
