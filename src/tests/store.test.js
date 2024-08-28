import { configureStore } from "@reduxjs/toolkit";
import flashCardSlice, { setCardsData } from "../services/cards";
// => test for redux store ,reducers,and dispatchEvents <=
// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn(() => null);
});

describe("Redux Store", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cardData: flashCardSlice,
      },
    });
  });

  test("should return the initial state", () => {
    const initialState = store.getState();
    expect(initialState.cardData).toEqual([]);
  });

  test("should update the state and localStorage when setCardsData is dispatched", () => {
    const card = { name: "Flashcard 1" };

    store.dispatch(setCardsData(card));

    const newState = store.getState();

    // Check the updated state
    expect(newState.cardData).toEqual([card]);

    // Check if localStorage was called with the correct data
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "data",
      JSON.stringify([card])
    );
  });
});
