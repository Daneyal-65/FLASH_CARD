import { createSlice } from "@reduxjs/toolkit";

export const flashCardTermSlice = createSlice({
  name: "cardInfo",
  initialState: JSON.parse(localStorage.getItem("data")) || [],
  reducers: {
    setCardsData: (state, action) => {
      const DataForLocalStorageAndState = [...state, action.payload];
      const jsonData = JSON.stringify([...DataForLocalStorageAndState]);
      localStorage.setItem("data", jsonData);
      return DataForLocalStorageAndState;
    },
  },
});

export const { setCardsData } = flashCardTermSlice.actions;

export default flashCardTermSlice.reducer;
