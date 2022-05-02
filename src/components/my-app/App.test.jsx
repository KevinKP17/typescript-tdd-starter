import App from "./App"
import React from "react"
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react"
import '@testing-library/jest-dom'
// import Premiericon from "./premierBadge.svg"
import { rest } from 'msw'
import dataApp from "./reactData"
import { setupServer } from "msw/node"
import AppStories from "./App.stories"


// 1. when api is exist; then render component 
// 2. when api is failed; render empty state 
// 3. when is not premier; not render premier badge
// etc

// const server = setupServer(
//     rest.get('/greeting', (req, res, ctx) => {
//       return res(ctx.json({greeting: 'hello there'}))
//     }),
//   )
// ============================================================================================================================================================
const server = setupServer(
    rest.get('./data/Potrait.json', (req, res, ctx) => {
        return res(ctx.json(dataApp))
    })
)

beforeAll(() => server.listen())
beforeEach(() => {
    server.use(...AppStories.parameters.msw)
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
    // ============================================================================================================================================================

//test -1
test("when api is exist; then render the component", async() => {
    render( < App / > ) // render fungsi tp blom di show content

    expect(screen.getByText("LOADING")).toBeVisible() // kalo blom show content --> loading
        // screen.debug()
    const heading = await screen.findByRole("heading") // store heading di variable
    expect(heading).toBeVisible() // show content 
        // console.log(screen.queryByText("LOADING"))
    expect(screen.queryByText("LOADING")).not.toBeInTheDocument() // loading hilang
});

// test -2
test("when api is failed; render empty state", async() => {
    render( < App / > )

    const heading = await screen.findByRole("heading")
    expect(heading).toBeVisible();
    expect(heading).not.toBeInTheDocument;

})

//test -3 
test("when is not premier; not render premier badge", async() => {
        // global.fetch = jest.fn(()=> Promise.resolve(
        //     {json:()=> Promise.resolve({data: {
        //         attributes: {
        //             title : "premier"
        //         }
        //     }})
        // }))
        render( < App / > )
        await waitFor(jest.fn()) //function
            // await waitForElementToBeRemoved( () => {
            //     screen.findByTestId("loading")
            // })
            // screen.debug();
        const image = screen.queryByAltText('premier-badge')
            // expect(image).toBeVisible()
        expect(image).not.toBeInTheDocument;
    })
    //CARA NYARI TAHU APP BERHASIL ATAU TIDAK?



//progress bar 
// 1. when section is consume ; track the duration 
// 2. when section is not consume ; do not show the progress bar 
// 3. when section is already consume ; do not show the progress bar