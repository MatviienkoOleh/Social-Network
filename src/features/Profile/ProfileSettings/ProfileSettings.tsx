import { ref } from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../../app/hooks";
import { db, st } from "../../../firebase";
import { ChangeFormUserI } from "../../../interface/global";
import styles from "./ProfileSettings.module.css";

export default function ProfileSettings() {
  const profileUser = useAppSelector((state) => state.profile.profileUser);
  const users = useAppSelector((state) => state.profile.users);
  const [image, setImage] = useState<string>();
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangeFormUserI>({
    defaultValues: {
      name: profileUser.name,
      phone: profileUser.phone,
      secondName: profileUser.secondName,
      img: "",
    },
  });

  const setURL = (event: any) => {
    let url = URL.createObjectURL(event.target.files[0]);
    setImage(url);
  };
  const asyncFunction = async (
    data: ChangeFormUserI,
    storageReference: any
  ) => {
    //Add image to DataBase
    let copyUrl = "";
    await st
      .getDownloadURL(storageReference)
      .then((ref) => {
        copyUrl += ref;
      })
      .catch((error) => console.log(error));

    // update DB with new array
    const referenceToDb = db.ref(db.dataBase, "users");
    const copyUsers = users.map((user) => {
      if (user.email === profileUser.email) {
        const newProfileUser = {
          ...profileUser,
          ...data,
          img: copyUrl,
        };
        return newProfileUser;
      }
      return user;
    });
    db.update(referenceToDb, {
      ...copyUsers,
    });
  };
  const formSubmit = (data: ChangeFormUserI) => {
    if (image) {
      //disabled the button
      setIsFormDisabled(true);
      //Add profilePhotoToStorage
      let storageReference = ref(st.storage, `${profileUser.email}`);
      const fileURL: any = data.img[0];
      st.uploadBytes(storageReference, fileURL).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });

      //Wait 5s for data to be ready
      setTimeout(() => {
        asyncFunction(data, storageReference);
      }, 5000);

      alert("Profile has been changed , please wait a second!");

      //enable the button
      setTimeout(() => {
        setIsFormDisabled(false);
      }, 5000);
    } else {
      alert("Please add a picture!");
    }
  };

  return (
    <div className={styles.profile_Settings_Wrapper}>
      <form
        className={styles.profile_Settings_Form}
        onSubmit={handleSubmit(formSubmit)}
      >
        <div className={styles.profile_Settings_Img_Block}>
          <img
            className={styles.profile_Setting_Image}
            src={
              image
                ? image
                : profileUser.img
                ? profileUser.img
                : "../../assets/profile_Photo.png"
            }
          />
        </div>

        <label className={styles.profile_Settings_Label} htmlFor="firstName">
          Name
        </label>
        <input
          className={styles.profile_Settings_Inputs}
          {...register("name", {
            minLength: {
              value: 4,
              message: "Name longer than 4",
            },
          })}
        />
        <label className={styles.profile_Settings_Label} htmlFor="firstName">
          Second Name:
        </label>
        <input
          className={styles.profile_Settings_Inputs}
          {...register("secondName", {
            minLength: {
              value: 4,
              message: "Second Name longer than 4",
            },
          })}
        />
        <label className={styles.profile_Settings_Label} htmlFor="firstName">
          Phone number:
        </label>
        <input
          className={styles.profile_Settings_Inputs}
          {...register("phone", {
            minLength: {
              value: 10,
              message: "Phone longer than 4",
            },
          })}
        />
        <label className={styles.create_Position_Button_Label}>
          <img
            src="../../assets/upload_Image.png"
            className={styles.Upload_Image}
            alt="cloud"
          />
          Custom Upload
          <input
            className={styles.create_Position_Button}
            {...register("img", {
              onChange: (e) => setURL(e),
            })}
            type="file"
          />
        </label>
        <button
          disabled={isFormDisabled}
          className={styles.profile_Change_Button}
        >
          Change settings
        </button>
      </form>
    </div>
  );
}
