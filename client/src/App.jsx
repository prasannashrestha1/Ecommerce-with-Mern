import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* user layout */}
        <Route path="/" element={<UserLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
