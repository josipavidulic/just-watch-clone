import Image from "next/image";
import React from "react";

interface BannerImageProps {
  alt: string;
  backdrop: string;
}

const BannerImage = ({ alt, backdrop }: BannerImageProps) => {
  return (
    <>
      <div className="hidden sm:block h-[450px] w-full overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/original/${backdrop}`}
          alt={alt}
          width={500}
          height={750}
          layout="responsive"
        />
      </div>
      <div className="absolute w-full h-[450px] bg-blue-gradient"></div>
    </>
  );
};

export default BannerImage;
