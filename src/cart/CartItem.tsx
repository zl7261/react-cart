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
    checked: boolean
}


const CartItemDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`


const CartPriceInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`

const CartCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-checkbox {
    margin-right: 8px;
  }
`


const CartItem = React.memo((props: Props) => {
    console.log('CartItem Render')

    const {item, checked} = props
    const {name, price} = item


    return (
        <CartItemDiv>
            <CartCheck>
                <Checkbox checked={checked}/>
                <CartPriceInfo>
                    {name}
                </CartPriceInfo>
            </CartCheck>
            <Typography.Text>¥ {price}</Typography.Text>
        </CartItemDiv>
    )
})

export default CartItem