import type { Movie } from '../types/movie';
import { generateMovie, generateSequelMovie } from './movieGenerator';

function calculateDailyGrowth(reputation: number, currentBoxOffice: number): number {
  const baseGrowthRate = 0.02 + (reputation / 10) * 0.05;
  const randomFactor = 0.8 + Math.random() * 0.4;
  const dailyGrowth = currentBoxOffice * baseGrowthRate * randomFactor;
  return Math.round(dailyGrowth);
}

function updatePredictedBoxOffice(movie: Movie): number {
  if (movie.remainingDays <= 0 || movie.isReleased) {
    return movie.actualBoxOffice;
  }
  const dailyGrowthBase = 0.05 + (movie.reputation / 10) * 0.1;
  const predictedGrowth = movie.actualBoxOffice * dailyGrowthBase * movie.remainingDays;
  return Math.round(movie.actualBoxOffice + predictedGrowth);
}

export function updateMovies(movies: Movie[]): Movie[] {
  return movies.map(movie => {
    if (movie.isReleased) {
      return movie;
    }

    const remainingDays = Math.max(0, movie.remainingDays - 1);
    const isReleased = remainingDays === 0;

    if (isReleased) {
      return {
        ...movie,
        remainingDays: 0,
        isReleased: true,
        predictedBoxOffice: movie.actualBoxOffice,
      };
    }

    const dailyGrowth = calculateDailyGrowth(movie.reputation, movie.actualBoxOffice);
    const actualBoxOffice = movie.actualBoxOffice + dailyGrowth;
    const predictedBoxOffice = updatePredictedBoxOffice({
      ...movie,
      actualBoxOffice,
      remainingDays,
    });

    return {
      ...movie,
      actualBoxOffice,
      predictedBoxOffice,
      remainingDays,
      isReleased,
    };
  });
}

export function sortMoviesByBoxOffice(movies: Movie[]): Movie[] {
  return [...movies].sort((a, b) => b.actualBoxOffice - a.actualBoxOffice);
}

export function filterMovies(movies: Movie[]): Movie[] {
  const sorted = sortMoviesByBoxOffice(movies);
  
  const top10 = sorted.slice(0, 10);
  const rest = sorted.slice(10);
  
  const activeRest = rest.filter(movie => !movie.isReleased);
  
  return [...top10, ...activeRest].slice(0, 15);
}

export function maybeAddNewMovie(movies: Movie[]): Movie[] {
  const addProbability = 0.2;
  
  if (Math.random() > addProbability) {
    return movies;
  }

  const existingNames = movies.map(m => m.name);
  
  const highGrossingReleased = movies
    .filter(m => m.isReleased && m.actualBoxOffice > 8000)
    .sort((a, b) => b.actualBoxOffice - a.actualBoxOffice);

  let newMovie: Movie;
  
  if (highGrossingReleased.length > 0 && Math.random() > 0.5) {
    const original = highGrossingReleased[Math.floor(Math.random() * highGrossingReleased.length)];
    newMovie = generateSequelMovie(original, existingNames);
  } else {
    newMovie = generateMovie(existingNames);
  }

  return [...movies, newMovie];
}

export function formatBoxOffice(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(2)}万`;
  }
  return `${value.toLocaleString()}`;
}
