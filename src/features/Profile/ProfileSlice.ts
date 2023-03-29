import { createSlice } from "@reduxjs/toolkit";
import { UserI } from "../../interface/global";

interface ProfileSliceI {
  value: number;
  users: UserI[];
  profileUser: UserI | any;
}

const initialState: ProfileSliceI = {
  value: 0,
  users: [],
  profileUser: {},
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUsersFromDataBase: (state, action) => {
      state.users = action.payload;
    },
    setProfileUserInReduxState: (state, action) => {
      state.profileUser = state.users.find(
        (user) => user.email === action.payload
      );
    },
    clearProfileUser: (state) => {
      state.profileUser = {};
    },
  },
});

export const {
  setUsersFromDataBase,
  setProfileUserInReduxState,
  clearProfileUser,
} = profileSlice.actions;

export default profileSlice.reducer;
