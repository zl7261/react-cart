import React from 'react'
import {Checkbox, Typography} from 'antd'
import styled from 'styled-components'

export interface CartItemInterface {
    id: number
    name: string
    price: number
}

interface Props {
    item: CartItemInterface
    checked: boolean,
    onCartSelected: (id: number, checked: boolean) => void
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
    // 校验props与子组件回调父组件的函数有无被修改
    return (prevProps.checked === nextProps.checked) && (prevProps.onCartSelected === nextProps.onCartSelected)
}

const CartItem = React.memo((props: Props) => {
    console.log('CartItem Render')

    const {item, checked, onCartSelected} = props
    const {name, price} = item


    return (
        <CartItemDiv onClick={() => {
            onCartSelected(item.id, checked)
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