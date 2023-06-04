import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ImageSearch from "./Image-search";
import axios from "axios";
import nock from "nock";
import MockAdapter from "axios-mock-adapter";

// Mock the console error method
const consoleErrorMock = jest.spyOn(console, "error");
consoleErrorMock.mockImplementation(() => {});

describe("ImageSearch", () => {
  let mock;

  beforeEach(() => {
    // Clear the mock implementation and reset the mock calls before each test
    consoleErrorMock.mockClear();

    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    // Restore the original console error method after all tests
    consoleErrorMock.mockRestore();
  });

  it("should handle API error", async () => {
    // Mock the API error response
    mock
      .onGet("https://api.unsplash.com/search/photos?query=cat&page=1")
      .reply(500, "Internal Server Error");

    // Render the component
    render(<ImageSearch />);

    // Simulate user input and submit the form
    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "cat" } });
    fireEvent.click(searchButton);

    // Wait for the error state to be rendered
    await waitFor(() => {
      expect(
        screen.getByText("Oops! Something went wrong.")
      ).toBeInTheDocument();
    });
  });

  it("renders the component and performs a search", async () => {
    // Mock the API call
    const mockedResponse = {
      results: [
        {
          id: "1",
          urls: { regular: "https://example.com/image1.jpg" },
          alt_description: "Image 1",
        },
        {
          id: "2",
          urls: { regular: "https://example.com/image2.jpg" },
          alt_description: "Image 2",
        },
      ],
    };
    mock
      .onGet("https://api.unsplash.com/search/photos?query=cat&page=1")
      .reply(200, mockedResponse);

    // Render the component
    render(<ImageSearch />);

    // Check if the header is rendered
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("Welcome...")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please try to search an image using the search bar on top."
      )
    ).toBeInTheDocument();

    // Simulate user input and submit the form
    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "cat" } });
    fireEvent.click(searchButton);

    // Check if the loading indicator is displayed
    expect(screen.getByText("Loading..")).toBeInTheDocument();

    // Wait for the API request to complete and images to be rendered
    const lazyImages = await screen.findAllByTestId("lazy-image");
    const lazyImage = lazyImages[0];

    expect(lazyImage).toBeInTheDocument();

    // Check if the console error was not called with the unique key error
    expect(consoleErrorMock).not.toHaveBeenCalledWith(
      expect.stringContaining(
        'Each child in a list should have a unique "key" prop'
      )
    );
  });
});
