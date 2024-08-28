import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CreateFlashCardPage } from "../pages/CreateFlashCardPage";

import "@testing-library/jest-dom";

jest.mock(
  "../utils/Base64",
  () => (file) => Promise.resolve("data:image/png;base64,mockBase64String")
);

describe("CreateFlashCardPage", () => {
  const mockStore = configureStore([]);
  let store = mockStore([]);
  it("should submit the correct form data to Redux", async () => {
    const { getByPlaceholderText, getByText, getByAltText, getByTestId } =
      render(
        <Provider store={store}>
          <CreateFlashCardPage />
        </Provider>
      );

    fireEvent.change(getByPlaceholderText("Create Group"), {
      target: { value: "Sample Group" },
    });

    fireEvent.change(getByTestId("description"), {
      target: { value: "Sample Description" },
    });

    fireEvent.change(getByTestId("term"), {
      target: { value: "Sample Term" },
    });
    fireEvent.change(getByTestId("term_d"), {
      target: { value: "Sample Definition" },
    });

    const imageFile = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    fireEvent.change(getByAltText("imgSelect"), {
      target: { files: [imageFile] },
    });

    fireEvent.click(getByTestId("genrateCard"));

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe("cardInfo/setCardsData");
      expect(actions[0].payload).toEqual({
        groupname: "Sample Group",
        description: "Sample Description",
        groupImg: "data:image/png;base64,mockBase64String",
        terms: [
          {
            term_name: "Sample Term",
            description: "Sample Definition",
            term_image: null,
          },
        ],
      });
    });
  });
});
