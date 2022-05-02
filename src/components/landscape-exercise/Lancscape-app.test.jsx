import Landscape from "./Landscape-app"
import React from "react"
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react"
import '@testing-library/jest-dom'
// import Premiericon from "./premierBadge.svg"
import { rest } from 'msw'
import dataApp from "./reactData"
import { setupServer } from "msw/node"
import LandscapeStories from "./Landscape.stories"
import Landscape from "./lanscape-app"
// Acceptance Criteria
// can display components from json based on variations
// landscape cards has progress bar calculated from watch_duration / duration * 100 %

//============================================================================================================================================================
const server = setupServer(
    rest.get('./data/landscapeData.json', (req, res, ctx) => {
        return res(ctx.json(landscapeData))
    })
)

beforeAll(() => server.listen())
beforeEach(()=> {
    server.use(...LandscapeStories.parameters.msw)
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
// ============================================================================================================================================================


//criteria 1
test("can display components from json based on variations", async () => {
    render( <Landscape/> )
    

    expect(screen.getByText("LOADING")).toBeVisible() // kalo blom show content --> loading
    // screen.debug()
    const heading = await screen.findByRole("heading") // store heading di variable
    expect(heading).toBeVisible() // show content 
    // console.log(screen.queryByText("LOADING"))
    expect(screen.queryByText("LOADING")).not.toBeInTheDocument()
})


//criteria 2
test.only("watch duration is visible - progress bar", async () => {
    render (<Landscape/>)

    const duration = await screen.queryByDisplayValue('watch_duration')
    expect(duration).toBeCalled
})

//criteria 3 

test("when watch duration is visible display clock", async () => {
    render(<Landscape/>)

    const clockDisplay = await screen.queryAllByText('clockDisplay')
    expect(clockDisplay).toBeVisible
})