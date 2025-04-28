import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCart } from "../../redux/slices/cartSlice";

const CartDrawer = ({ cartOpen, handleCartToggle }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const handleCheckout = () => {
    handleCartToggle();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={` cart-container w-screen sm:w-[440px] ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between cursor-pointer">
        <h1 className="  font-semibold text-xl">My Cart </h1>
        <IoMdClose className="w-6 h-6" onClick={handleCartToggle} />
      </div>

      {/* cart area */}
      <div className="grow h-[80%]">
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart is empty</p>
        )}
      </div>

      {/* footer area -checkbout button */}
      <div className="sticky   flex flex-col space-y-4 bottom-7 px-4 pt-2">
        {cart && cart?.products?.length > 0 && (
          <>
            <button onClick={handleCheckout} className="checkout-btn">
              Checkout
            </button>
            <p className="text-xs text-tsecondary tracking-tighter">
              shipping, taxes, and discount codes calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
