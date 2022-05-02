import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import categoryData from "./categoryData";
import { setupServer } from "msw/node";
import CategoryStories from "./Category.stories";
import Category from "./Category";
import { error } from "kitsu-core";
import { addParameters } from "@storybook/react";

const server = setupServer();
// rest.get('./data/categoryData.json',
//     (req, res, ctx) => {
//         return res(ctx.json(categoryData))
//     })

beforeAll(() => server.listen());
beforeEach(() => {
  server.use(...CategoryStories.parameters.msw);
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// criteria consumed API data with response array of sections informations
// can display components from json based on variations [on going]
// it will have 4 states:
// - success with contents
// - success with no - content: print empty
// - is - loading: shimmer(same as current m.vidio.com) [done]
// - error: create an empty component(same as m.vidio.com)

// test 1 -- fetching json
test("loading expect to be render while fetching JSON file", async () => {
  render(<Category />);

  await screen.findByText("Lanjut Nonton, Yuk!");
  expect(screen.getAllByTestId("watch-data")[0]).toBeInTheDocument();
  expect(screen.getAllByTestId("potrait-data")[0]).toBeInTheDocument();
  // cek lanjut menonton content 1
  // cek top 10 this week
});

// oke
// hmm udah keluar sih videonya tapi cuma ada atribut id aja, coba kucek lagi deh
// oke udah bisa tuh, coba kalian di category.jsx, render nya <span>{video.title}</span> deh
/**
 * ini isi dari watchdata  seteleh dideserialise eh wait kok bukan array ya
 * ooh nanti kamu baca dari data.relationships.content.map(data => ...)
 * debug watchData {
      type: 'section',
      id: '2098',
      attributes: {
        title: 'Lanjut Nonton, Yuk!',     
        variation: 'landscape_horizontal',
        data_source: 'continue_watching',
        view_more_url: 'https://www.vidio.com/sections/2098-lanjut-nonton-yuk',
        mobile_background_image_url: 'https://static-web.prod.vid.id/assets/default/medium_portrait-bbacc7b0a32724a082b836ccd29395a8e6dbaeee656dd123a55ccc5ae5bf6dbb.png',
        background_color: '#000000',
        segments: [ 'variant_a' ],
        base_variation: 'landscape'
      },
      relationships: { contents: { data: [Array] } }
    }
 */

/**
 * 1. render component
 * 2. fetch data categories
 * 3. deserialise
 * 4. tampilin loading,
 * 5. tampilin title section
 * 6. fetch ulang untuk isi section
 */

// ERROR
test("create an empty component when error comes up!", async () => {
  jest
    .spyOn(window, "fetch")
    .mockReturnValue(Promise.reject(new Error("OOPs")));

  render(<Category />);

  const errorContent = await screen.findByTestId("errorContent");
  expect(errorContent).toBeInTheDocument;
  // const throwAnError = jest.spyOn(window, "fetch").mockImplementation(()=> {
  //   Promise.reject(new Error())
  // })
  // jest.spyOn(window, "fetch").mockImplementation(()=> {
  //   throw new Error();
  // })

  // render(<Category/>)

  // expect(window.fetch).toThrow(Error);
  // const errorContent = screen.findByAltText("error-Content")
  // expect(errorContent).toBeInTheDocument

  // await waitFor(jest.fn())
  // screen.debug()
  // const errorContent = await screen.findByTestId("errorContent")
  // expect(errorContent).toBeVisible()
});

// gue mau coba bikin beda abis ini gk tau bener atau kgk

// tahap testing
// preperation
//

// TITLE
test("rendering section title when Fetching data from JSON", async() => {
  render(<Category/>)
  
  const title = await screen.findByText("Siaran Pilihan")
  expect(title).toBeVisible()
})

//GAMBAR
test("rendering cover_url when Fetching data from JSON", async() => {
  render(<Category/>)

  const coverURL = await screen.findAllByTestId("coverURL")
  expect(coverURL).toBeTruthy();
})

// PREMIER BADGE
test("render premier_badge when the content is premier", async() => {
  render(<Category/>)

  const imagePremiere = await screen.findAllByTestId("image-premiere")
  expect(imagePremiere).toBeTruthy();
})

//VIDEO DURATION 
test("render video_duration when the content is rendered", async() => {
  render(<Category/>)

  const videoDuration = await screen.findAllByTestId("videoDuration")
  videoDuration.forEach((video)=>{
    expect(video).toBeInTheDocument()
  })
})

// PROGRESS BAR
test("render progress_bar when the content is rendered", async() => {
  render(<Category/>)

  const progressBar = await screen.findAllByTestId("progressBar")
  progressBar.forEach((progress) => {
    expect(progress).toBeVisible()
  })
})

// CONTENT TITLE
test("render title_content when the content is rendered", async() => {
  render(<Category/>)

  const titleContent = await screen.findAllByTestId("tulisanBro")
  titleContent.forEach((title)=>{
    expect(title).toBeInTheDocument()
  })
})




