"use client";

import { getData } from "@/app/actions";

import { convertMinutesToHoursAndMinutes } from "@/lib/convertMinutesToHourAndMinutes";
import { formatVoteCount } from "@/lib/formatVoteCount";
import { apiKey } from "@/lib/requests";
import { ResponseData } from "@/types/types";
import React, { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import BannerImage from "./_components/BannerImage";
import Card from "@/app/(components)/Card";
import { getCroatianGenres } from "@/lib/getCroatianGenres";
import Skeleteon from "./_components/Skeleteon";
import InformationCard from "./_components/InformationCard";
import CastList from "./_components/Cast";
import Image from "next/image";
import Link from "next/link";

const Page: React.FC = () => {
  const [detailsPageId, setDetailsPageId] = useState<{
    media_type: string;
    id: number;
  }>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedDetails = localStorage.getItem("detailsPageId");
      if (storedDetails) {
        try {
          const parsedDetails = JSON.parse(storedDetails);
          if (parsedDetails.media_type && parsedDetails.id) {
            setDetailsPageId(parsedDetails);
          }
        } catch (error) {
          console.error("error parsing detailsPageId from localStorage", error);
        }
      }
    }
  }, []);

  const {
    data: movieDetails,
    error,
    isLoading,
  } = useSWR<ResponseData>(
    detailsPageId
      ? `https://api.themoviedb.org/3/${detailsPageId.media_type}/${detailsPageId.id}?api_key=${apiKey}&append_to_response=credits%2Cgenres&language=hr-HR`
      : null,
    getData<ResponseData>
  );

  if (error || (!isLoading && !movieDetails))
    return (
      <div className="relative w-full h-full justify-center items-center gap-6 mt-16 sm:mt-64 bg-[#060d17] border-2 border-[#060d17] flex flex-col font-lato">
        <Image src="/no-movies.svg" alt="no-movies" width={150} height={150} />
        <h2 className="text-[#fff] text-xl font-semibold">
          Greška pri učitavanju ovog sadržaja
        </h2>
        <Link
          href="/discover"
          className="rounded-lg text-base font-bold  bg-[#fbc500] hover:bg-[#ddad00] text-[#000] py-4 px-10 sm:px-16"
        >
          Vrati se na početnu stranicu
        </Link>
      </div>
    );
  if (isLoading && !movieDetails) return <Skeleteon />;

  const informationData = [
    {
      title: "ocjena",
      hasIcon: true,
      content: `${movieDetails?.vote_average.toFixed(1)} (${formatVoteCount(
        movieDetails?.vote_count as number
      )})`,
    },
    {
      title: "žanrovi",
      content: getCroatianGenres(
        movieDetails?.genres as { id: number; name: string }[],
        movieDetails?.media_type as string
      ).join(", "),
    },
    {
      title: "trajanje",
      content: convertMinutesToHoursAndMinutes(
        movieDetails?.runtime ??
          (movieDetails?.last_episode_to_air.runtime as number)
      ),
    },
    {
      title: "zemlja proizvodnje",
      content:
        movieDetails?.production_countries
          .map((country) => country.name)
          .join(", ") ?? movieDetails?.origin_country?.join(", "),
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#060d17] border-2 border-[#060d17] flex flex-col font-lato pb-9">
      <BannerImage
        alt={(movieDetails?.title as string) ?? movieDetails?.name}
        backdrop={movieDetails?.backdrop_path as string}
      />
      <div className="z-10 flex flex-col rounded-2xl p-6 gap-8 w-full max-w-[1170px] bg-[#060d17] sm:-mt-20 mx-auto">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <Card
            hasFavoriteIcon={true}
            card={movieDetails as ResponseData}
            clickable={false}
            className=" w-[350px] lg:w-[500px] h-[500px]"
          />
          <div className=" flex flex-col gap-12 w-full">
            <div className="flex flex-col gap-1 text-[#b9bdcc] text-xl max-md:self-center">
              <h2 className="text-[28px] font-semibold text-[#fff] flex items-center">
                {movieDetails?.title ?? movieDetails?.name}
                <p className="text-[#b9bdcc] text-xl font-thin whitespace-pre">
                  {` (${
                    movieDetails?.release_date?.split("-")[0] ??
                    movieDetails?.first_air_date?.split("-")[0]
                  })`}
                </p>
              </h2>
              <p>{`Izvorni naziv: ${
                movieDetails?.original_title ?? movieDetails?.original_name
              }`}</p>
            </div>
            <InformationCard title="opis" content={movieDetails?.overview} />
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
          content={<CastList castList={movieDetails?.credits?.cast ?? []} />}
        />
      </div>
    </div>
  );
};

export default Page;
