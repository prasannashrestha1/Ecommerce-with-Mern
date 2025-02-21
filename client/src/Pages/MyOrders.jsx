import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
          },
          orderItems: [
            {
              name: "Product 1",
              image:
                "https://randomwordgenerator.com/img/picture-generator/54e2d242485ba914f1dc8460962e33791c3ad6e04e5074417d2e72d2944cc4_640.jpg",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "122345",
          createdAt: new Date(),
          shippingAddress: {
            city: "New York",
            country: "USA",
          },
          orderItems: [
            {
              name: "Product 1",
              image:
                "https://randomwordgenerator.com/img/picture-generator/54e2d242485ba914f1dc8460962e33791c3ad6e04e5074417d2e72d2944cc4_640.jpg",
            },
          ],
          totalPrice: 100,
          isPaid: false,
        },
        {
          _id: "1332345",
          createdAt: new Date(),
          shippingAddress: {
            city: "Sitapaila",
            country: "Nepal",
          },
          orderItems: [
            {
              name: "Product 1",
              image:
                "https://randomwordgenerator.com/img/picture-generator/54e2d242485ba914f1dc8460962e33791c3ad6e04e5074417d2e72d2944cc4_640.jpg",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
      ];
      setAllOrders(mockOrders);
    }, 1000);
  }, []);
  return (
    <div className="max-w-7xl overflow-x-auto rounded-lg">
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
          {allOrders.length > 0 ? (
            allOrders.map((orders, index) => (
              <tr
                key={orders._id}
                className={`text-center hover:bg-stroke ${
                  index % 2 === 0 ? "bg-stroke/20" : "bg-stroke"
                }`}
              >
                <td className="px-4 py-2 ">
                  <img
                    className="w-5 h-5 mx-auto"
                    src={orders.orderItems[0].image}
                    alt=""
                  />
                </td>
                <td className="px-4 py-2 ">{orders._id}</td>
                <td className="px-4 py-2 ">
                  {new Date(orders.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 ">{orders.shippingAddress.city}</td>
                <td className="px-4 py-2 ">{orders.orderItems.length}</td>
                <td className="px-4 py-2 ">{orders.totalPrice}</td>
                <td className="px-4 py-2 ">
                  <span
                    className={`px-2 py-1 text-xs rounded-sm  ${
                      orders.isPaid
                        ? "bg-green-200 text-green-500"
                        : "bg-red-200 text-red-500"
                    }`}
                  >
                    {orders.isPaid ? "Paid" : "Pending"}
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
