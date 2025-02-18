import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";

const CartDrawer = ({ cartOpen, handleCartToggle }) => {
  return (
    <div
      className={` cart-container  ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between cursor-pointer">
        <h1 className="  font-semibold text-xl">My Cart (4)</h1>
        <IoMdClose className="w-6 h-6" onClick={handleCartToggle} />
      </div>

      {/* cart area */}
      <div className="grow h-full">
        <CartContent />
      </div>

      {/* footer area -checkbout button */}
      <div className="sticky flex flex-col space-y-4 bottom-0 px-4 pt-2">
        <button className="checkout-btn">Checkout</button>
        <p className="text-xs text-tsecondary tracking-tighter">
          shipping, taxes, and discount codes calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
