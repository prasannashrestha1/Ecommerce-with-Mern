import { Link } from "react-router-dom";
import featured from "./../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="w-full p-8">
      <div className="mx-auto text-start flex flex-col md:flex-row rounded-3xl bg-black/5">
        {/* left Section */}
        <div className="flex-1 flex p-6 lg:p-8 xl:p-14 flex-col justify-center gap-2">
          <h4 className="text-md xl:text-lg font-semibold text-gray-500">
            Comfort and Style
          </h4>
          <h2 className=" text-3xl xl:text-5xl md:mb-4 font-semibold">
            Apparel made for your everyday life
          </h2>
          <p className="text-sm xl:text-md my-4 text-gray-700">
            Dicover high-quanlit, comfortabe clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great
            everyday
          </p>
          <Link
            to="collections/all"
            className=" text-white text-center rounded-lg px-6 py-2 max-w-50 bg-primary hover:bg-primary/80 cursor-pointer"
          >
            Shop Now
          </Link>
        </div>
        {/* Right Section */}
        <div className="flex-1">
          <img
            src={featured}
            alt={featured}
            className="h-[400px] md:h-[500px] xl:h-[700px] w-full object-cover rounded-b-3xl  rounded-r-none md:rounded-r-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
