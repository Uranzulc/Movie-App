"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [query, setQuery] = useState("");

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-20">
        <a
          href="/"
          className="text-xl font-bold tracking-tight text-purple-500">
          Movie Z
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Genres</Button>
          </DropdownMenuTrigger>

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
        </DropdownMenu>

        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies..."
            className="pl-8 pr-2 py-1 border rounded w-56"
            aria-label="Search movies"
          />
          <Button type="submit" variant="outline" className="ml-2">
            Search
          </Button>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
