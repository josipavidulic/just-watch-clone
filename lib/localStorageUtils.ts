import { ResponseData } from "@/types/types";

const STORAGE_KEY = "favoriteMovies";

export const getFavoriteMovies = (): ResponseData[] => {
  try {
    const favoriteMoviesString = localStorage.getItem(STORAGE_KEY);
    if (favoriteMoviesString) {
      return JSON.parse(favoriteMoviesString);
    }
    return [];
  } catch (error) {
    console.error("Error retrieving favorite Movies from localStorage:", error);
    return [];
  }
};

export const addFavoriteMovie = (movie: ResponseData) => {
  try {
    const favoriteMovies = getFavoriteMovies();
    if (!favoriteMovies.some((favMovie) => favMovie.id === movie.id)) {
      favoriteMovies.push(movie);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteMovies));
    }
  } catch (error) {
    console.error("Error adding favorite movies to localStorage:", error);
  }
};

export const removeFavoriteMovie = (movie: ResponseData) => {
  try {
    const favoriteMovies = getFavoriteMovies();
    const updatedFavoriteMovies = favoriteMovies.filter(
      (favMovie) => favMovie.id !== movie.id
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavoriteMovies));
  } catch (error) {
    console.error("Error removing favorite movie from localStorage:", error);
  }
};
