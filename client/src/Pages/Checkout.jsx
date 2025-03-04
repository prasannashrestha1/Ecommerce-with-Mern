import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paypal from "../components/Cart/Paypal";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://piscum.photos/150?random=1",
    },
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://piscum.photos/150?random=1",
    },
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://piscum.photos/150?random=1",
    },
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://piscum.photos/150?random=1",
    },
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://piscum.photos/150?random=1",
    },
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://piscum.photos/150?random=1",
    },
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://piscum.photos/150?random=1",
    },
  ],
  totalPrice: 600,
};
console.log(`${cart.products.reduce((a, b) => a + b.price, 0)}`);
const Checkout = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(12);
  };
  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful", details);
    navigate("/order-confirmation");
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* left Section */}
      <div className=" bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout} className="">
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="user@email.com"
              className="w-full p-2 border rounded"
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* city and postal code */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                placeholder="city"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                placeholder="Postal Code"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                placeholder="country"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Postal Code"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="bg-primary w-full text-white py-3 rounded"
              >
                Checkout{" "}
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4"> Pay with Paypal</h3>
                <Paypal
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Paypal Failed")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="p-6 flex flex-col justify-between bg-gray-100 rounded-lg divide-y divide-tsecondary">
        {/* right top content */}
        <div>
          <h1 className="text-lg mb-3">Order Summary</h1>
          <div className="my-3 h-[400px] overflow-y-auto">
            {cart.products.map((item, id) => (
              <div
                key={id}
                className="flex gap-3 mb-1 p-3 border-b border-gray-200"
              >
                <img src={item.image} className="h-[72px] w-[72px]" />
                <div className="grow">
                  <h4>{item.name}</h4>
                  <div className="flex gap-1 text-xs text-gray-400">
                    <label>Size:</label>
                    <p>{item.name}</p>
                  </div>
                  <div className="flex gap-1 text-xs text-gray-400">
                    <label>Color:</label>
                    <p>{item.color}</p>
                  </div>
                </div>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
        </div>
        {/* right subtotal - total content */}
        <div>
          <div className="py-4 border-b border-gray-300">
            <div className="flex justify-between text-lg">
              <h3>SubTotal</h3>
              <p>
                $
                {cart.products.reduce(
                  (accumulator, item) => accumulator + item.price,
                  0
                )}
              </p>
            </div>
            <div className="flex justify-between my-2 text-lg">
              <h3>Shipping</h3>
              <p>Free</p>
            </div>
          </div>
          <div className="flex my-4 justify-between text-lg">
            <h3>Total</h3>
            <p>
              {cart.products.reduce(
                (accumulator, item) => accumulator + item.price,
                0
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
