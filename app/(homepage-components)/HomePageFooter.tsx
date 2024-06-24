import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex flex-col bg-[#000] mt-16 gap-10 justify-center items-center mx-auto">
      <Image
        src="/justwatch-small-logo.png"
        alt="justwatch"
        width={68}
        height={68}
      />
      <h2 className="font-semibold text-4xl text-[#fff] w-[85%] lg:w-[50%] text-center">
        Otkrijte najbolje filmove i serije na svojim omiljenim platformama za
        streaming
      </h2>
      <Link
        href="/discover"
        className="rounded-lg text-base font-bold bg-[#fbc500] hover:bg-[#ddad00] text-[#000] py-4 px-10 sm:px-16 mt-8"
      >
        Otkrijte filmove i serije
      </Link>
    </div>
  );
};

export default Footer;
