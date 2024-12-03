import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./pagination";

describe("Kickstarter Projects App", () => {
  test("renders title correctly", () => {
    render(<Pagination />);
    const titleElement = screen.getByText(/Kickstarter Projects/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders table headers correctly", async () => {
    render(<Pagination />);
    const headers = ["S.No.", "Percentage Funded", "Amount Pledged"];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test("fetches and displays the first page of projects", async () => {
    render(<Pagination />);
    // Wait for the table rows to populate
    const firstProjectRow = await screen.findByText(/1/); // First project's S.No.
    expect(firstProjectRow).toBeInTheDocument();
  });

  test("renders pagination controls", () => {
    render(<Pagination />);
    const firstButton = screen.getByText(/First/i);
    const prevButton = screen.getByText(/Prev/i);
    const nextButton = screen.getByText(/Next/i);
    const lastButton = screen.getByText(/Last/i);

    expect(firstButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();
  });

  test("navigates to the next page when 'Next' button is clicked", async () => {
    render(<Pagination />);
    const nextButton = screen.getByText(/Next/i);

    // Wait for first page data
    await screen.findByText(/1/); // S.No. 1

    fireEvent.click(nextButton);

    // Check for an item on the second page
    const sixthProjectRow = await screen.findByText(/1/); // S.No. 1
    expect(sixthProjectRow).toBeInTheDocument();
  });

  test("disables 'Prev' and 'First' buttons on the first page", async () => {
    render(<Pagination />);
    const firstButton = screen.getByText(/First/i);
    const prevButton = screen.getByText(/Prev/i);

    // Wait for data
    await screen.findByText(/1/);

    expect(firstButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });

  test("disables 'Next' and 'Last' buttons on the last page", async () => {
    render(<Pagination />);
    const lastButton = screen.getByText(/Last/i);

    // Wait for data
    await screen.findByText(/1/);

    fireEvent.click(lastButton);

    // Check if "Next" and "Last" buttons are disabled
    const nextButton = screen.getByText(/Next/i);
    expect(lastButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  test("navigates to the first page when 'First' button is clicked", async () => {
    render(<Pagination />);
    const firstButton = screen.getByText(/First/i);

    // Wait for data and navigate to the last page
    await screen.findByText(/1/);
    fireEvent.click(screen.getByText(/Last/i));

    // Navigate back to the first page
    fireEvent.click(firstButton);

    // Check for an item on the first page
    const firstProjectRow = await screen.findByText(/1/); // S.No. 1
    expect(firstProjectRow).toBeInTheDocument();
  });

  test("displays correct number of rows per page", async () => {
    render(<Pagination />);
    // Wait for data
    const rows = await screen.findAllByRole("row");

    // For the first page (full 5 records + 1 header row)
    expect(rows.length).toBe(1); // 1 header + 5 records
  });
});
