import Image from "next/image";
import Link from "next/link";
import CategoryMenu from "@/components/header/category";
import SearchCategory from "@/components/header/search";

export default async function Header() {
  const data = await fetch(`${process.env.API_URL}/api/genres?populate=*`);
  const category = await data.json();

  const showdata = await fetch(`${process.env.API_URL}/api/shows?populate=*`);
  const shows = await showdata.json();

  return (
    <header className="header fixed top-0 z-50 w-full transition-all ease-in-out bg-[rgba(0,0,0,0.9)] py-3">
      <nav className="mx-auto flex h-10 w-full items-center justify-between px-4 xl:max-w-[1280px]">
        <Link
          className="outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 relative flex shrink-0 items-center justify-center rounded ring-inset sm:h-12"
          href="/"
        >
          <Image
            alt="Universal FYC Home"
            width={182}
            height={18}
            src="https://mondo-dev.vercel.app/images/horizontal-logo.png"
          />
        </Link>
        <div className="flex items-center">
          <CategoryMenu categorylist={category} allshows={shows} />
          <SearchCategory categorylist={category} allshows={shows} />
        </div>
      </nav>
    </header>
  );
}
