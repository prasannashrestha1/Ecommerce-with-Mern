import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const scrollContainer = useRef(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const navigate = useNavigate();

  const scrollRight = () => {
    // console.log(scrollContainer.current.scrollWidth);
    // console.log(scrollContainer.current.clientWidth);
    scrollContainer.current?.scrollBy({ left: 200, behavior: "smooth" });
  };
  const scrollLeft = () => {
    scrollContainer.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/new-arrivals`
        );
        setNewArrivals(response.data.newArrivals);
        console.log(response.data);
      } catch (error) {
        console.log(error.message + "this is not working");
      }
    };
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const container = scrollContainer.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      container.classList.add("cursor-grabbing");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
      isDown = false;
      container.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeaveOrUp);
    container.addEventListener("mouseup", handleMouseLeaveOrUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeaveOrUp);
      container.removeEventListener("mouseup", handleMouseLeaveOrUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="px-4 sm:px-6 md:px-10 py-10 md:py-20 items-center flex flex-col  gap-12 text-center ">
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
          <div
            onClick={scrollLeft}
            className="p-2 border cursor-pointer border-gray-300"
          >
            <FaAngleLeft />
          </div>
          <div
            onClick={scrollRight}
            className="p-2 border cursor-pointer border-gray-300"
          >
            <FaAngleRight />
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div
          ref={scrollContainer}
          className="flex gap-4 mx-auto overflow-x-scroll max-w-[1560px] pb-2 md:pb-4"
        >
          {newArrivals.map((item, index) => (
            <div
              onClick={() => navigate(`/product/${item._id}`)}
              key={index}
              className="h-[200px] sm:h-[250px] md:h-[350px] rounded-lg min-w-[220px] md:min-w-[300px] flex mb-4 relative"
            >
              <img
                draggable={false}
                src={
                  item.images[0]
                    ? item.images[0].url
                    : "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww"
                }
                className="w-full object-cover rounded-lg"
                alt={item.images.altText}
              />
              <div className="absolute bg-black/50 backdrop-blur-[4px] bottom-0 w-full bgblur rounded-b-lg p-4 text-sm text-start text-white">
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
