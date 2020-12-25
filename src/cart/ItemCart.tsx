import React from 'react'
import {OnCheckedChange} from './UseChecked'
import {Typography} from 'antd'
import styled from 'styled-components'

export interface CartItemInterface {
    id: number
    name: string
    price: number
}

const isEqual = require('fast-deep-equal/es6')

interface Props {
    item: CartItemInterface
    checked: boolean
    onCheckedChange: OnCheckedChange<CartItemInterface>
}


const CartItem = styled.div`
    display: flex;
    width: 100%;
`

const CartCheckBox = styled.div`
    margin-right: 8px;
`

const CartInfo = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
`

// memo优化策略
const memoEqual = (prevProps: Props, nextProps: Props) => {
    return isEqual(prevProps, nextProps)
}

const ItemCart = React.memo((props: Props) => {
    console.log('cart item rerender')
    const {item, checked, onCheckedChange} = props
    const {name, price} = item


    return (
        <CartItem onClick={() => {
            onCheckedChange(item, !checked)
        }}>
            <CartCheckBox>
                <input
                    type="checkbox"
                    checked={checked}
                />
            </CartCheckBox>
            <CartInfo>
                {name} <Typography.Text mark>¥ {price}</Typography.Text>
            </CartInfo>
        </CartItem>
    )
}, memoEqual)

export default ItemCart