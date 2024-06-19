export type LinkButton = {
  id: number;
  name: string;
  href?: string;
  imageUrl?: string;
};

export type ResponseData = {
  id: number;
  backdrop_path: string;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  media_type?: string;
  original_title?: string;
  title?: string;
  release_date?: string;
  video?: boolean;
  original_name?: string;
  name?: string;
  first_air_date?: string;
  origin_country?: string[];
};
