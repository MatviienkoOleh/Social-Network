import { createSlice } from "@reduxjs/toolkit";
import { UserI } from "../../interface/global";

interface anotherUserSliceI {
  anotherUser: UserI | any;
  updateUserFlag: boolean;
  updateSubscribers: boolean;
};

const initialState: anotherUserSliceI = {
  anotherUser: undefined,
  updateUserFlag: true,
  updateSubscribers: false,
};

export const anotherUserSlice = createSlice({
  name: "anotherUser",
  initialState,
  reducers: {
    addAnotherUser: (state, action) => {
      state.anotherUser = action.payload;
    },
    clearAnotherUser: (state, action) => {
      state.anotherUser = undefined;
    },
    updateUsersFlag: (state, action) => {
        state.updateUserFlag = action.payload;
    },
    setUpdateSubscribers: (state,action) => {
      state.updateSubscribers = action.payload;
    }
  },
});

export const { addAnotherUser, clearAnotherUser,updateUsersFlag, setUpdateSubscribers } = anotherUserSlice.actions;
export default anotherUserSlice.reducer;
