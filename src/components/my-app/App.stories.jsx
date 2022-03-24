import { rest } from 'msw'
import React from 'react';
import App from "./App"
import dataApp from "./reactData"
import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize();

// https://mswjs.io/docs/getting-started/mocks/rest-api
// https://storybook.js.org/addons/msw-storybook-addon
// https://storybook.js.org/docs/react/api/cli-options
export default {
    component: App,
    title: 'react-my-app',
    decorators: [mswDecorator],
    parameters: {
        msw: [
            rest.get('./data/Portrait.json',
                (req, res, ctx) => {
                    return res(ctx.json(dataApp))
                })
        ]
    }
}

const Template = args => < App {...args }
/>;

export const withPremier = Template.bind({})