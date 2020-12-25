import React from 'react'
import {Button, List, Typography} from 'antd'
import ItemCard from './ItemCard'
import {useChecked} from './UseChecked'
import styled from 'styled-components'

export interface CartItem {
    id: number
    name: string
    price: number
}

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
const CheckAllInput = styled.input`
    margin-right: 8px;
`
const HoverCartItem = styled(List.Item)`
    &:hover{
        cursor:pointer
    }
`

// cartItems的积分总和
const sumPrice = (cartItems: CartItem[]) => {
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

    const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkAll = e.target.checked
        onCheckedAllChange(checkAll)
    }

    const onWrapCheckedOtherChange = () => {
        onCheckedOtherChange()
    }


    const total = sumPrice(filterChecked())

    const Footer = (
        <FooterDiv>
            <CheckAllBox>
                <CheckAllInput
                    checked={checkedAll}
                    onChange={onWrapCheckedAllChange}
                    type="checkbox"
                />
                全选
            </CheckAllBox>
            <Button onClick={onWrapCheckedOtherChange}>
                反选
            </Button>
            <div>
                价格总计: <Typography.Text mark>¥ {total}</Typography.Text>
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
                            <ItemCard item={item}
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
