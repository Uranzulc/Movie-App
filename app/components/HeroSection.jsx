"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getNowPlaying = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
          },
        },
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 5));
    };
    getNowPlaying();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [movies]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div
      className="relative w-full h-250 text-white transition-all duration-1000 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
      }}>
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative max-w-3xl px-30 py-50">
        <h2 className="text-2xl font-semibold mb-2">Now Playing:</h2>
        <h1 className="text-5xl font-bold mb-4">{currentMovie.title}</h1>
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-2xl">⭐</span>
          <span className="ml-2 text-lg">{currentMovie.vote_average}/10</span>
        </div>
        <p className="text-lg mb-6 line-clamp-4 w-100">
          {currentMovie.overview}
        </p>
        <button
          onClick={() => router.push(`/movie/${currentMovie.id}`)}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md font-semibold shadow-lg">
          🎬 Watch Trailer
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4= rounded-full ${
              index === currentIndex ? "bg-red-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
