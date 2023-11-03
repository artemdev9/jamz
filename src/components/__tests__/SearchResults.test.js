import React from "react";
import { render } from "@testing-library/react";
import SearchResults from "../SearchResults";

describe("SearchResults Component", () => {
  // Define some mock functions for testing
  const mockAddTrack = jest.fn();

  const defaultProps = {
    searchData: [
      { id: 1, name: "Track 1" },
      { id: 2, name: "Track 2" },
    ],
    addTrack: mockAddTrack,
  };

  test("renders the SearchResults component", () => {
    const { getByText } = render(<SearchResults {...defaultProps} />);

    // Check if the component renders with the provided props
    expect(getByText("Results")).toBeInTheDocument();
    expect(getByText("Track 1")).toBeInTheDocument();
    expect(getByText("Track 2")).toBeInTheDocument();
  });
});
