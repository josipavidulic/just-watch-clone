import HeroPage from "@/components/HeroPage";
import StaticCard from "@/components/StaticCard";

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

export default function Home() {
  return (
    <main className="relative w-full h-full flex flex-col justify-center items-center z-0 bg-black ">
      <HeroPage />
      <span className="sticky top-0 w-full h-[106px] lg:h-[86px] bg-black z-50"></span>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-auto lg:w-[80%] mt-[25px] max-sm:px-6">
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
    </main>
  );
}
