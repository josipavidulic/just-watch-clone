import Image from "next/image";
import Link from "next/link";

const streamingServices = [
  {
    id: 0,
    href: "/",
    name: "netflix",
    image: "/netflix-logo.png",
  },
  {
    id: 1,
    href: "/",
    name: "primevideo",
    image: "/primevideo-logo.jpg",
  },
  {
    id: 2,
    href: "/",
    name: "ivi",
    image: "/ivi-logo.png",
  },
  {
    id: 3,
    href: "/",
    name: "googleplay",
    image: "/googleplay-logo.jpeg",
  },
  {
    id: 4,
    href: "/",
    name: "flixole",
    image: "/flixole-logo.png",
  },
  {
    id: 5,
    href: "/",
    name: "mubi",
    image: "/mubi-logo.png",
  },
  {
    id: 6,
    href: "/",
    name: "zee5",
    image: "/zee5-logo.jpeg",
  },
  {
    id: 7,
    href: "/",
    name: "guidedoc",
    image: "/guidedoc-logo.png",
  },
  {
    id: 8,
    href: "/",
    name: "iwtfc",
    image: "/iwtfc-logo.png",
  },
  {
    id: 9,
    href: "/",
    name: "curiositystream",
    image: "/curiositystream-logo.png",
  },
  {
    id: 10,
    href: "/",
    name: "sunnxt",
    image: "/sunnxt-logo.png",
  },
  {
    id: 11,
    href: "/",
    name: "spamflix",
    image: "/spamflix-logo.png",
  },
  {
    id: 12,
    href: "/",
    name: "docsville",
    image: "/docsville-logo.webp",
  },
];

export default function Home() {
  return (
    <main className="w-full flex h-[750px] flex-col items-center justify-end gap-10 text-center bg-[url(/hero-image.png)] bg-cover ">
      <h1 className="leasing-[48px] sm:leading-[58px] lg:leading-[70px] text-4xl sm:text-5xl lg:text-6xl w-[90%] lg:w-2/3 2xl:w-1/2 font-bold lg:font-black  text-[#fff] z-10">
        Vaš vodič za streaming filmovi, TV serije i sport
      </h1>
      <p className="hidden sm:block w-[90%] sm:w-[80%] text-xl text-[#999c9f] z-10">
        Uz JustWatch pronađite gdje streamati nove, popularne i nadolayeće
        sadržaje.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 z-10">
        <button className="rounded-lg text-base font-bold bg-[#fbc500] hover:bg-[#ddad00] text-[#000] py-4 px-10 sm:px-16">
          Otkrijte filmove i serije
        </button>
        <button className="rounded-lg text-base font-bold border-2 border-[#999c9f] bg-transparent hover:bg-[#9c9f99] hover:bg-opacity-10 text-[#999c9f] py-4 px-10 sm:px-16">
          Značajke
        </button>
      </div>
      <div className="absolute w-full h-full bg-custom-gradient"></div>
      <div className="flex flex-col justify-center items-center gap-4 z-10 mt-16">
        <p className="text-[#657182] font-normal text-base">
          Streaming servisi na JustWatchu
        </p>
        <div className="flex justify-center items-center gap-3 sm:gap-5 px-2 sm:px-4 flex-wrap">
          {streamingServices.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${item.id >= 4 && "hidden lg:block"}`}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-lg w-12 h-12"
              />
            </Link>
          ))}
          <Link href="/">
            <button className="outline-none border-0 h-12 px-3 rounded-lg bg-[#10161d] text-[#657182] font-bold text-sm">
              POGLEDAJTE SVE
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
