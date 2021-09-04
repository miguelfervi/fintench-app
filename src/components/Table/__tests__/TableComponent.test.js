import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import TableComponent from "../TableComponent";

afterEach(cleanup);

const exampleData = [
  { id: "kt5j9c3h", description: "You have deposited from the wallet $100000" },
  { id: "kt5j9gz9", description: "You send credit $1000 to Juan" },
];
describe("TableComponent", () => {
  test("renders component TableComponent", () => {
    render(<TableComponent data={[]} />);
    const tableResult = screen.getByTestId("table");

    expect(tableResult).toHaveTextContent("There is no transactions.");
  });


    test("renders component TableComponent with data", () => {
      render(<TableComponent data={exampleData} />);
      const tableResult = screen.getByTestId("table");
  
      expect(tableResult).toHaveTextContent(/kt5j9c3h/i);
    });
  });