"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Show {
  id: number;
  name: string;
  banner: {
    src: string;
  };
}

interface CarouselProps {
  shows: Show[];
}

const HeroCarousel: React.FC<CarouselProps> = ({ shows }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayOptions = {
    delay: 5000,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);

  const onDotClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
    emblaApi.on("select", updateSelectedIndex);
    updateSelectedIndex();

    return () => {
      emblaApi.off("select", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  return (
    <div className="relative">
      <div
        className="embla overflow-hidden [&.is-draggable]:cursor-grab [&.is-dragging]:cursor-grabbing is-draggable"
        ref={emblaRef}
      >
        <div className="embla__container flex">
          {shows.map((show) => (
            <div key={show.id} className="embla__slide flex-[0_0_100%] min-w-0">
              <Image
                src={show.banner.src}
                alt={show.name}
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-1 p-2 ">
        {shows.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300  ${
              index === selectedIndex
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => onDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
