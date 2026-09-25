"use client";
import HeroSection from "./components/HeroSection";
import { MovieCard } from "./components/MovieCard";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + ACCESS_TOKEN,
  },
};

export default function Home() {
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const fetchMovies = async (url, setter) => {
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setter(data.results.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      setPopularMovies,
    );
    fetchMovies(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      setTopRatedMovies,
    );
    fetchMovies(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      setUpcomingMovies,
    );
    fetchMovies(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      setNowPlayingMovies,
    );
  }, []);

  return (
    <div>
      <div className="bg-black min-h-screen">
        <HeroSection />
      </div>

      <Section
        title="Popular"
        link="/popular"
        movies={popularMovies}
        router={router}
      />
      <Section
        title="Top Rated"
        link="/top_rated"
        movies={topRatedMovies}
        router={router}
      />
      <Section
        title="Upcoming"
        link="/upcoming"
        movies={upcomingMovies}
        router={router}
      />
      <Section
        title="Now Playing"
        link="/nowplaying"
        movies={nowPlayingMovies}
        router={router}
      />
    </div>
  );
}

function Section({ title, link, movies, router }) {
  return (
    <>
      <div className="flex justify-between px-10 pt-8 pb-2">
        <div className="text-2xl md:text-3xl font-bold tracking-tight pb-2">
          {title}
        </div>
        <Link href={link}>See more -</Link>
      </div>
      <div className="grid grid-cols-5 gap-4 px-10 flex flex-wrap">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => router.push(`/movie/${movie.id}`)}>
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </>
  );
}
