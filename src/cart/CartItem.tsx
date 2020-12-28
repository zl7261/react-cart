import React from 'react'
import {Checkbox, Typography} from 'antd'
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
    onSelectCart: any
}


const CartItemDiv = styled.div`
    display: flex;
    align-items:center;
    justify-content: space-between;
    width: 100%;
`


const CartPriceInfo = styled(Typography.Text)`
    flex: 1;
    display: flex;
    justify-content: space-between;
`

const CartCheck = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-checkbox{
     margin-right: 8px;
    }
`

// memo优化策略
const memoEqual = (prevProps: Props, nextProps: Props) => {
    return isEqual(prevProps.checked, nextProps.checked)
}

const CartItem = React.memo((props: Props) => {
    console.log('cart item rerender')
    const {item, checked, onSelectCart} = props
    const {name, price} = item


    return (
        <CartItemDiv onClick={() => {
            onSelectCart(item, !checked)
        }}>
            <CartCheck>
                <Checkbox checked={checked}/>
                <CartPriceInfo>
                    {name}
                </CartPriceInfo>
            </CartCheck>
            <Typography.Text>¥ {price}</Typography.Text>
        </CartItemDiv>
    )
}, memoEqual)

export default CartItem