import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  act,
  getByTestId,
} from "@testing-library/react";
import App from "../../App";
import Spotify from "../../utilities/Spotify";

jest.mock("../../utilities/Spotify");

describe("App Component", () => {
  beforeEach(() => {
    // Clear any previous mock state and reset any mocks
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test("renders the App component with initial state", () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    expect(getByText("Jamz")).toBeInTheDocument();
    expect(getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  test("performs a search and displays search results", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<App />);

    // Mock the search function in Spotify
    Spotify.search.mockResolvedValue([
      { id: "1", name: "Track 1" },
      { id: "2", name: "Track 2" },
    ]);

    const searchInput = getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "test" } });

    const searchButton = getByTestId("SearchBar-button");
    fireEvent.click(searchButton);

    // Wait for the search results to be displayed
    await waitFor(() => {
      expect(getByText("Track 1")).toBeInTheDocument();
      expect(getByText("Track 2")).toBeInTheDocument();
    });
  });

  // Add more test cases for interaction with the playlist, saving, etc.
});
