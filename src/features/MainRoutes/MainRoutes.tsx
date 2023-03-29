import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import Wall from "../Wall/Wall";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Wall />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
}
