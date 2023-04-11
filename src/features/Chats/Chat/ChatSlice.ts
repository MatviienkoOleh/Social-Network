import { createSlice } from "@reduxjs/toolkit";
import { ChatI } from "../../../interface/global";

interface chatSliceI {
  email: string;
  chat: ChatI[];
}

const initialState: chatSliceI = {
  email: "",
  chat: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },
  },
});

export const { setEmail, setChat, } = chatSlice.actions;
export default chatSlice.reducer;
