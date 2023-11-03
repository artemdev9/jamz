import React from "react";
import { render } from "@testing-library/react";
import Logo from "../Logo";

describe("Logo Component", () => {
  test("renders the Logo component", () => {
    const { container } = render(<Logo />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
