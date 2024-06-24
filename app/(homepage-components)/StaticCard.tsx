import Image from "next/image";
import React from "react";

interface StaticCardProps {
  imageUrl: string;
  imageDescription: string;
  title: string;
  description: string;
}

const StaticCard = ({
  imageUrl,
  imageDescription,
  title,
  description,
}: StaticCardProps) => {
  return (
    <div className="flex flex-col items-center self-stretch justify-start w-auto sm:w-[384px] py-8 px-6 gap-5 bg-card-gradient rounded-2xl">
      <Image
        src={imageUrl}
        alt={title}
        width={336}
        height={191}
        className="w-full m-w-full"
      />
      <p className="font-bold text-base text-[#78a6b8] uppercase">
        {imageDescription}
      </p>
      <h2 className="text-2xl font-extrabold text-center">{title}</h2>
      <p className="text-sm font-normal text-center text-[#b9bdcc]">
        {description}
      </p>
    </div>
  );
};

export default StaticCard;
