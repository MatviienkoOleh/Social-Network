import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/Profile/ProfileSlice";
import anotherUserReducer from "../features/AnotherUser/AnotherUserSlice";
import chatReducer from '../features/Chats/Chat/ChatSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    anotherUser: anotherUserReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
