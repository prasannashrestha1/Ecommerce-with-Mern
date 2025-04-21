import React, { useEffect } from "react";
import MyOrders from "./MyOrders";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <section className="min-h-screen p-12 flex flex-col lg:flex-row gap-12">
      {/* logout section */}
      <div className=" bg-white  w-full lg:w-1/4">
        <div className=" px-6 pt-6 pb-20 rounded-lg shadow-xl border-stroke border">
          <h2 className="mb-4 text-2xl font-bold">{user?.name}</h2>
          <p className="mb-4 text-md break-words">{user?.email}</p>
          <button
            onClick={handleLogout}
            className=" bg-red-400 hover:bg-red-500 rounded-sm p-2 w-full text-center text-sm text-white"
          >
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
