import React from "react";
import { render, screen } from "@testing-library/react";
import InitialPage from "./initial-page";

describe("InitialPage", () => {
  it("renders the component and checks for the welcome messages displayed on screen", async () => {
    // Render the component
    render(<InitialPage />);

    // Check if welcome title is diplayed
    expect(screen.getByText("Welcome...")).toBeInTheDocument();

    // Check if welcome message is diplayed
    expect(
      screen.getByText(
        "Please try to search an image using the search bar on top."
      )
    ).toBeInTheDocument();
  });
});
