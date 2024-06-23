"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Card from "@/components/Card";
import { ResponseData, TMDbResponse } from "@/types/types";
import { getData } from "@/app/actions";
import { useFilter } from "@/context/FilterContext";
import { buildUrl } from "@/lib/buildFilterUrl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { updateQueryParams } from "@/lib/updateQueryParams";

const MovieList = () => {
  const { filters } = useFilter();
  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [movies, setMovies] = useState<ResponseData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    updateQueryParams(pathname, router, filters);
  }, [filters, pathname, router]);

  const loadMovies = useCallback(async () => {
    try {
      setLoading(true);
      const url = buildUrl(filters, page);
      const data = await getData<TMDbResponse>(url);
      if (data.results) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    } catch (error) {
      console.error("Error loading movies:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

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

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center mt-64">
        <div className="w-10 h-10 border-4 border-[#fff] border-opacity-50 border-t-blue-400 rounded-full animate-spin"></div>
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
