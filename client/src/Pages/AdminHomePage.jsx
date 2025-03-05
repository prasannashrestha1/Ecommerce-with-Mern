import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
    {
      _id: 123123,
      user: {
        name: "John Doe",
      },
      totalPrice: 110,
      status: "Processing",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$1000</p>
        </div>
        <div className="p-4 shadow-md rounded-lg hover:-translate-1 transition-transform duration-500">
          <h2 className="text-xl font-semibold ">Total Orders</h2>
          <p className="text-2xl">$1000</p>
          <Link
            to="/admin/orders"
            className="text-blue-500 block mt-2 hover:underline"
          >
            Manage Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">$1000</p>
          <Link
            to="/admin/products"
            className="text-blue-500 block mt-2 hover:underline"
          >
            Manage Products
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto max-h-[400px]">
          <table className="min-w-full text-left text-gray-500 shadow-2xl border border-gray-200 rounded-lg ">
            <thead className="bg-gray-200 text-xs uppercase text-gray-700 rounded-tl-lg rounded-tr-lg">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs  text-gray-700 ">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 !== 0 && "bg-gray-100/50"}`}
                  >
                    <th className="py-3 px-4">{index + 1}</th>
                    <th className="py-3 px-4">{order.user.name}</th>
                    <th className="py-3 px-4">{order.totalPrice}</th>
                    <th className="py-3 px-4">{order.status}</th>
                  </tr>
                ))
              ) : (
                <tr aria-colspan={4} className="p-4 text-center text-gray-500">
                  No Orders Available
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
