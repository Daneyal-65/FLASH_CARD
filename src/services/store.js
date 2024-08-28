import { configureStore } from "@reduxjs/toolkit";
import flashCardSlice from "./cards";

const store = configureStore({
  reducer: {
    cardData: flashCardSlice,
  },
});
export default store;
