import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllUserOrders } from "../redux/slices/orderSlice";

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(fetchAllUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl overflow-x-auto rounded-lg mx-auto my-8 shadow-md">
      <table className=" min-w-5xl lg:min-w-full ">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-4 py-2 ">IMAGE</th>
            <th className="px-4 py-2 ">Order Id</th>
            <th className="px-4 py-2 ">Created Date</th>
            <th className="px-4 py-2 ">Shipping Address</th>
            <th className="px-4 py-2 ">Items</th>
            <th className="px-4 py-2 ">Price</th>
            <th className="px-4 py-2 ">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <tr
                onClick={() => navigate(`/order/${order._id}`)}
                key={order._id}
                className={`text-center hover:bg-stroke ${
                  index % 2 === 0 ? "bg-stroke/20" : "bg-stroke"
                }`}
              >
                <td className="px-4 py-2 ">
                  <img
                    className="w-5 h-5 mx-auto"
                    src={order.orderItems[0].image}
                    alt=""
                  />
                </td>
                <td className="px-4 py-2 ">{order._id}</td>
                <td className="px-4 py-2 ">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 ">{order.shippingAddress.city}</td>
                <td className="px-4 py-2 ">{order.orderItems.length}</td>
                <td className="px-4 py-2 ">{order.totalPrice}</td>
                <td className="px-4 py-2 ">
                  <span
                    className={`px-2 py-1 text-xs rounded-sm  ${
                      order.isPaid
                        ? "bg-green-200 text-green-500"
                        : "bg-red-200 text-red-500"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="h-20 p-5 bg-gray-50 mx-auto" colSpan={7}>
                No Orders Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
