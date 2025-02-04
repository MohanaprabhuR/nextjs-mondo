import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="relative mx-auto px-0 pb-[95px] pt-9 sm:px-6 lg:px-8 xl:max-w-[1280px] xl:overflow-hidden">
        <div className="h-px w-full bg-white/[0.1]" />

        <div className="mt-6 flex flex-col items-center justify-between sm:flex-row">
          <Link
            href="/"
            className="outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 relative flex shrink-0 items-center justify-center rounded ring-inset sm:h-12"
          >
            <div className="relative flex w-[203px] h-[20px] items-center justify-center overflow-hidden">
              <Image
                src="https://mondo-dev.vercel.app/images/horizontal-logo.png"
                alt="Universal FYC Home"
                fill
                className="object-cover transition duration-500 scale-100"
                priority
              />
            </div>
          </Link>

          <div className="mt-6 flex flex-col flex-wrap items-center gap-x-0 gap-y-4 text-[13px] font-medium uppercase leading-[100%] tracking-[0.08em] text-white/50 sm:mt-0 sm:flex-row sm:gap-x-10">
            <Link
              href="#"
              className="outline-none text-white focus-visible:ring-2 focus-visible:ring-yellow-400 cursor-pointer border-b-[1px] border-transparent transition-all hover:border-white hover:text-white"
              rel="noreferrer noopener"
            >
              TMDB Nexus
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
