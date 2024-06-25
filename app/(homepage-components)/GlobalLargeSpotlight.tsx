"use client";
import { formatVoteCount } from "@/lib/formatVoteCount";
import { handleDetailsPage } from "@/lib/handleDetailsPage";
import { ResponseData } from "@/types/types";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface GlobalLargeSpotlightProps {
  slides: ResponseData[];
}

const GlobalLargeSpotlight = ({ slides }: GlobalLargeSpotlightProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleItemClick = (slide: ResponseData, e: React.MouseEvent) => {
    const url = handleDetailsPage(slide, e);
    router.push(url);
  };

  return (
    <div className="group relative w-[85%] mx-auto overflow-hidden rounded-3xl mt-16">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const title = (slide.original_title as string) ?? slide.original_name;

          return (
            <div
              key={index}
              className="w-full h-auto flex flex-shrink-0 bg-cover"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${slide.backdrop_path})`,
              }}
            >
              <div className="inset-0 bg-black bg-opacity-80 w-full flex flex-col sm:flex-row items-center justify-start py-10 sm:p-20 gap-8">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${slide.poster_path}`}
                  alt={slide.overview}
                  width={190}
                  height={270}
                  className="inline-block w-[190px] h-[270px] rounded-md"
                />

                <div className="flex flex-col max-sm:items-center justify-around w-[75%] gap-3 text-[#c6c8cd]">
                  <h2 className="text-2xl font-black ">
                    {(slide.title as string) ?? slide.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/imdb-logo.jpg"
                      alt="imdb-logo"
                      width={16}
                      height={16}
                      className="rounded-sm"
                    />
                    <p className="text-lg">
                      {slide.vote_average.toFixed(1)} (
                      {formatVoteCount(slide.vote_count)})
                    </p>
                  </div>
                  <p className="text-[#8a8d98] text-base font-normal">
                    {slide.overview.length > 150
                      ? `${slide.overview.slice(0, 150)}...`
                      : slide.overview}
                  </p>

                  <button
                    onClick={(e) => handleItemClick(slide, e)}
                    className="px-5 py-2.5 w-fit bg-[#fbc500] hover:bg-[#ddad00] text-black rounded-sm flex items-center gap-1 justify-center"
                  >
                    <Info className="w-5 h-5 fill-black text-[#fbc500]" />
                    Više informacija
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide
                ? "bg-[#fbc500]"
                : "bg-[#cccccc] bg-opacity-50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-1/2 left-0 transform -translate-y-1/2 p-2"
      >
        <ChevronLeft className="w-12 h-12 text-[#c6c8cd]" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 right-0 transform -translate-y-1/2 p-2"
      >
        <ChevronRight className="w-12 h-12 text-[#c6c8cd]" />
      </button>
    </div>
  );
};

export default GlobalLargeSpotlight;
