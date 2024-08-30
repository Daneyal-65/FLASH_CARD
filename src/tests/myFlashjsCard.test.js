import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { MyFlashCard } from "../pages/MyFlashCard";
// moking redux store
const mockStore = configureStore([]);
// testing MyFlashCArd page =>
describe("MyFlashCard page", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      // dummy data for testing the behaviour
      cardData: [
        {
          groupname: "Group 1",
          groupImg: "img1.jpg",
          description: "Description 1",
          terms: [1, 2, 3],
        },
        {
          groupname: "Group 2",
          groupImg: "img2.jpg",
          description: "Description 2",
          terms: [1, 2, 3, 4],
        },
        {
          groupname: "Group 3",
          groupImg: "img3.jpg",
          description: "Description 3",
          terms: [1],
        },
      ],
    });
  });

  test("renders the flashcards correctly", () => {
    render(
      <Provider store={store}>
        <Router>
          <MyFlashCard />
        </Router>
      </Provider>
    );
    //  make sure the the ui is same by the length of card
    expect(screen.getAllByText(/View Cards/i)).toHaveLength(3);
  });

  test("displays correct number of cards after toggling threshold", async () => {
    render(
      <Provider store={store}>
        <Router>
          <MyFlashCard />
        </Router>
      </Provider>
    );

    // threshold value should be 3 of view cards ,initial
    expect(screen.getAllByText(/View Cards/i)).toHaveLength(3);

    const button = await screen.findByText((content, element) => {
      const hasText = (text) => text === "See All" || text === "See Few";
      return hasText(content) && element.tagName.toLowerCase() === "button";
    });

    fireEvent.click(button);

    // After toggling, all cards should be visible because data length is => 3
    expect(screen.getAllByText(/View Cards/i)).toHaveLength(3);
  });
});
