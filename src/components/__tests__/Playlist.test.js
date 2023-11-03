import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Playlist from "../Playlist";

describe("Playlist Component", () => {
  const mockPlaylistNameChange = jest.fn();
  const mockPlaylistSave = jest.fn();
  const mockRemoveTrack = jest.fn();

  const defaultProps = {
    playlistName: "My Playlist",
    playlist: [
      { id: 1, name: "Track 1" },
      { id: 2, name: "Track 2" },
    ],
    playlistNameChange: mockPlaylistNameChange,
    playlistSave: mockPlaylistSave,
    removeTrack: mockRemoveTrack,
  };

  test("renders the Playlist component", () => {
    const { getByText, getByDisplayValue } = render(
      <Playlist {...defaultProps} />
    );

    // Check if the component renders with the provided props
    expect(getByDisplayValue("My Playlist")).toBeInTheDocument();
    expect(getByText("Track 1")).toBeInTheDocument();
    expect(getByText("Track 2")).toBeInTheDocument();
  });

  test("calls playlistNameChange when input changes", () => {
    const { getByDisplayValue } = render(<Playlist {...defaultProps} />);
    const inputElement = getByDisplayValue("My Playlist");

    fireEvent.change(inputElement, { target: { value: "New Playlist Name" } });

    // Check if the playlistNameChange function was called with the new value
    expect(mockPlaylistNameChange).toHaveBeenCalledWith("New Playlist Name");
  });

  test("calls playlistSave when the 'Add' button is clicked", () => {
    const { getByText } = render(<Playlist {...defaultProps} />);
    const addButton = getByText("Add");

    fireEvent.click(addButton);

    // Check if the playlistSave function was called
    expect(mockPlaylistSave).toHaveBeenCalled();
  });
});
