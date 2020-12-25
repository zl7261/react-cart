import React from "react"
import {List, Typography} from "antd"
import ItemCard from "./ItemCard"
import {useChecked} from "./use-checked"
import styled from 'styled-components'

export interface CartItem {
    id: number
    name: string
    price: number
}

const cartData = Array(5)
    .fill(undefined)
    .map((v, i) => ({
        id: i,
        name: `商品${i}`,
        price: Math.round(Math.random() * 100),
    }))

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

export default function Cart() {
    const {
        checkedAll,
        checkedMap,
        onCheckedAllChange,
        onCheckedChange,
        filterChecked,
    } = useChecked(cartData)

    // cartItems的积分总和
    const sumPrice = (cartItems: CartItem[]) => {
        return cartItems.reduce((sum, cur) => sum + cur.price, 0)
    }

    const onWrapCheckedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checkAll = e.target.checked
        onCheckedAllChange(checkAll)
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
            <div>
                价格总计 <Typography.Text mark>${total}</Typography.Text>
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
                        <List.Item>
                            <ItemCard item={item} checked={checked} onCheckedChange={onCheckedChange}/>
                        </List.Item>
                    )
                }}
            />
        </CartDiv>
    )
}
