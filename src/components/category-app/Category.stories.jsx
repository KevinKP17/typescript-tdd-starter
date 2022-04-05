import { rest } from 'msw'
import React from 'react'
import categoryData from './categoryData'
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
                })
        ]
    }
}

const Template = args => <category {...args }/>

export const category = Template.bind({});