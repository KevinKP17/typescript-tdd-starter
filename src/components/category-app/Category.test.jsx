import React from "react";
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { rest } from 'msw'
import categoryData from "./categoryData";
import { setupServer } from "msw/node";
import CategoryStories from './Category.stories'
import Category from "./Category"

const server = setupServer(
    // rest.get('./data/categoryData.json',
    //     (req, res, ctx) => {
    //         return res(ctx.json(categoryData))
    //     })
)

beforeAll(() => server.listen());
beforeEach(() => {
    server.use(...CategoryStories.parameters.msw)
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


// criteria consumed API data with response array of sections informations
// can display components from json based on variations [on going]
// it will have 4 states:
// - success with contents 
// - success with no - content: print empty
// - is - loading: shimmer(same as current m.vidio.com) [done]
// - error: create an empty component(same as m.vidio.com)


// test 1 -- fetching json
test.only("loading expect to be render while fetching JSON file", async() => {
    render(< Category />)
    expect(screen.getByText("LOADING")).toBeVisible()

    const heading = await screen.findByRole("heading")
    screen.debug()
    expect(heading).toBeVisible()
    expect(screen.queryByText("LOADING")).not.toBeInTheDocument()
})

//test 2 
test("can display components from json based on variations", async() => {
    render(<Category/>)

    const category  = await screen.find
    expect()
})






