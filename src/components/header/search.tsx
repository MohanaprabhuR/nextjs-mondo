"use client";
import React, { useState, useMemo } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

interface Show {
  id: number;
  name: string;
  description: string;
  poster: {
    src: string;
  };
  cast_and_crew?: Array<{
    id: number;
    name: string;
  }>;
}

interface Category {
  data: Array<{
    shows: Show[];
  }>;
}

interface AllShows {
  data: Show[];
}

interface SearchProps {
  categorylist: Category;
  allshows: AllShows;
}

const Search: React.FC<SearchProps> = ({ categorylist, allshows }) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredShowId, setHoveredShowId] = useState<string | number | null>(
    null
  );

  console.log(allshows.data, "hovershowid");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const uniqueShows = useMemo(() => {
    const filteredCategories = categorylist.data
      .map((category) => ({
        ...category,
        shows: category.shows.filter((show) =>
          show.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((category) => category.shows.length > 0);

    const uniqueShowsMap = new Map<string | number, Show>();

    filteredCategories.forEach((category) => {
      category.shows.forEach((show) => {
        if (!uniqueShowsMap.has(show.id)) {
          uniqueShowsMap.set(show.id, show);
        }
      });
    });

    return Array.from(uniqueShowsMap.values());
  }, [categorylist.data, searchQuery]);

  const SearchIcon = () => (
    <svg
      aria-hidden="true"
      focusable="false"
      fill="none"
      viewBox="0 0 20 20"
      className="inline-block h-[1em] w-[1em] shrink-0 align-middle leading-[1em]"
    >
      <path
        clipRule="evenodd"
        d="M2.898 8.38a5.482 5.482 0 1 1 10.963 0 5.482 5.482 0 0 1-10.963 0ZM8.38.898a7.482 7.482 0 1 0 4.535 13.432l4.48 4.48a1 1 0 0 0 1.414-1.415l-4.48-4.48A7.482 7.482 0 0 0 8.38.898Z"
        fill="#fff"
        fillRule="evenodd"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ShowDetails: React.FC<{ show: Show }> = ({ show }) => {
    const showData = allshows.data.find((s) => s.id === show.id);
    if (!showData) return null;

    return (
      <>
        <div className="flex gap-4">
          <div>
            <p className="text-black">{show.description}</p>
            <ul className="flex space-x-2 flex-wrap">
              {showData.cast_and_crew?.slice(0, 20).map((person) => (
                <li key={person.id} className="list-disc">
                  {person.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden">
            <Image
              src={showData.poster.src}
              alt={showData.name}
              width={250}
              height={275}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className="ml-4 cursor-pointer"
        onClick={() => setOpenSearch(!openSearch)}
      >
        <SearchIcon />
      </div>

      {openSearch && (
        <div className="absolute left-0 pt-16 w-full h-screen overflow-y-auto bg-black/90 z-50 top-[60px]">
          <input
            type="text"
            onChange={handleSearchChange}
            value={searchQuery}
            placeholder="Search Season title...."
            className="w-full px-4 py-2 text-sm text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="container relative text-white min-w-full">
            <button
              onClick={() => setOpenSearch(false)}
              className="absolute -top-20 right-4 text-white hover:text-gray-300"
            >
              <CloseIcon />
            </button>

            {uniqueShows.length > 0 ? (
              <ul className="flex flex-wrap gap-1 w-full flex-col">
                {uniqueShows.map((show) => (
                  <div key={show.id} className="relative">
                    <Drawer>
                      <DrawerTrigger className="w-full">
                        <li
                          onMouseEnter={() => setHoveredShowId(show.id)}
                          onMouseLeave={() => setHoveredShowId(null)}
                          className="p-1 hover:bg-white/10 rounded transition-colors cursor-pointer text-left relative"
                        >
                          <div className="flex relative">
                            {show.name}
                            {hoveredShowId === show.id && (
                              <div className="show-banner-image flex gap-2 mt-2 absolute right-0 top-0">
                                {allshows.data.map(
                                  (allshow) =>
                                    allshow.id === show.id && (
                                      <div
                                        key={allshow.id}
                                        className="rounded-xl overflow-hidden"
                                      >
                                        <Image
                                          src={allshow.poster.src}
                                          alt={allshow.name}
                                          width={184}
                                          height={275}
                                        />
                                      </div>
                                    )
                                )}
                              </div>
                            )}
                          </div>
                        </li>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>{show.name}</DrawerTitle>
                          <DrawerDescription>
                            <ShowDetails show={show} />
                          </DrawerDescription>
                        </DrawerHeader>
                      </DrawerContent>
                    </Drawer>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No shows found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
