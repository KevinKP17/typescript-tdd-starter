import { rest } from 'msw'
import React from 'react';
import Watch from "./Watch" 
import watchData from "./watchData"
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { landscape } from '../landscape-exercise/Landscape.stories';

initialize()

export default {
    component: Watch,
    title: 'watch-app',
    decorators: [mswDecorator],
    parameter: {
        msw: [
            rest.get('./data/watchData.json',
                (req, res, ctx) => {
                    return res(ctx.json(watchData))
                })
        ]
    }
}

const Template = args => <Watch {...args}/>

export const watchDuration = Template.bind({})