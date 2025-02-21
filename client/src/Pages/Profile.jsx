import React from "react";
import MyOrders from "./MyOrders";

const Profile = () => {
  return (
    <section className="p-12 flex flex-col lg:flex-row gap-12">
      {/* logout section */}
      <div className="w-full lg:w-1/4">
        <div className=" px-6 pt-6 pb-20 rounded-lg shadow-xl border-stroke border">
          <h2 className="mb-4 text-2xl font-bold">John Doe</h2>
          <p className="mb-4 text-md break-words">prasanna.shresth@gmail.com</p>
          <button className=" bg-red-400 hover:bg-red-500 rounded-sm p-2 w-full text-center text-sm text-white">
            Log out
          </button>
        </div>
      </div>
      {/* My Orders Section */}
      <div className="py-4 max-w-7xl grow">
        <h2 className="text-xl mb-4 font-semibold">My Orders</h2>
        <MyOrders />
      </div>
    </section>
  );
};

export default Profile;
