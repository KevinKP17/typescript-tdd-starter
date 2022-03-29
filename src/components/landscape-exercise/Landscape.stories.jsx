import { rest } from 'msw'
import React from 'react';
import Landscape from "./Landscape-app"
import landscapeData from "./landscapeData"
import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize();

// https://mswjs.io/docs/getting-started/mocks/rest-api
// https://storybook.js.org/addons/msw-storybook-addon
// https://storybook.js.org/docs/react/api/cli-options
export default {
    component: Landscape,
    title: 'react-landscape-exercise',
    decorators: [mswDecorator],
    parameters: {
        msw: [
            rest.get('./data/landscapeData.json',
                (req, res, ctx) => {
                    return res(ctx.json(landscapeData))
                })
        ]
    }
}

const Templatelandscape = args => <Landscape {...args }/>;

export const landscape = Templatelandscape.bind({})