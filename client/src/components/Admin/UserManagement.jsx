import React, { useState } from "react";

const UserManagement = () => {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-8">User Management</h1>
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
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
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
      </div>
    </div>
  );
};

export default UserManagement;
