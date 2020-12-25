import React from 'react'
import {CartItem} from './'
import {OnCheckedChange} from './UseChecked'
import {Typography} from 'antd'
import styled from 'styled-components'

const isEqual = require('fast-deep-equal/es6')

interface Props {
    item: CartItem
    checked: boolean
    onCheckedChange: OnCheckedChange<CartItem>
}


const CardItem = styled.div`
    display: flex;
    width: 100%;
`

const CardCheckBox = styled.div`
    margin-right: 8px;
`

const CardInfo = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
`

// memo优化策略
const memoEqual = (prevProps: Props, nextProps: Props) => {
    return isEqual(prevProps, nextProps)
}

const ItemCard = React.memo((props: Props) => {
    console.log('cart item rerender')
    const {item, checked, onCheckedChange} = props
    const {name, price} = item

    const onWrapCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {checked} = e.target
        onCheckedChange(item, checked)
    }

    return (
        <CardItem>
            <CardCheckBox>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onWrapCheckedChange}
                />
            </CardCheckBox>
            <CardInfo>
                {name} <Typography.Text mark>¥ {price}</Typography.Text>
            </CardInfo>
        </CardItem>
    )
}, memoEqual)

export default ItemCard