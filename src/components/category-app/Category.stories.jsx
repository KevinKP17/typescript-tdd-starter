import { rest } from 'msw'
import React from 'react'
import categoryData from './mockResponse/categoryData.json'
import watchData from './mockResponse/watchData.json'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import Category from './Category.jsx'

initialize()

export default {
    component: Category,
    title: 'category-app',
    decorators: [mswDecorator],
    parameters: {
        msw: [
            rest.get('./data/categoryData.json',
                (req, res, ctx) => {
                    return res(ctx.json(categoryData))
                }),
            rest.get('./data/watchData.json', 
                (req, res, ctx) =>{
                return res(ctx.json(watchData))
            })

        ]
    }
}

const Template = args => <Category {...args }/>

export const category = Template.bind({});