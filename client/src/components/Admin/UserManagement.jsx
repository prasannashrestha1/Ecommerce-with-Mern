import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeUserType,
  createNewUser,
  deleteUser,
  getAllUsers,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  // const users = [
  //   {
  //     _id: 1234,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     role: "admin",
  //   },
  // ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin");
    dispatch(getAllUsers());
  }, [dispatch, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, role) => {
    dispatch(changeUserType({ userId, role }));
  };
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete the user")) {
      dispatch(deleteUser(userId));
    }
  };
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">User Management</h1>
      {loading && <p>Loading</p>}
      {error && <p>Erroor: {error}</p>}
      <div className="flex flex-col">
        <h2 className="text-xl font-medium"> Add User</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-5xl  gap-4 mt-3"
        >
          {/* email and password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3 text-sm">
              <label className="mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="inpt"
                required
              />
            </div>
            <div className="mb-3 text-sm">
              <label className="mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="inpt"
                required
              />
            </div>
          </div>
          {/* Name and role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-3 text-sm">
              <label className="mb-1 block">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="inpt"
                required
              />
            </div>
            <div className="mb-3 text-sm">
              <label className="mb-1 block">Customer</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="inpt"
                required
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary w-[240px] ml-auto text-white py-2 px-4  rounded hover:bg-primary/80"
          >
            Add User
          </button>
        </form>
        <div className="overflow-x-auto overflow-y-auto mt-8 max-h-[400px]">
          <table className="min-w-full text-left text-gray-500 shadow-2xl border border-gray-200 rounded-lg ">
            <thead className="bg-gray-200 text-xs uppercase text-gray-700 rounded-tl-lg rounded-tr-lg">
              <tr>
                <th className="py-3 px-4">SN</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs  text-gray-700 ">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 !== 0 ? "bg-gray-100/50" : "bg-primary/5"
                    } `}
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                        className="px-2 border border-gray-300 rounded-lg"
                      >
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="px-4 bg-red-500 rounded-xl  py-1 text-white cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr aria-colspan={4} className="p-4 text-center text-gray-500">
                  <th>No Orders Available</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
