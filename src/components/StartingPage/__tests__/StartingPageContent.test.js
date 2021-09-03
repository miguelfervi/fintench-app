import React from "react";
import { render, screen } from "@testing-library/react";
import StartingPageContent from "../StartingPageContent";

test("renders component StartingPageContent", () => {
  render(<StartingPageContent />);
  const titleElement = screen.getByText(/Welcome to Fintech App!/i);
  expect(titleElement).toBeInTheDocument();
  const subTitleElement = screen.getByText(
    /click on Log In and sign in or sign up/i
  );
  expect(subTitleElement).toBeInTheDocument();
});

test("test content StartingPageContent", () => {
  render(<StartingPageContent />);
  const titleElement = screen.getByText(/Welcome to Fintech App!/i);
  const subTitleElement = screen.getByText(
    /click on Log In and sign in or sign up/i
  );
  expect(titleElement.textContent).toEqual("Welcome to Fintech App!");
  expect(subTitleElement.textContent).toEqual(
    "To start, click on Log In and sign in or sign up"
  );
});
