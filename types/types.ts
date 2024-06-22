export type LinkButton = {
  id: number;
  name: string;
  href?: string;
  imageUrl?: string;
};

export interface ResponseData {
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
  runtime?: number;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  credits?: {
    cast: Cast[];
  };
}

export interface TMDbResponse {
  page: number;
  results: ResponseData[];
  total_pages: number;
  total_results: number;
}

export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
