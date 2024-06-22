"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/components/Card";
import { ResponseData, TMDbResponse } from "@/types/types";
import { getData } from "@/app/actions";
import { apiKey } from "@/lib/requests";

const MovieList = () => {
  const [movies, setMovies] = useState<ResponseData[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

  const loadMovies = useCallback(async () => {
    const data = await getData<TMDbResponse>(url);
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
  }, [url]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const lastMovieElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4 overflow-y-scroll scrollbar-hide mx-auto justify-start">
      {movies.map((movie, index) => (
        <div
          key={index}
          ref={index === movies.length - 1 ? lastMovieElementRef : null}
        >
          <Card card={movie} hasFavoriteIcon={true} className="w-auto h-auto" />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
