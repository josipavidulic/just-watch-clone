"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/app/(components)/Card";
import { ResponseData } from "@/types/types";
import { useFilter } from "@/context/FilterContext";
import { buildUrl } from "@/lib/buildFilterUrl";
import Image from "next/image";
import { fetchFilteredData } from "@/lib/fetchFilteredData";

const MovieList = () => {
  const { filters } = useFilter();
  const observer = useRef<IntersectionObserver | null>(null);
  const [movies, setMovies] = useState<ResponseData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMovies = useCallback(
    async (newPage: number) => {
      try {
        setLoading(true);
        const url = buildUrl(filters, newPage);

        const data = await fetchFilteredData(url);

        if (data) {
          setMovies((prevMovies) =>
            newPage === 1 ? data : [...prevMovies, ...data]
          );
        }
      } catch (error) {
        console.log(error);
        console.error("Error loading movies:", error);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  useEffect(() => {
    setMovies([]);
    setPage(1);
    loadMovies(1);
  }, [filters, loadMovies]);

  useEffect(() => {
    if (page !== 1) {
      loadMovies(page);
    }
  }, [page, loadMovies]);

  const lastMovieElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  if (loading && movies.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center mt-64">
        <div className="w-10 h-10 border-4 border-[#fff] border-opacity-50 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!loading && movies.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center mt-64">
        <Image src="/no-movies.svg" alt="no-movies" width={150} height={150} />
        <h2 className="text-[#fff] text-xl font-semibold">
          Nije pronađen film za ove filtere
        </h2>
      </div>
    );
  }

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
