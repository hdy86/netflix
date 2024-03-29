const API_KEY = "7b0c307b81c2a30e2f4c13922ecf0649";
const BASE_PATH = "https://api.themoviedb.org/3";

export const POPULAR = "popular";
export const TOPRATED = "topRated";
export const NOWPLAYING = "nowPlaying";
export const UPCOMING = "upComing";
export const AIRTODAY = "airToday";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };

  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

// movie
export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}
export function getNowMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}
export function getTopMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}
export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}

// tv program
export function getPopularTv() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}
export function getAirTodayTv() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}
export function getTopTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((response) => response.json());
}

// search
export function searchMulti(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=en-US&page=1&region=krR&query=${keyword}`
  ).then((response) => response.json());
}
export function searchMovies(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&page=1&region=krR&query=${keyword}`
  ).then((response) => response.json());
}
export function searchTv(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&page=1&region=krR&query=${keyword}`
  ).then((response) => response.json());
}
