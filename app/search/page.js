"use client";

import { useRouter, useSearchParams } from "next/navigation";
import MovieList from "../components/MovieList";
import { useState } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [movies] = useState([]);
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-10 sm:py-14">
      {query ? (
        <MovieList
          query={query}
          title={`Results for "${query}"`}
          endpoint={`/search/movie?query=${encodeURIComponent(query)}`}
        />
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Search
          </h1>
          <p className="text-sm text-muted-foreground">
            Type a movie title in the search box above to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
