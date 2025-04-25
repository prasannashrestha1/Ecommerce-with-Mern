import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  updateCartItemQuantity,
} from "./../../redux/slices/cartSlice";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";
const CartContent = ({ cart, userId, guestId, refetchCart }) => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      productId: 2,
      name: "Shirt",
      size: "L",
      color: "Blue",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/id/237/200/300",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "M",
      color: "Green",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/id/237/200/300",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "M",
      color: "Green",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/id/237/200/300",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "M",
      color: "Green",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/id/237/200/300",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "M",
      color: "Green",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/id/237/200/300",
    },
    {
      productId: 3,
      name: "T-shirt",
      size: "M",
      color: "Green",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/id/237/200/300",
    },
  ];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // handle adding or subtracting to the cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = async (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div className="h-full overflow-y-scroll divide-y flex flex-col gap-2  text-start">
      {cart.products.map((item, index) => (
        <div
          key={index}
          className="flex flex-col min-[440px]:flex-row gap-4 border-b-2 border-b-primary/10 p-2 min-[440px]:items-center justify-between"
        >
          <div className="flex gap-4 justify-between items-center flex-1">
            <img
              src={item.image}
              className="w-25 h-25 rounded-lg object-cover"
            />
            <div className="flex flex-col flex-1">
              <h3 className=" text-xl font-medium">{item.name}</h3>
              <p className="text-tsecondary text-sm">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center max-[440px]:justify-end text-black">
            <div
              className="cart-add-minus"
              onClick={() =>
                handleAddToCart(
                  item.productId,
                  -1,
                  item.quantity,
                  item.size,
                  item.color
                )
              }
            >
              <AiOutlineMinus className="w-4 h-4" />
            </div>
            <p>{item.quantity}</p>

            <div
              className="cart-add-minus"
              onClick={() =>
                handleAddToCart(
                  item.productId,
                  1,
                  item.quantity,
                  item.size,
                  item.color
                )
              }
            >
              <AiOutlinePlus className="w-4 h-4" />
            </div>
            <div
              className="cart-add-minus"
              onClick={() =>
                handleRemoveFromCart(item.productId, item.size, item.color)
              }
            >
              <MdDelete className="w-4 h-4" color="red" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
