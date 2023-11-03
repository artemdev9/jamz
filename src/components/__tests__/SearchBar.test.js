import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";

test("renders the SearchBar component", () => {
  render(<SearchBar />);
  const searchBarContainer = screen.getByTestId("SearchBar");
  expect(searchBarContainer).toBeInTheDocument();
});

test("handles input change correctly", () => {
  render(<SearchBar />);
  const inputElement = screen.getByTestId("SearchBar-input");

  fireEvent.change(inputElement, { target: { value: "test" } });

  expect(inputElement.value).toBe("test");
});

test("triggers search when Enter key is pressed", () => {
  const onSearchMock = jest.fn();
  render(<SearchBar onSearch={onSearchMock} />);
  const inputElement = screen.getByTestId("SearchBar-input");

  fireEvent.change(inputElement, { target: { value: "test" } });
  fireEvent.keyDown(inputElement, { key: "Enter", code: 13, charCode: 13 });

  expect(onSearchMock).toHaveBeenCalledWith("test");
});

test("triggers search when button is clicked", () => {
  const onSearchMock = jest.fn();
  render(<SearchBar onSearch={onSearchMock} />);
  const inputElement = screen.getByTestId("SearchBar-input");
  const buttonElement = screen.getByTestId("SearchBar-button");

  fireEvent.change(inputElement, { target: { value: "test" } });
  fireEvent.click(buttonElement);

  expect(onSearchMock).toHaveBeenCalledWith("test");
});
