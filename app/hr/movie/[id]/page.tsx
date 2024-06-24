"use client";

import { getData } from "@/app/actions";
import CastList from "@/app/hr/movie/[id]/_components/Cast";
import InformationCard from "@/app/hr/movie/[id]/_components/InformationCard";
import Skeleteon from "@/app/hr/movie/[id]/_components/Skeleteon";
import { convertMinutesToHoursAndMinutes } from "@/lib/convertMinutesToHourAndMinutes";
import { formatVoteCount } from "@/lib/formatVoteCount";
import { apiKey } from "@/lib/requests";
import { ResponseData } from "@/types/types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import BannerImage from "./_components/BannerImage";
import Card from "@/app/(components)/Card";
import { getCroatianGenres } from "@/lib/getCroatianGenres";

const Page: React.FC = () => {
  const [movieId, setMovieId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = Number(localStorage.getItem("movieId"));
      if (!isNaN(id)) {
        setMovieId(id);
      }
    }
  }, []);

  const {
    data: movieDetails,
    error,
    isLoading,
  } = useSWR<ResponseData>(
    movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits&language=hr-HR`
      : null,
    getData<ResponseData>
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading || !movieDetails) return <Skeleteon />;

  const informationData = [
    {
      title: "ocjena",
      hasIcon: true,
      content: `${movieDetails.vote_average.toFixed(1)} (${formatVoteCount(
        movieDetails.vote_count
      )})`,
    },
    {
      title: "žanrovi",
      content: getCroatianGenres(movieDetails.genres).join(", "),
    },
    {
      title: "trajanje",
      content: convertMinutesToHoursAndMinutes(movieDetails.runtime ?? 0),
    },
    {
      title: "zemlja proizvodnje",
      content: movieDetails.production_countries
        .map((country) => country.name)
        .join(", "),
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#060d17] border-2 border-[#060d17] flex flex-col font-lato pb-9">
      <BannerImage
        alt={movieDetails.title ?? "Movie Banner"}
        backdrop={movieDetails.backdrop_path}
      />
      <div className="z-10 flex flex-col rounded-2xl p-6 gap-8 w-full max-w-[1170px] bg-[#060d17] sm:-mt-20 mx-auto">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <Card
            hasFavoriteIcon={true}
            card={movieDetails}
            className=" w-[350px] lg:w-[500px] h-[500px]"
          />
          <div className=" flex flex-col gap-12 w-full">
            <div className="flex flex-col gap-1 text-[#b9bdcc] text-xl max-md:self-center">
              <h2 className="text-[28px] font-semibold text-[#fff] flex">
                {movieDetails.title}
                <p className="text-[#b9bdcc] text-xl font-thin whitespace-pre">
                  {` (${movieDetails.release_date?.split("-")[0]})`}
                </p>
              </h2>
              <p>{`Izvorni naziv: ${movieDetails.original_title}`}</p>
            </div>
            <InformationCard title="opis" content={movieDetails.overview} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 whitespace-pre-wrap">
              {informationData.map((data, index) => (
                <div
                  key={index}
                  className="border-t-[1px] border-[#1c252f] py-4 whitespace-pre"
                >
                  <InformationCard
                    title={data.title}
                    hasIcon={data.hasIcon}
                    content={data.content}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <InformationCard
          title="cast"
          className="w-full"
          content={<CastList castList={movieDetails.credits?.cast ?? []} />}
        />
      </div>
    </div>
  );
};

export default Page;
