"use client";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
  getFavoriteMovies,
} from "@/lib/localStorageUtils";
import { ResponseData } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

interface FavoriteContextProps {
  favoriteMovies: ResponseData[];
  addFavoriteMovie: (movie: ResponseData) => void;
  removeFavoriteMovie: (movie: ResponseData) => void;
}

export const FavoriteContext = createContext<FavoriteContextProps | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<ResponseData[]>([]);

  useEffect(() => {
    const storedFavoriteMovies = getFavoriteMovies();
    setFavoriteMovies(storedFavoriteMovies);
  }, []);

  const handleAddFavoriteMovie = (movie: ResponseData) => {
    if (!favoriteMovies.some((favMovie) => favMovie.id === movie.id)) {
      addFavoriteMovie(movie);
      setFavoriteMovies((prevMovies) => [...prevMovies, movie]);
    }
  };

  const handleRemoveFavoriteMovie = (movie: ResponseData) => {
    if (favoriteMovies.some((favMovie) => favMovie.id === movie.id)) {
      removeFavoriteMovie(movie);
      setFavoriteMovies((prevMovies) =>
        prevMovies.filter((favMovie) => favMovie.id !== movie.id)
      );
    }
  };

  const contextValue: FavoriteContextProps = {
    favoriteMovies,
    addFavoriteMovie: handleAddFavoriteMovie,
    removeFavoriteMovie: handleRemoveFavoriteMovie,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
