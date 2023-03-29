import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { auth, authState, db } from "../../firebase";
import { clearProfileUser, setUsersFromDataBase } from "../Profile/ProfileSlice";
import styles from "./Header.module.css";
import HeaderForm from "./HeaderForm/HeaderForm";

export default function Header() {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const dispatch = useAppDispatch();

  const getUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
      }
    });
  };
  const signOutUser = () => {
    signOut(auth).then(() => {
      alert('User sign out !')
      setUser(null);
      dispatch(clearProfileUser());
    }).catch((error) => {
      alert('Some problem occur !')
    });
  };

  useEffect(() => {
    getUserStatus();
  }, []);

  return (
    <header className={styles.header}>
      <h1>Social Network</h1>
      <div className={styles.header_Form_Section}>
        {user ? (
          <button className={styles.header_Button} type="button" onClick={() => signOutUser()}>
            Sign Out
          </button>
        ) : (
          <button
            className={styles.header_Button}
            type="button"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            Sign In
          </button>
        )}
        <div
          className={styles.header_Form_Block}
          style={isFormVisible ? { display: "flex" } : { display: "none" }}
        >
          <HeaderForm setIsFormVisible={setIsFormVisible}/>
        </div>
      </div>
    </header>
  );
}
