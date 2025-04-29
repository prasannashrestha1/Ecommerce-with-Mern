import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);
  console.log(orderDetails);

  // useEffect(() => {
  //   const mockData = {
  //     _id: id,
  //     createdAt: new Date(),
  //     isPaid: false,
  //     isDelivered: false,
  //     paymentMethod: "Paypal",
  //     shippingMethod: "Standard",
  //     shippingAddress: {
  //       city: "New York",
  //       country: "USA",
  //     },
  //     orderItems: [
  //       {
  //         productId: "1",
  //         name: "Jacket",
  //         price: 120,
  //         quantity: 1,
  //         image:
  //           "https://randomwordgenerator.com/img/picture-generator/55e7dc444b56aa14f1dc8460962e33791c3ad6e04e5074417d2e72d1924cc6_640.jpg",
  //       },
  //       {
  //         productId: "3",
  //         name: "event",
  //         price: 120,
  //         quantity: 1,
  //         image:
  //           "https://randomwordgenerator.com/img/picture-generator/54e1d24b4d5aaa14f1dc8460962e33791c3ad6e04e5074417d2e7ed69f49cd_640.jpg",
  //       },
  //       {
  //         productId: "22",
  //         name: "this is business",
  //         price: 120,
  //         quantity: 2,
  //         image:
  //           "https://randomwordgenerator.com/img/picture-generator/55e8d4474c50a514f1dc8460962e33791c3ad6e04e507440762879dc9144c2_640.jpg",
  //       },
  //       {
  //         productId: "1",
  //         name: "animal",
  //         price: 12,
  //         quantity: 1,
  //         image:
  //           "https://randomwordgenerator.com/img/picture-generator/52e3d7434b51aa14f1dc8460962e33791c3ad6e04e5074417c2f7cd3944dc4_640.jpg",
  //       },
  //     ],
  //   };

  //   setOrderDetails(mockData);
  // }, [id]);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No order details Found</p>
      ) : (
        <div className="p-6 rounded-lg border border-gray-200">
          {/* Order Info */}
          <div className="flex flex-col  sm:flex-row justify-between mb-8">
            <div>
              <h3 className=" text-lg font-semibold mb-1">
                Order Id: {orderDetails._id}
              </h3>
              <p className="text-sm text-gray-700">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            {orderDetails.isPaid ? (
              <div className="px-4 py-1 text-xs h-fit font-medium rounded-full bg-green-500/30 text-green-500">
                Approved
              </div>
            ) : (
              <div className="px-4 py-1 text-xs h-fit font-medium rounded-full bg-yellow-500/30 text-yellow-500">
                Pending Delivery
              </div>
            )}
          </div>
          {/* Payment Info */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
            <div>
              <h3 className="text-lg mb-3 font-semibold">Payment Info</h3>
              <p className="text-sm mb-1 text-gray-800">
                Payment Method: {orderDetails.paymentMethod}
              </p>
              <p className="text-sm text-gray-800">
                Status: {orderDetails.paymentMethod}
              </p>
            </div>
            <div>
              <h3 className="text-lg mb-3 font-semibold">Payment Info</h3>
              <p className="text-sm mb-1 text-gray-800">
                Payment Method: {orderDetails.paymentMethod}
              </p>
              <p className="text-sm text-gray-800">
                Status: {orderDetails.paymentMethod}
              </p>
            </div>
            <p></p>
          </div>
          {/* Product Info */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <table className="w-full shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Unit Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((order, item) => (
                  <tr key={item} className="border-b border-gray-200">
                    <td className="px-4 py-2 flex items-center">
                      <img
                        src={order.image}
                        className="w-[54px] rounded-lg h-[54px] mr-4
                        "
                      />
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-blue-500 hover:underline"
                      >
                        {order.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">${order.price}</td>
                    <td className="px-4 py-2 text-center">{order.quantity}</td>
                    <td className="px-4 py-2 text-center">
                      ${order.price * order.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Back to Orders Page */}
          <Link to="/my-orders" className="text-blue-500 hover:underline">
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
