import Hello from "./index";

import React from "react";
import { render, screen } from "@testing-library/react";

test("Component contains premier badge", () => {
  const {asFragment} = render(<Hello name={"Khea"} isPremier={true} />);

  expect(screen.getByRole("heading")).toBeVisible()
  expect(screen.getByTestId("premier-badge")).toBeVisible()

  expect(asFragment()).toMatchSnapshot();
});

test("Component not contain premier badge", () => {
  const {asFragment} = render(<Hello name={"Khea"} isPremier={false} />);

  expect(screen.getByRole("heading")).toBeVisible()
  expect(screen.queryByTestId("premier-badge")).not.toBeInTheDocument()

  expect(asFragment()).toMatchSnapshot();
});
