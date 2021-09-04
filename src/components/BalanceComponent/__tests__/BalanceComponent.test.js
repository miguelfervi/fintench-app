import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import BalanceComponent from "../BalanceComponent";
import * as reactRedux from "react-redux";

import { createStore } from "redux";

import { walletReducer } from "../../../reducers/walletReducer";

afterEach(cleanup);
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

beforeEach(() => {
  useSelectorMock.mockClear();
});

const renderComponent = ({ balance, history }) =>
  render(
    <reactRedux.Provider
      store={createStore(walletReducer, { balance, history })}
    >
      <BalanceComponent />
    </reactRedux.Provider>
  );

describe("BalanceComponent", () => {
  test("renders component with balance 1000", () => {
    useSelectorMock.mockReturnValue({ balance: 1000 });
    renderComponent({ balance: 1000 });
    const titleElement = screen.getByTestId("balance");
    expect(titleElement).toHaveTextContent(/1000/i);
  });

  test("renders component with right Header", () => {
    useSelectorMock.mockReturnValue({ balance: 0 });
    renderComponent({ balance: 0 });
    const titleElement = screen.getByTestId("balance");
    expect(titleElement).toHaveTextContent(/Your wallet/i);
    expect(titleElement).not.toHaveTextContent(/1000/i);

  });
});
