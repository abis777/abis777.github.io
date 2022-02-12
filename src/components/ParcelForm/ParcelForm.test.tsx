import React from "react";
import { render, screen } from "@testing-library/react";
import ParcelForm from "./ParcelForm";

test("renders length input", () => {
  render(<ParcelForm />);
  const lengthInput = screen.getByLabelText(/length/i);
  expect(lengthInput).toBeInTheDocument();
});

test("renders breadth input", () => {
  render(<ParcelForm />);
  const breadthInput = screen.getByLabelText(/breadth/i);
  expect(breadthInput).toBeInTheDocument();
});

test("renders height input", () => {
  render(<ParcelForm />);
  const heightInput = screen.getByLabelText(/height/i);
  expect(heightInput).toBeInTheDocument();
});

test("renders weight input", () => {
  render(<ParcelForm />);
  const weightInput = screen.getByLabelText(/weight/i);
  expect(weightInput).toBeInTheDocument();
});
