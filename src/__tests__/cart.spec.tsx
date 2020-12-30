import React from 'react'
import Cart from '../cart/index'
import CartItem from '../cart/CartItem'
import {mount, shallow} from 'enzyme'

describe('CartTest', () => {
    it('shallow', () => {
        const wrapper = shallow(<Cart/>)
        expect(wrapper.find(CartItem).length).toBe(0)
    })
    it('mount', () => {
        const wrapper = mount(<Cart/>)
        expect(wrapper.find(CartItem).length).toBe(5)
    })
})