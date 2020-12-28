import React from 'react';
import Cart from '../cart/index';
import {mount} from 'enzyme';

describe('CartTest', () => {
    it('renders without crashing', () => {
        const wrapper = mount(<Cart/>);
        expect(wrapper.find('.ant-list-item').length).toBe(5);
    });
});