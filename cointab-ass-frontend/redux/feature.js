import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalMessage: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const message = action.payload;
      state.isModalOpen = true;
      state.modalMessage = message;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalMessage = "";
    },
  },
});

export const { openModal, closeModal } = appSlice.actions;

export const appReducer = appSlice.reducer;
