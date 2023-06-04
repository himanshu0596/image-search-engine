import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./header";

describe("Header", () => {
  it("renders the component and checks for the header bar and search form displayed", async () => {
    // Render the component
    render(<Header />);

    // Check if header is diplayed
    expect(screen.getByTestId("header")).toBeInTheDocument();

    // Check if search input is diplayed
    expect(screen.getByTestId("search-input")).toBeInTheDocument();

    // Check if search input is diplayed
    expect(screen.getByTestId("search-button")).toBeInTheDocument();

    // Check if logo is diplayed
    expect(screen.getByText("Lowe's")).toBeInTheDocument();
  });
});
