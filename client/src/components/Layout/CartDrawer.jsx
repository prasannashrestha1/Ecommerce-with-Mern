import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ cartOpen, handleCartToggle }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.auth);
  const userId = user ? user._id : null;
  const handleCheckout = () => {
    handleCartToggle();
    if (!user) {
      navigate("/login?redirect=checkout");
    }
    navigate("/checkout");
  };
  return (
    <div
      className={` cart-container w-screen sm:w-[440px] ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between cursor-pointer">
        <h1 className="  font-semibold text-xl">My Cart (4)</h1>
        <IoMdClose className="w-6 h-6" onClick={handleCartToggle} />
      </div>

      {/* cart area */}
      <div className="grow h-[80%]">
        <CartContent />
      </div>

      {/* footer area -checkbout button */}
      <div className="sticky   flex flex-col space-y-4 bottom-7 px-4 pt-2">
        <button onClick={handleCheckout} className="checkout-btn">
          Checkout
        </button>
        <p className="text-xs text-tsecondary tracking-tighter">
          shipping, taxes, and discount codes calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
