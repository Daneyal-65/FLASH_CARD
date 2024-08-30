import { configureStore } from "@reduxjs/toolkit";
import flashCardSlice from "./cards";
// setup store configration
const store = configureStore({
  reducer: {
    cardData: flashCardSlice,
  },
});
export default store;
