"use client";

import { useFavorites } from "@/context/FavoriteContext";
import { kebabCase } from "@/lib/kebabCase";
import { cn } from "@/lib/utils";
import { ResponseData } from "@/types/types";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface CardProps {
  card: ResponseData;
  hasFavoriteIcon?: boolean;
  className?: string;
  clickable?: boolean;
}

const Card = ({
  card,
  hasFavoriteIcon,
  className,
  clickable = true,
}: CardProps) => {
  const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
    useFavorites();
  const router = useRouter();
  const title = (card.original_title as string) ?? card.original_name;

  const handleFavoriteMovie = (movie: ResponseData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!favoriteMovies.some((favMovie) => favMovie.id === movie.id)) {
      addFavoriteMovie(movie);
    } else {
      removeFavoriteMovie(movie);
    }
  };

  const handleDetails = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (card.original_title) {
      localStorage.setItem("movieId", id.toString());
      router.push(`/movie/${kebabCase(title)}`);
    }
  };

  return (
    <div
      onClick={clickable ? (e) => handleDetails(card.id, e) : () => {}}
      className={cn(
        "relative flex bg-[#0a151f] overflow-hidden outline-none text-[#78a6b8] cursor-pointer",
        className
      )}
    >
      {hasFavoriteIcon && (
        <Bookmark
          onClick={(e) => handleFavoriteMovie(card, e)}
          className={cn(
            `absolute top-[-6px] m-2 mt-0 w-10 h-10 fill-[#fff] text-[#fff] opacity-40 hover:opacity-80 cursor-pointer`,
            favoriteMovies.some((favMovie) => favMovie.id === card.id) &&
              "opacity-100 hover:opacity-100"
          )}
        />
      )}
      <Image
        src={`https://image.tmdb.org/t/p/original/${card?.poster_path}`}
        alt={(card.original_title as string) ?? card.original_name}
        width={190}
        height={270}
        className={cn("block w-full h-[270px] rounded-md", className)}
      />
    </div>
  );
};

export default Card;
