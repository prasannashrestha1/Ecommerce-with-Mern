import React, { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const NewArrivals = () => {
  const scrollContainer = useRef(null);
  const ad = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 200,
      images: [
        {
          url: "https://fastly.picsum.photos/id/134/200/300.jpg?hmac=KN18cCDft4FPM0XJpr7EhZLtUP6Z4cZqtF8KThtTvsI",
          altText: "Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish Jacket",
      price: 200,
      images: [
        {
          url: "https://piscum.photos/500/500?random=2",
          altText: "Jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylish Jacket",
      price: 200,
      images: [
        {
          url: "https://randomwordgenerator.com/img/picture-generator/tt-4269869_640.jpg",
          altText: "Jacket",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish Jacket",
      price: 200,
      images: [
        {
          url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
          altText: "Jacket",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylish Jacket",
      price: 200,
      images: [
        {
          url: "https://piscum.photos/500/500?random=5",
          altText: "Jacket",
        },
      ],
    },
    {
      _id: "6",
      name: "Stylish Jacket",
      price: 200,
      images: [
        {
          url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
          altText: "Jacket",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylish Jacket",
      price: 200,
      images: [
        {
          url: "https://randomwordgenerator.com/img/picture-generator/57e6d1454e51a914f1dc8460962e33791c3ad6e04e50744172277fd7914bc3_640.jpg",
          altText: "Jacket",
        },
      ],
    },
    {
      _id: "8",
      name: "Stylish Jacket",
      price: 200,
      images: [
        {
          url: "https://randomwordgenerator.com/img/picture-generator/55e4d44a4854ad14f1dc8460962e33791c3ad6e04e507440762a7cd59f4bc1_640.jpg",
          altText: "Jacket",
        },
      ],
    },
  ];

  const scrollRight = () => {
    console.log(scrollContainer.current.scrollWidth);
    console.log(scrollContainer.current.clientWidth);
    scrollContainer.current?.scrollBy({ left: 200, behavior: "smooth" });
  };
  const scrollLeft = () => {
    scrollContainer.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 py-10 md:py-20 items-center flex flex-col gap-12 text-center ">
      <div className="flex w-[80%] flex-col md:flex-row justify-between gap-4 items-end md:items-center">
        <span className="hidden md:block"></span>
        <div className=" max-w-[720px]">
          <h3 className="text-3xl font-semibold">Explore New Arrivals</h3>
          <p className="text-md mt-2 ">
            Discover the latest styles straight off the runway, frehly added to
            keep your wardrobe on the cutting edge.
          </p>
        </div>
        <div className="flex h-fit gap-2 top-12 right-0">
          <div onClick={scrollLeft} className="p-2 border border-gray-300">
            <FaAngleLeft />
          </div>
          <div onClick={scrollRight} className="p-2 border border-gray-300">
            <FaAngleRight />
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div
          ref={scrollContainer}
          className="flex gap-2 overflow-x-scroll max-w-[1560px] pb-2 md:pb-4"
        >
          {ad.map((item, index) => (
            <div
              key={index}
              className="h-[200px] sm:h-[300px] md:h-[400px] rounded-lg min-w-[220px] md:min-w-[300px] flex mb-4 relative"
            >
              <img
                src={item.images[0].url}
                className="w-full object-cover rounded-lg"
                alt={item.images.altText}
              />
              <div className="absolute bottom-0 w-full bg-black/40 rounded-b-lg p-4 text-sm text-start text-white">
                <p className="font-semibold">{item.name}</p>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
