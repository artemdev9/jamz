import React from "react";
import { getAllByText, render } from "@testing-library/react";
import TrackList from "../TrackList";

describe("TrackList Component", () => {
  // Define some mock functions for testing
  const mockAddTrack = jest.fn();
  const mockRemoveTrack = jest.fn();

  const sampleTracks = [
    { id: 1, name: "Track 1" },
    { id: 2, name: "Track 2" },
    { id: 3, name: "Track 3" },
  ];

  const defaultProps = {
    tracks: sampleTracks,
    addTrack: mockAddTrack,
    removeTrack: mockRemoveTrack,
    isRemoval: false,
  };

  test("renders the TrackList component", () => {
    const { getByText } = render(<TrackList {...defaultProps} />);

    // Check if the component renders with the provided props
    sampleTracks.forEach((track) => {
      expect(getByText(track.name)).toBeInTheDocument();
    });
  });
});
