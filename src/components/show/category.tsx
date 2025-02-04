"use client";
import React, { ReactNode, useState } from "react";
import EmblaCarousel from "@/components/embla/carousal";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import _ from "lodash";

interface Video {
  poster: string;
  id: number;
  name: string;
  season: number;
}

interface Show {
  description: ReactNode;
  cast_and_crew: { id: number; name: string }[];
  id: number;
  name: string;
  poster: { src: string };
  videos: Video[];
}

interface Genre {
  id: number;
  name: string;
  shows: Show[];
}

interface GenreCarouselItemProps {
  genre: Genre;
  allShows: Show[];
}

const GenreCarouselItem: React.FC<GenreCarouselItemProps> = ({
  genre,
  allShows,
}) => {
  const matchedShows = allShows.filter((show) =>
    genre.shows.some((genreshow) => genreshow.id === show.id)
  );

  const [selectedSeasons, setSelectedSeasons] = useState<{
    [showId: number]: string | null;
  }>(() =>
    matchedShows.reduce((acc, show) => {
      const groupedVideos = _.groupBy(show.videos, "season");
      const seasons = Object.keys(groupedVideos);
      acc[show.id] = seasons[0] || null;
      return acc;
    }, {} as { [showId: number]: string | null })
  );

  const handleSeasonChange = (showId: number, season: string) => {
    setSelectedSeasons((prev) => ({ ...prev, [showId]: season }));
  };

  return (
    <div className="">
      <h2 className="text-white">{genre.name}</h2>
      <EmblaCarousel
        items={matchedShows.map((show) => {
          const groupedVideos = _.groupBy(show.videos, "season");
          const seasons = Object.keys(groupedVideos);

          return (
            <div key={show.id}>
              <Drawer>
                <DrawerTrigger>
                  <div className="relative aspect-[2/3] h-full w-full overflow-hidden rounded-lg">
                    <Image
                      src={show.poster.src}
                      alt={show.name}
                      width={184}
                      height={275}
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>{show.name}</DrawerTitle>
                    <DrawerDescription>
                      <div className="flex">
                        <div className="w-3/4">
                          <p>{show.description}</p>

                          <ul className="flex space-x-2 flex-wrap">
                            {show.cast_and_crew.slice(0, 10).map((member) => (
                              <li className="list-disc" key={member.id}>
                                {member.name}
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4">
                            {seasons.length > 1 ? (
                              <>
                                <select
                                  id={`season-select-${show.id}`}
                                  value={selectedSeasons[show.id] || ""}
                                  onChange={(e) =>
                                    handleSeasonChange(show.id, e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                  {seasons.map((season) => (
                                    <option key={season} value={season}>
                                      Season {season}
                                    </option>
                                  ))}
                                </select>
                              </>
                            ) : (
                              <h3 className="text-lg font-semibold">
                                Season {seasons[0]}
                              </h3>
                            )}
                          </div>

                          <div className="mt-4">
                            <ul className="list-disc pl-4 flex flex-wrap">
                              {(
                                groupedVideos[selectedSeasons[show.id]!] ||
                                groupedVideos[seasons[0]]
                              ).map((video) => (
                                <li key={video.id}>
                                  <Image
                                    src={video.poster}
                                    alt={show.name}
                                    width={184}
                                    height={275}
                                    className="object-cover rounded"
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="w-1/4">
                          <Image
                            src={show.poster.src}
                            alt={show.name}
                            width={184}
                            height={275}
                            className="object-cover rounded"
                          />
                        </div>
                      </div>
                    </DrawerDescription>
                    <DrawerClose className="fixed top-4 left-auto right-4 z-50">
                      X
                    </DrawerClose>
                  </DrawerHeader>
                  <DrawerFooter></DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          );
        })}
      />
    </div>
  );
};

export default GenreCarouselItem;
