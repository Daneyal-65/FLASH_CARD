import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateFlashCardPage as CreateFlashCard } from "../pages/CreateFlashCardPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import "@testing-library/jest-dom";

// Mock the redux store
const mockStore = configureStore([]);

// Mock the setCardsData action
jest.mock("../services/cards", () => ({
  setCardsData: jest.fn(),
}));

// Mock the toBase64 utility function
jest.mock("../utils/Base64", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue("mocked-base64-string"),
}));

describe("CreateFlashCard", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    global.URL.createObjectURL = jest.fn(() => "mocked-url");
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <CreateFlashCard />
      </Provider>
    );
  };

  test("renders the form elements", () => {
    renderComponent();
    expect(screen.getByLabelText(/Create Group/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload Image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Add Description/i)).toBeInTheDocument();
    expect(screen.getByTestId("genrateCard")).toBeInTheDocument();
  });

  test("allows adding more term cards", async () => {
    renderComponent();
    const addMoreButton = screen.getByText("+ Add more");

    expect(screen.getAllByText(/Enter Term/i)).toHaveLength(1);

    userEvent.click(addMoreButton);
    await waitFor(() => {
      expect(screen.getAllByText(/Enter Term/i)).toHaveLength(2);
    });
  });

  test("allows removing term cards", async () => {
    renderComponent();
    const addMoreButton = screen.getByText("+ Add more");

    userEvent.click(addMoreButton);
    await waitFor(() => {
      expect(screen.getAllByText(/Enter Term/i)).toHaveLength(2);
    });

    const deleteButtons = screen.getAllByLabelText("Delete Image");
    userEvent.click(deleteButtons[1]);

    await waitFor(() => {
      expect(screen.getAllByText(/Enter Term/i)).toHaveLength(1);
    });
  });

  test("handles file upload for group image", async () => {
    renderComponent();
    const file = new File(["test"], "test.png", { type: "image/png" });
    const uploadInput = screen.getByLabelText(/Upload Image/i);

    userEvent.upload(uploadInput, file);

    await waitFor(() => {
      expect(screen.getByTestId("FaCheckCircle")).toBeInTheDocument();
    });
  });

  test("handles file upload for term image", async () => {
    renderComponent();

    // Create a mock file
    const file = new File(["test"], "test.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 1024 }); // Add a size property

    // Get the file input and upload the mock file
    const uploadInput = screen.getByLabelText(/Select Image/i);
    userEvent.upload(uploadInput, file);

    // Wait for the image to appear
    await waitFor(() => {
      const img = screen.getByAltText("imgSelect");
      expect(img).toBeInTheDocument();
      // expect(img.src).toBe("mocked-url");
    });
  });
});
