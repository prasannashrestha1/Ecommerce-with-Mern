import React, { useEffect, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, removeFromCart } from "../redux/slices/cartSlice";

// const checkout = {
//   _id: "12223",
//   createdAt: new Date(),
//   checkoutItems: [
//     {
//       productId: "1",
//       name: "Jacket",
//       color: "black",
//       size: "M",
//       price: 150,
//       quantity: 150,
//       image: "https://piscum.photos/10?random=1",
//     },
//     {
//       productId: "3",
//       name: "Jacket",
//       color: "black",
//       size: "M",
//       price: 150,
//       quantity: 150,
//       image: "https://piscum.photos/10?random=1",
//     },
//     {
//       productId: "4",
//       name: "Jacket",
//       color: "black",
//       size: "M",
//       price: 150,
//       quantity: 150,
//       image: "https://piscum.photos/10?random=1",
//     },
//     {
//       productId: "5",
//       name: "Jacket",
//       color: "black",
//       size: "M",
//       price: 150,
//       quantity: 150,
//       image: "https://piscum.photos/10?random=1",
//     },
//   ],
//   shippingAddress: {
//     address: "1223 Fashion Street",
//     city: "NEw Uur",
//     country: "USA",
//   },
// };

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  console.log(checkout);

  // clear the cart when the order is confirmed.
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
      dispatch(removeFromCart);
    }
  }, [dispatch, navigate, checkout]);

  const DeliveryDate = (date) => {
    const deliveryDate = new Date(date);
    deliveryDate.setDate(deliveryDate.getDate() + 10);
    return deliveryDate.toLocaleDateString();
  };

  return (
    checkout && (
      <div className="mx-auto max-w-7xl py-12 px-8">
        <h3 className="w-full text-3xl mb-6 text-primary font-semibold text-center">
          Thank You for Your Order
        </h3>
        <div className="max-w-4xl border-2 border-gray-200 rounded-lg mx-auto p-6">
          {/* Order Details and id */}
          <div className="flex justify-between mb-4 gap-4">
            <div>
              <h3 className="mb-0.5 text-lg font-medium">
                Order Id: {checkout._id}
              </h3>
              <h3 className=" text-sm text-gray-600">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </h3>
            </div>
            <p className="text-sm text-primary">
              Estimated Delivery: {DeliveryDate(checkout.createdAt)}
            </p>
          </div>
          {/* Checkout product details */}
          <div className="w-full h-[300px] overflow-auto ">
            {checkout.checkoutItems.map((product, id) => (
              <div key={id} className="flex justify-between mb-3">
                <div className="grow flex items-center">
                  <img src={product.image} className="w-[60px] h-[60px] mr-4" />
                  <div>
                    <h2 className="font-medium ">{product.name}</h2>
                    <p className="text-gray-700 text-xs">
                      {product.color} | {product.size}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <p>${product.price}</p>
                  <p className="text-xs text-gray-700">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Product Payment and delivery */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <h3 className="text-medium ">Payment</h3>
              <p className="text-sm text-gray-700 ">Paypal</p>
            </div>
            <div>
              <h3 className="text-medium ">Delivery</h3>
              <p className="text-sm text-gray-700 ">
                {checkout.shippingAddress.address}
              </p>
              <span className="text-sm text-gray-700 ">
                {checkout.shippingAddress.city}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderConfirmation;
