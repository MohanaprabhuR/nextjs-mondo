import React from "react";
import EmblaCarousel from "@/components/embla/carousal";
import Image from "next/image";

interface Show {
  id: number;
  name: string;
  poster: {
    src: string;
  };
}

interface ShowCarouselProps {
  shows: Show[];
}

const ShowCarousel: React.FC<ShowCarouselProps> = ({ shows }) => {
  const items = shows.map((show) => (
    <div
      key={show.id}
      className="relative aspect-[2/3] h-full w-full  rounded-lg"
    >
      <Image
        src={show.poster.src}
        alt={show.name}
        width={184}
        height={275}
        className="h-full w-full object-cover"
      />
    </div>
  ));

  return (
    <div>
      <h2 className="text-white">All Shows</h2>
      <EmblaCarousel items={items} />
    </div>
  );
};

export default ShowCarousel;
