import App from "./App"
import React from "react"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import Premiericon from "./premierBadge.svg"
import { rest } from 'msw'
import dataApp from "./reactData"


// 1. when api is exist; then render component 
// 2. when api is failed; render empty state 
// 3. when is not premier; not render premier badge
// etc
test("when api is exist; then render the component", () => {
    render( <App /> )
    expect(screen.getByRole("heading")).toBeVisible()

})
       
  
