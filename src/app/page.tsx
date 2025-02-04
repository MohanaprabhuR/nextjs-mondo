import HeroCarousel from "@/components/hero/carousal";
// import ShowCarousal from "@/components/ShowCarousal/ShowCarousal";
import GenreCarouselItem from "@/components/show/category";
import Footer from "@/components/footer";

export default async function Shows() {
  const data = await fetch(`${process.env.API_URL}/api/shows?populate=*`);
  const shows = await data.json();

  const categorydata = await fetch(
    `${process.env.API_URL}/api/genres?populate=*`
  );
  const generdetails = await categorydata.json();

  return (
    <>
      <HeroCarousel shows={shows.data} />
      <section className="mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-[1280px] flex flex-col space-y-10 pb-[18px] pt-[50px] sm:space-y-12 sm:overflow-visible sm:pb-[107px]">
        {/* <ShowCarousal shows={shows.data} /> */}
        {generdetails.data?.map((genre: never, index: number) => (
          <GenreCarouselItem key={index} genre={genre} allShows={shows.data} />
        ))}
      </section>
      <Footer />
    </>
  );
}
