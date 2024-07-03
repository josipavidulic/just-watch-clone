import { getData } from "./actions";
import { request } from "@/lib/requests";
import { TMDbResponse } from "@/types/types";
import HeroSection from "./(homepage-components)/HeroSection";
import StaticCard from "./(homepage-components)/StaticCard";
import HomePageListContainer from "./(homepage-components)/HomePageListContainer";
import GlobalLargeSpotlight from "./(homepage-components)/GlobalLargeSpotlight";
import Footer from "./(homepage-components)/HomePageFooter";
import { listContainers, staticCards } from "@/types/staticData";

export default async function Home() {
  const data = await getData<TMDbResponse>(request.trendingAll);

  return (
    <main className="relative w-full h-full flex flex-col gap-8 justify-center items-center z-0 bg-black font-lato pb-12">
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
      <GlobalLargeSpotlight slides={data.results.slice(0, 10)} />
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
