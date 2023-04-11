import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import ProfileSettings from "../Profile/ProfileSettings/ProfileSettings";
import Wall from "../Wall/Wall";
import Users from "../Users/Users";
import AnotherUser from "../AnotherUser/AnotherUser";
import Subscribers from "../Subscribers/Subscribers";
import Chats from "../Chats/Chats";
import Chat from "../Chats/Chat/Chat";
import { useAppSelector } from "../../app/hooks";

export default function MainRoutes() {
  const chatEmail = useAppSelector(state=> state.chat.email);

  return (
    <Routes>
      <Route path="/" element={<Wall />} />
      <Route path="/ProfileSettings" element={<ProfileSettings />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/AnotherUser" element={<AnotherUser />} />
      <Route path="/Subscribers" element={<Subscribers />} />
      <Route path="/Chats" element={<Chats />} />
      <Route path={`/Chat/${chatEmail}`} element={<Chat />} />
    </Routes>
  );
}
