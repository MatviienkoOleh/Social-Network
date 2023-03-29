import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { auth, authState, db } from "../../../firebase";
import { UserFormI, UserI } from "../../../interface/global";
import {
  setProfileUserInReduxState,
  setUsersFromDataBase,
} from "../../Profile/ProfileSlice";
import styles from "./HeaderForm.module.css";

interface UserFormProps {
  setIsFormVisible: Function;
}

export default function HeaderForm({ setIsFormVisible }: UserFormProps) {
  const [isRegistrationForm, setIsRegistrationForm] = useState<boolean>(false);
  const users = useAppSelector((state) => state.profile.users);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserFormI>({
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const handleLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsRegistrationForm(!isRegistrationForm);
  };
  const formSubmit: SubmitHandler<UserFormI> = (data) => {
    if (isRegistrationForm) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          setIsFormVisible(false);
          let referenceToDataBase = db.ref(db.dataBase, "users");

          //Create new User
          let newUser: UserI = {
            id: "" + new Date(),
            email: data.email,
            name: "name",
            secondName: "secondName",
            phone: "phone",
            img: "../../assets/profile_Photo.png",
            wallPosts: [
              {
                id: "" + new Date(),
                message: "first post",
                likes: ["admin@gmail.com"],
                dislikes: ["admin@gmail.com"],
              },
            ],
            followers: ["admin@gmail.com"],
            following: ["admin@gmail.com"],
          };

          //Add new use to Data Base
          let arr = [...users];
          arr.push(newUser);
          db.update(referenceToDataBase, {
            ...arr,
          });

          //Reset the form
          reset();

          //Add current user to profileUser
          dispatch(setProfileUserInReduxState(userCredential.user.email));
          
          alert("User has been created !");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("User does not created !");
        });
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(setProfileUserInReduxState(user.email));
          alert("Welcome back !");
          setIsFormVisible(false);
          reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Try sign in again !");
        });
    }
  };

  return (
    <form className={styles.logIn_Form} onSubmit={handleSubmit(formSubmit)}>
      <label htmlFor="password" className={styles.LogIn_Label}>
        Password:
      </label>
      <input
        className={styles.logIn_Input}
        type="text"
        placeholder="Type your password..."
        {...register("password", {
          minLength: {
            value: 6,
            message: "Name longer that 6.",
          },
        })}
      />
      <label htmlFor="email" className={styles.LogIn_Label}>
        Email:
      </label>
      <input
        className={styles.logIn_Input}
        type="text"
        placeholder="Type your email..."
        {...register("email", {
          minLength: {
            value: 5,
            message: "Email contain @ and longer that 5.",
          },
          validate: (value: string) => value.includes("@"),
        })}
      />
      <div className={styles.logIn_Button_Section}>
        <button className={styles.logIn_Main_Button}>
          {isRegistrationForm ? "Registration" : "Sign In"}
        </button>
        <button
          className={styles.logIn_Link}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleLink(e)}
        >
          {isRegistrationForm ? "Sign In" : "Registration"}
        </button>
      </div>
    </form>
  );
}
