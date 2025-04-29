import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

// const orders = [
//   {
//     _id: 13232,
//     user: {
//       name: "John Doe",
//     },
//     totalPrice: 110,
//     status: "Processing",
//   },
// ];

const OrderManagement = () => {
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (id, status, isDelive) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  const handleDelivered = (id, status, isDelivered) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}...</p>;
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 ">Order Management</h2>
      <div className="overflow-x-auto overflow-y-auto mt-8 max-h-[400px]">
        <table className="min-w-full text-left text-gray-500 shadow-2xl border border-gray-200 rounded-lg ">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700 rounded-tl-lg rounded-tr-lg">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs  text-gray-700 ">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-gray-100/50" : "bg-primary/5"
                  } `}
                >
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4">{order.user.name}</td>
                  <td className="py-3 px-4">{order.totalPrice.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="px-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelivered(order._id)}
                      className="px-4 bg-red-500 rounded-xl  py-1 text-white cursor-pointer"
                    >
                      Mark Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr aria-colspan={5}>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  {" "}
                  No Orders Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
