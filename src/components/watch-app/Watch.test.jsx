import React from "react"
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { rest } from 'msw'
import watchData from './watchData'
import { setupServer } from "msw/node";
import WatchStories from "./Watch.stories";
import Watch,{ timeHelper} from "./Watch";

const server = setupServer(
    // rest.get('./data/watchData.json', (req, res, ctx) => {
    //     return res(ctx.json(watchData))
    // })
)

beforeAll(() => server.listen());
beforeEach(() => {
    server.use(...WatchStories.parameter.msw)
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


//criteria
// can display components from json based on variations
// // landscape cards has progress bar calculated from watch_duration / duration * 100 %

//test 1
test.only("can display components from json based on variations", async() => {
    render( <Watch/>)
    expect(screen.getByText("LOADING")).toBeVisible()

    const heading = await screen.findByRole("heading")
    screen.debug()
    expect(heading).toBeVisible()
    expect(screen.queryByText("LOADING")).not.toBeInTheDocument()
})

// test 2 
test("can display title when rendering components from json", async()=> {
    render(<Watch/>)

    const titleWatch = await screen.getByText("titleWatch")
    expect(titleWatch).toBeVisible()
})

//test 3 
test("can display coverURL when rendering components from json", async() => {
    render(<Watch/>)
    await waitFor(jest.fn())
    const coverURL = screen.queryByAltText('coverURL')
    expect(coverURL).toBeInTheDocument()
})

//test 4 {
test("can display watchDuration when rendering the components from json", async() => {
    render(<Watch/>)

    const watchDuration = await screen.queryByRole("watchDuration");
    expect(watchDuration).toBeVisible()
})

//test 5 
// test("display progress bar when rendering watchDuration from json", async() => {
//     render(<Watch/>)

//     const progressBar = await screen.findByDisplayValue("progressBar");
//     expect(progressBar).toBeVisible()
// })

//test 5
test("time helper will return formated duration when parameters in seconds", async() => { 
    // unit test --> function 
    expect(timeHelper(3600)).toEqual("01:00:00");
    expect(timeHelper(60)).toEqual("01:00");
    expect(timeHelper(120)).toEqual("02:00");
})

//test 6
test("progress bar will be visible when rendering", async() => {
    render(<Watch/>)

    const progressBar = await screen.findByTestId("progressBar-test")
    expect(progressBar).toBeVisible()
})