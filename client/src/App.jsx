import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* user layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
