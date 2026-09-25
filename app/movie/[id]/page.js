"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieCard } from "@/app/components/MovieCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8`,
  },
};

export default function Page() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const params = useParams();
  const movieId = params.id;
  const router = useRouter();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options,
      );
      const data = await res.json();
      setMovie(data);
    };

    const fetchVideos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options,
      );
      const data = await res.json();
      const trailer = data.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube",
      );
      setTrailerKey(trailer?.key ?? null);
    };

    const fetchCredits = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options,
      );
      const data = await res.json();
      setCast(data.cast.slice(0, 8));
      setCrew(data.crew);
    };

    const fetchSimilar = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
        options,
      );
      const data = await res.json();
      setSimilar(data.results.slice(0, 6));
    };

    fetchMovie();
    fetchVideos();
    fetchCredits();
    fetchSimilar();
  }, [movieId]);

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  if (!movie) return <div className="p-10 text-black">Loading...</div>;

  return (
    <div className="w-full text-black px-10 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg w-64 h-auto"
          />
        )}

        <div className="flex flex-col gap-4">
          {movie.tagline && (
            <p className="italic text-gray-600">{movie.tagline}</p>
          )}

          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-700">
            <span>{movie.release_date}</span>
            <span>· {formatRuntime(movie.runtime)}</span>
            <span>· {movie.adult ? "R" : "PG"}</span>
          </div>

          <div className="text-lg font-semibold">
            ⭐ {movie.vote_average?.toFixed(1)} / 10 ({movie.vote_count} votes)
          </div>

          {movie.genres?.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-800 max-w-xl">{movie.overview}</p>

          <div className="text-sm text-gray-600 space-y-1">
            {crew.length > 0 && (
              <>
                <p>
                  <strong>Director:</strong>{" "}
                  {crew.find((c) => c.job === "Director")?.name}
                </p>
                <p>
                  <strong>Writers:</strong>{" "}
                  {crew
                    .filter((c) => c.job === "Writer")
                    .map((w) => w.name)
                    .join(" · ")}
                </p>
              </>
            )}
            {cast.length > 0 && (
              <p>
                <strong>Stars:</strong>{" "}
                {cast
                  .slice(0, 3)
                  .map((actor) => actor.name)
                  .join(" · ")}
              </p>
            )}
          </div>

          {trailerKey && (
            <Button onClick={() => setShowTrailer(true)} className="w-fit">
              Play Trailer
            </Button>
          )}
        </div>
      </div>

      {showTrailer && trailerKey && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowTrailer(false)}>
          <div
            className="w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {similar.length > 0 && (
        <div className="mt-12">
          <h1 className="text-2xl font-semibold mb-5 flex flex-wrap">
            More like this<Link href="/similarmovies">See more -</Link>
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {similar.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  router.push(`/movie/${movie.id}`);
                  window.scrollTo(0, 0);
                }}>
                <MovieCard {...movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
