"use client";
import Image from "next/image";

export const MovieCard = (props) => {
  return (
    <div className="w-full aspect-[3/4] relative rounded-lg shadow overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
        alt={props.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-0 w-full bg-black/60 text-white p-2 text-sm truncate">
        {props?.original_title}
        {/* <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-2xl">⭐</span>
          <span className="ml-2 text-lg">{movie.vote_average}/10</span>
        </div> */}
      </div>
    </div>
  );
};
