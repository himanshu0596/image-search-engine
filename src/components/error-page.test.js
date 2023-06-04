import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorPage from "./error-page";

describe("ErrorPage", () => {
  it("renders the component and checks for the messages displayed on screen", async () => {
    // Render the component
    render(<ErrorPage />);

    // Check if error title is diplayed
    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();

    // Check if error message is diplayed
    expect(
      screen.getByText("We apologize, but an error occurred.")
    ).toBeInTheDocument();
    expect(screen.getByText("Please try again later.")).toBeInTheDocument();
  });
});
