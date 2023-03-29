import { createSlice } from "@reduxjs/toolkit";

interface WallSliceI {
  value: number;
}

const initialState: WallSliceI = {
  value: 10,
}

export const wallSlice = createSlice({
  name: "wall",
  initialState,
  reducers: {
    incrementWall: (state) => {
        state.value += 1;
    }
  },
});

export const { incrementWall } = wallSlice.actions;

export default wallSlice.reducer;
