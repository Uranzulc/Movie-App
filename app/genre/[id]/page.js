"use client";
import { use, useEffect, useState } from "react";
import MovieList from "@/app/components/MovieList";
import { MovieCard } from "../../components/MovieCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Page({ params }) {
  const { id } = use(params);
  const genres = {
    28: "Action",
    35: "Comedy",
    18: "Drama",
    27: "Horror",
    10749: "Romance",
  };
  const name = genres[id] || "Unknown";
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const endpoint = `/discover/movie?language=en&with_genres=${id}`;

  useEffect(() => {
    const getGenre = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
          },
        },
      );
      const data = await response.json();

      setMovies(data.result);

      setTotalPages(Math.min(data.total_pages, 500));
    };
    getGenre();
  }, [id, page]);

  return (
    <div className="flex flex-nowrap">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <MovieList key={id} title={`${name} Movies`} endpoint={endpoint} />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="transition-transform duration-200 hover:scale-105 cursor-pointer"
              onClick={() => router.push(`/movie/${movie.id}`)}>
              <MovieCard {...movie} />
            </div>
          ))}
        </div>
        <div className="p-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                />
              </PaginationItem>

              {[...Array(3)].map((_, i) => {
                const pageNumber = i + page;
                if (pageNumber <= totalPages) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={pageNumber === page}
                        onClick={() => setPage(pageNumber)}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Genres</Button>
          </DropdownMenuTrigg er>

          <DropdownMenuContent className="w-56 p-2 grid grid-cols-2 gap-2">
            {genres.map((genre) => (
              <DropdownMenuItem
                key={genre.id}
                className="p-0 focus:bg-transparent"
                onClick={() => router.push(`/genre/${genre.id}`)}>
                <Badge
                  variant="secondary"
                  className="w-full justify-between cursor-pointer">
                  {genre.name}
                  <span className="ml-2">→</span>
                </Badge>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
}
