import GlobalLargeSpotlight from "@/components/home-page/GlobalLargeSpotlight";
import HeroSection from "@/components/home-page/HeroSection";
import StaticCard from "@/components/home-page/StaticCard";
import { getData } from "./actions";

import { request } from "@/lib/requests";
import HomePageListContainer from "@/components/home-page/HomePageListContainer";
import Footer from "@/components/home-page/HomePageFooter";

const staticCards = [
  {
    id: 0,
    imageUrl: "/static-card-image-1.png",
    imageDescription: "sve na jednom mjestu",
    title: "Vaš potpuni vodič za streaming",
    description:
      "Dobijte osobne preporuke za svoje omiljene platforme za streaming. Pokazat ćemo vam gdje možete pogledati filmove, serije i sport.",
  },
  {
    id: 1,
    imageUrl: "/static-card-image-2.png",
    imageDescription: "Sve na jednom mjestu",
    title: "Sve platforme u jednom pretraživanju",
    description:
      "Ne morate se više prebacivati s jedne platforme na drugu kako biste vidjeli jesu li film ili serija dostupni. Naša funkcionalnost jedinstvenog pretraživanja rješava taj problem.",
  },
  {
    id: 2,
    imageUrl: "/static-card-image-3.png",
    imageDescription: "Jedinstvena moja lista",
    title: "Spojite sve svoje liste",
    description:
      "Napravite jedinstvenu listu sa svakim filmom i serijom koje želite gledati: jednom listom pokrijte sve platforme za streaming na svim svojim uređajima..",
  },
];

const listContainers = [
  {
    rowId: 0,
    title: "Top 10 filmova ovog tjedna",
    description:
      "Otkrijte najgledanije filmove ovog tjedna i doznajte gdje ih možete gledati.",
    showRankingNumber: true,
    requestType: request.trendingMovies,
  },
  {
    rowId: 1,
    title: "Top 10 serija ovog tjedna",
    description:
      "Istražite najgledanije serije ovog tjedna i doznajte gdje ih možete streamati.",
    showRankingNumber: true,
    requestType: request.trendingTVShows,
  },

  {
    rowId: 2,
    title: "Novi filmovi",
    description:
      "Pogledajte koji su sve novi filmovi nedavno postali dostupni na platformama za streaming",
    showRankingNumber: false,
    requestType: request.latestMovies,
    seeMoreDescriptionButton: "Pogledajte sve nove filmove",
    className: "mt-20",
  },
  {
    rowId: 3,
    title: "Nove serije",
    description:
      "Pogledajte svaku novu TV seriju koja je nedavno postala dostupna na streaming servisima.",
    showRankingNumber: false,
    requestType: request.latestTVShows,
    seeMoreDescriptionButton: "Pogledajte sve nove TV serije",
    className: "mt-20",
  },
  {
    rowId: 4,
    title: "Najgledaniji filmovi",
    description:
      "Otkrijte koji su filmovi u ovom trenutku najgledaniji i doznajte gdje ih možete gledati.",
    showRankingNumber: false,
    requestType: request.popularMovies,
    seeMoreDescriptionButton: "Pogledajte sve najgledanije filmove",
    className: "mt-20",
  },
  {
    rowId: 5,
    title: "Najgledanije serije",
    description:
      "Otkrijte koje su serije u ovom trenutku najgledanije i doznajte gdje ih možete streamati.",
    showRankingNumber: false,
    requestType: request.popularTVShows,
    seeMoreDescriptionButton: "Pogledajte sve najgledanije TV serije",
    className: "mt-20",
  },
];

export default async function Home() {
  const slides = await getData(request.trendingAll);

  return (
    <main className="relative w-full h-full flex flex-col gap-8 justify-center items-center z-0 bg-black font-lato mb-12">
      <HeroSection />
      <span className="sticky top-0 w-full h-[108px] lg:h-[86px] bg-black z-50"></span>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-auto lg:w-[80%] max-sm:px-6">
        {staticCards.map((item) => (
          <StaticCard
            key={item.id}
            imageDescription={item.imageDescription}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <h2 className="w-[80%] sm:w-[60%] text-3xl sm:text-5xl font-black mt-8 text-start self-start pl-[6%]">
        Pretražite nove, popularne i nadolazeće filmove i serije
      </h2>
      {listContainers.slice(0, 2).map((container) => (
        <HomePageListContainer
          title={container.title}
          description={container.description}
          showRankingNumber={container.showRankingNumber}
          requestType={container.requestType}
          key={container.rowId}
        />
      ))}
      <GlobalLargeSpotlight slides={slides.slice(10)} />
      {listContainers.slice(2).map((container) => (
        <HomePageListContainer
          title={container.title}
          description={container.description}
          showRankingNumber={container.showRankingNumber}
          requestType={container.requestType}
          key={container.rowId}
          seeMoreDescriptionButton={container.seeMoreDescriptionButton}
          className={container.className}
        />
      ))}
      <Footer />
    </main>
  );
}
