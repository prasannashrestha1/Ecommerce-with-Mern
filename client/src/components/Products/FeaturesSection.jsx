import React from "react";
import { HiShoppingBag } from "react-icons/hi2";
import { LiaStripe } from "react-icons/lia";
import { TbTruckReturn } from "react-icons/tb";

const FeaturesSection = () => {
  return (
    <section className="p-8">
      <div className=" grid grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col items-center">
          <HiShoppingBag className="mb-4 w-5 h-5" />
          <h4 className="uppercase font-semibold my-2">
            Free International Orders
          </h4>
          <p className="text-sm">On all orders over $100.00</p>
        </div>
        <div className="flex flex-col items-center">
          <TbTruckReturn className="mb-4 w-5 h-5" />
          <h4 className="uppercase font-semibold my-2">45 days return</h4>
          <p className="text-sm">Money back guarentee</p>
        </div>
        <div className="flex flex-col items-center">
          <LiaStripe className="mb-4 w-5 h-5" />
          <h4 className="uppercase font-semibold my-2">Secure checkout</h4>
          <p className="text-sm">On all orders over $100.00</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
