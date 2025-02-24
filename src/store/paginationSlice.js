import { BASE_CHARACTER } from "@/config/environtment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: BASE_CHARACTER,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = paginationSlice.actions;

export default paginationSlice.reducer;
