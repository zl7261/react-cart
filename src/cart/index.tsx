import React from 'react'
import {Button, Checkbox, List, Typography} from 'antd'
import CartItem, {CartItemInterface} from './CartItem'
import {useChecked} from './UseChecked'
import styled from 'styled-components'
import {CheckboxChangeEvent} from 'antd/es/checkbox'

const CartDiv = styled.div`
    max-width: 400px;
    margin: auto; 
`
const FooterDiv = styled.div`
    display: flex;
    justify-content: space-between;
`
const CheckAllBox = styled.div`
    display: flex;
    align-items: center;
`
const HoverCartItem = styled(List.Item)`
    &:hover{
        cursor:pointer
    }
`

// cartItems的积分总和
const sumPrice = (cartItems: CartItemInterface[]) => {
    return cartItems.reduce((sum, cur) => sum + cur.price, 0)
}

const cartData = Array(5)
    .fill(undefined)
    .map((v, i) => ({
        id: i,
        name: `商品${i}`,
        price: Math.round(Math.random() * 100)
    }))

export default function Cart() {
    const {
        checkedAll,
        checkedMap,
        onCheckedAllChange,
        onCheckedChange,
        filterChecked,
        onCheckedOtherChange
    } = useChecked(cartData)

    const onWrapCheckedAllChange = (e: CheckboxChangeEvent) => {
        const checkAll = e.target.checked
        onCheckedAllChange(checkAll)
    }

    const onWrapCheckedOtherChange = () => {
        onCheckedOtherChange()
    }

    const checkedCart = filterChecked()
    const total = sumPrice(checkedCart)

    const Footer = (
        <FooterDiv>
            <CheckAllBox>
                <Checkbox onChange={onWrapCheckedAllChange}
                          checked={checkedAll}>
                    全选
                </Checkbox>
                <Button
                    disabled={checkedCart.length < 1}
                    onClick={onWrapCheckedOtherChange}>
                    反选
                </Button>
            </CheckAllBox>
            <div>
                价格总计: <Typography.Text type={'warning'}>¥ {total}</Typography.Text>
            </div>
        </FooterDiv>
    )

    return (
        <CartDiv>
            <List
                header={<div>购物车</div>}
                footer={Footer}
                bordered
                dataSource={cartData}
                renderItem={item => {
                    const checked = checkedMap[item.id] || false
                    return (
                        <HoverCartItem>
                            <CartItem item={item}
                                      checked={checked}
                                      onCheckedChange={onCheckedChange}
                            />
                        </HoverCartItem>
                    )
                }}
            />
        </CartDiv>
    )
}
