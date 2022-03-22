import Hello from "./index";

import React from "react";
import { render, screen } from "@testing-library/react";

// test("snapshot", () => {
//   const {asFragment} = render(<Hello name={"Khea"} />);

//   expect(asFragment()).toMatchSnapshot();
// })

test("Hello Component", () => {
  render(<Hello name={"Khea"} />);

  console.error(screen.queryByRole("heading"))
  expect(screen.queryByRole("heading")).toBeInTheDocument()
});
