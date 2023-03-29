import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '../features/Profile/ProfileSlice';
import wallReducer from '../features/Wall/WallSlice';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        wall: wallReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch