import { request } from "@/lib/requests";

export const staticCards = [
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

export const listContainers = [
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

export const discoverList = [
  {
    id: 0,
    title: "Najnoviji filmovi",
    requestType: request.latestMovies,
    lastElemement: -1,
  },
  {
    id: 1,
    title: "Top 3 najbolje ocijenjeni filmovi",
    requestType: request.topRatedMovies,
    lastElemement: 3,
  },

  {
    id: 2,
    title: "Top 10 u 🇭🇷 danas",
    requestType: request.popularMovies,
    showRankingNumber: true,
    lastElemement: 10,
  },
  {
    id: 3,
    title: "Akcija",
    requestType: request.actionMovies,
    lastElemement: -1,
  },
  {
    id: 4,
    title: "Drama",
    requestType: request.dramaMovies,
    lastElemement: -1,
  },
  {
    id: 5,
    title: "Glazba u filmu",
    requestType: request.musicMovies,
    lastElemement: -1,
  },
];
