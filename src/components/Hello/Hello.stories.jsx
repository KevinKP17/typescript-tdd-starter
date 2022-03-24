import React from 'react';
import Hello from './index'
import { rest } from 'msw'

export default {
    component: Hello,
    title: 'Michael',
};

const Template = args => < Hello {...args }
/>;

export const withPremier = Template.bind({})
withPremier.args = {
    name: "Khea",
    isPremier: true
}

// export const handlers = [
//     rest.get()
// ]