"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge"; // ✅ import shadcn badge

export const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getGenres = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8`,
            },
          },
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getGenres();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 px-6 md:px-10 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-6">
        Genres
      </h1>
      <p className="text-neutral-400 mb-8">See lists of movies by genre.</p>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-xl bg-neutral-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <Badge
              key={genre.id}
              onClick={() => router.push(`/genre/${genre.id}`)}
              className="flex items-center justify-between w-full px-4 py-3 cursor-pointer text-white bg-neutral-800 hover:bg-neutral-700 transition-colors">
              <span>{genre.name}</span>
              <span className="ml-2 text-neutral-400">→</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
