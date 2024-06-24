"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getData } from "../actions";
import { apiKey } from "@/lib/requests";
import { ResponseData, TMDbResponse } from "@/types/types";
import { useSearchParams } from "next/navigation";
import Card from "../(components)/Card";

const Page = () => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [data, setData] = useState<ResponseData[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchSearchData = useCallback(
    async (newPage: number) => {
      try {
        const data = await getData<TMDbResponse>(
          `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${apiKey}&include_adult=false&language=hr-HR&page=${page}`
        );
        if (data.results) {
          setData((prevState) =>
            newPage === 1 ? data.results : [...prevState, ...data.results]
          );
        }
      } catch (error) {
        console.error("Error loading search data:", error);
      }
    },
    [page, query]
  );

  useEffect(() => {
    setData([]);
    setPage(1);
    fetchSearchData(1);
  }, [query, fetchSearchData]);

  useEffect(() => {
    if (page !== 1) {
      fetchSearchData(page);
    }
  }, [page, fetchSearchData]);

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
    <main className="w-full max-w-[1752px] mx-auto min-h-screen h-full bg-[#060d17] flex flex-col px-4 lg:px-16 py-2 pb-18 font-lato">
      <h2 className="text-[#d9e8ed] font-bold text-2xl">
        Rezultati pretraživanja za: {query}
      </h2>
      <div className="flex flex-col">
        {data
          .filter((item) => item.media_type !== "person")
          .map((item, index) => (
            <div
              key={item.original_title ?? item.original_name}
              className="flex flex-row items-start py-4 gap-5 border-t-[0.3px] border-[#1c252f]"
              ref={index === data.length - 1 ? lastMovieElementRef : null}
            >
              <Card
                hasFavoriteIcon={true}
                card={item}
                className="w-[200px] h-auto"
              />
              <div className="flex flex-col gap-1 text-[#b9bdcc] text-xl max-md:self-center">
                <h2 className="text-[28px] font-semibold text-[#fff] flex">
                  {(item.title as string) ?? item.name}
                  <p className="text-[#b9bdcc] text-xl font-thin whitespace-pre">
                    {` (${
                      item.release_date?.split("-")[0] ??
                      item.first_air_date?.split("-")[0]
                    })`}
                  </p>
                </h2>
                <p>{`Izvorni naziv: ${
                  item.original_title ?? item.original_name
                }`}</p>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Page;
