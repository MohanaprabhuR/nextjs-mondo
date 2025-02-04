"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface EmblaCarouselProps {
  items: React.ReactNode[];
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Update navigation buttons state
  const updateButtonStates = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtonStates);
    emblaApi.on("reInit", updateButtonStates);
    updateButtonStates();
  }, [emblaApi, updateButtonStates]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full py-4  sm:py-6 [&.is-draggable]:cursor-grab [&.is-dragging]:cursor-grabbing is-draggable">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex select-none gap-[var(--gap)] ease-out-quad [--gap:16px] [-webkit-tap-highlight-color:transparent] sm:[--gap:22px] ">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative w-[calc(40%-var(--gap)*2/2.5)] shrink-0 sm:w-[calc(33.33%-var(--gap)*2/3)] md:w-[calc(25%-var(--gap)*3/4)] lg:w-[calc(20%-var(--gap)*4/5)] xl:w-[calc(16.66%-var(--gap)*5/6)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <button
          className={`embla__button embla__button--prev absolute -translate-y-2/4 left-[-4rem] top-2/4 translate-x-1/2 ${
            canScrollPrev ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M28 38L12 21L28 3" stroke="white" strokeWidth={4} />
            </g>
          </svg>
        </button>
        <button
          className={`embla__button embla__button--next absolute -translate-y-2/4 right-[-2rem] top-2/4 translate-x-1/2 ${
            canScrollNext ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3L28 20L12 38" stroke="white" strokeWidth={4} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
