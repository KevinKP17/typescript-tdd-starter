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
test.only("loading expect to be render while fetching JSON file", async () => {
  jest.spyOn(window, "fetch");

  render(<Category />);

  expect(window.fetch).toBeCalledWith("./data/categoryData.json");

  // btw ini salah satu aja ternyata guys
  // soalnya loading hilang kan teks langsuyng muncul, ngga perlu await dua2nya

  // await waitForElementToBeRemoved(screen.getByText("LOADING"));
  await screen.findByText("Lanjut Nonton, Yuk!");

  expect(window.fetch).toBeCalledWith("data/watchData.json");
  // oke testnya merah krn kita belum implement ya
  // iy kak
  // berarti yang loading gk ush dipake kak?\
  // oke siap kak
  // iya ngga perlu, tadi aku cuma mau nunjukkin apa itu waitforelementtoberemoved aja
  // oh jadi di react testing library itu ada 3 cara query
  // getBy...
  // queryBy..

  // findBy.. hmm agak panjang jelasinnya, wait

  // oh kalian familiar sama waitFor() ngga?
  // eh getBytext tahu lah ya, dia buat query element berdasarkan text
  // nah ada kasus di mana element itu ngga langsung muncul (misal nunggu query dulu atau loading)
  // di sini kita pakai waitFor

  // await waitFor(() => getByText("wasd")) bakal jalanin getByText terus2an selama 1 detik
  // kalau ketemu, dia bakal balikin elementnya
  // kalau ngga ketemu bakal error
  // dan waitFor(() => getByText(..)) itu sama persis dengan findByText

  // hadu pas tadi kutulis
  // await screen.findByText(Nonton)
  // itu sama dengan
  // await waitFor(() => getByText(Nonton))
  // bingung ngga? haha
  // btw aku sampai jam 2 aja ya pairnya, nanti mau lanjut kerja
  //okee kakkk
  // Sedikit confuse tp mengerti gunanya, sipp pokknya kalau ada text yg belum langsung keluar, pakai find itu aja
  // await waitFor(jest.fn());
  //siap kak
  //tp kalo bs ajarin yang multiple fetch dulu dong kak
  // sipsip habis ini harusnya
  //oke
  screen.debug();
  // expect(title).toBeInTheDocument;
  // berarti buat test ke-2 ya kak? hmm test ke-2 buat title section ke-2 ya maksudmu? yg
  //test("wait untill element shows lanjut nonton yuk")
  // iy kak, oh boleh2, btw itu screen.findByText bisa juga ya jadi langsun findByText(Lanjut nonton yuk)

  /**
   * 1. render component
   * 2. fetch data categories
   * 3. deserialise
   * 4. tampilin loading,
   * 5. tampilin title section
   * 6. fetch ulang untuk isi section
   */
  // expect(screen.getByText("LOADING")).toBeVisible()

  // const heading = await screen.findByRole("heading")
  // screen.debug()
  // expect(heading).toBeVisible()
  // expect(screen.queryByText("LOADING")).not.toBeInTheDocument()
});

//maksud aku yang ini
test("wait until element shows lanjut nonton yuk", async () => {
  render(<Category />);

  const title = screen.findBy;
});

//test 2
test("can display components from json based on variations", async () => {
  render(<Category />);

  const category = await screen.queryByRole("category-one");
  expect();
});
