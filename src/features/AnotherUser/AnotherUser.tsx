import React, { useEffect } from "react";
import styles from "./AnotherUser.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addAnotherUser } from "./AnotherUserSlice";
import { useNavigate } from "react-router";
import AnotherUserHeader from "./AnotherUserHeader/AnotherUserHeader";
import Wall from "../Wall/Wall";

export default function AnotherUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.profile.users);
  const anotherUser = useAppSelector((state) => state.anotherUser.anotherUser);
  const updateUserFlag = useAppSelector(
    (state) => state.anotherUser.updateUserFlag
  );

  useEffect(() => {
    if (!anotherUser) {
      navigate("/users");
    }
  }, []);
  useEffect(() => {
    let updatedUser = users.find((user) => user.email === anotherUser?.email);
    dispatch(addAnotherUser(updatedUser));
  }, [updateUserFlag]);

  return (
    <div className={styles.anotherUser_Wrapper}>
      <AnotherUserHeader />
      <Wall anotherUser={anotherUser} />
    </div>
  );
}
