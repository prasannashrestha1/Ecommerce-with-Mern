import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import { Toaster } from "sonner";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* user layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "F2F4F7",
          },
        }}
      />
    </BrowserRouter>
  );
};

export default App;
