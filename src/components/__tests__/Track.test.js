import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Track from "../Track";

describe("Track Component", () => {
  // Define some mock functions for testing
  const mockAddTrack = jest.fn();
  const mockRemoveTrack = jest.fn();

  const defaultProps = {
    track: {
      id: 1,
      name: "Track 1",
      artist: "Artist 1",
      album: "Album 1",
    },
    isRemoval: false,
    addTrack: mockAddTrack,
    removeTrack: mockRemoveTrack,
  };

  test("renders the Track component", () => {
    const { getByText } = render(<Track {...defaultProps} />);

    // Check if the component renders with the provided props
    expect(getByText("Track 1")).toBeInTheDocument();
    expect(getByText("Artist 1 | Album 1")).toBeInTheDocument();
  });

  test("calls addTrack when the + button is clicked", () => {
    const { getByText } = render(<Track {...defaultProps} />);
    const addButton = getByText("+");

    fireEvent.click(addButton);

    // Check if the addTrack function was called
    expect(mockAddTrack).toHaveBeenCalledWith(defaultProps.track);
  });

  test("calls removeTrack when the - button is clicked", () => {
    const removalProps = {
      ...defaultProps,
      isRemoval: true,
    };
    const { getByText } = render(<Track {...removalProps} />);
    const removeButton = getByText("-");

    fireEvent.click(removeButton);

    // Check if the removeTrack function was called
    expect(mockRemoveTrack).toHaveBeenCalledWith(removalProps.track);
  });
});
