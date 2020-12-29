import React, {useState} from 'react'
import {Checkbox, List, Typography} from 'antd'
import CartItem, {CartItemInterface} from './CartItem'
import styled from 'styled-components'
import {CheckboxChangeEvent} from 'antd/es/checkbox'
import {ReactContext} from '../utils/context'
import Son from './Son'
import ReactPortal from './ReactPortal'

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


export default function Cart() {


    const [cartData] = useState(Array(5)
        .fill(undefined)
        .map((v, i) => ({
            id: i,
            name: `商品${i}`,
            price: Math.round(Math.random() * 100)
        }))
    )

    const [selectedCart, setSelectedCart] = useState([] as number[])

    const [length, setLength] = useState(0)

    const onSelectAllCart = (e: CheckboxChangeEvent) => {
        const checkAll = e.target.checked
        if (checkAll) {
            setSelectedCart(Array(cartData.length).fill(undefined).map((item, index) => index))
        } else {
            setSelectedCart([])
        }
    }

    const total = sumPrice(cartData.filter(item => selectedCart.includes(item.id)))


    /** 是否全选状态 */
    const selectAllCartFlag = Boolean(cartData.length) && (selectedCart.length === cartData.length)

    const onCartSelected = (id: number, flag: boolean) => {

        if (!flag) {
            setSelectedCart(arr => {
                arr.push(id)
                setLength(arr.length)

                return [...arr]
            })
        } else {
            setSelectedCart(arr => {
                const index = arr.indexOf(id)
                arr.splice(index, 1)

                setLength(arr.length)
                return [...arr]
            })
        }
    }

    const Footer = (
        <FooterDiv>
            <CheckAllBox>
                <Checkbox onChange={onSelectAllCart}
                          checked={selectAllCartFlag}>
                    全选
                </Checkbox>
            </CheckAllBox>
            <div>
                价格总计: <Typography.Text type={'warning'}>¥ {total}</Typography.Text>
            </div>
        </FooterDiv>
    )

    return (
        <ReactContext.Provider value={{length}}>
            <ReactPortal/>
            <CartDiv>

                <div style={{border: '1px solid red',padding:'20px', margin: '50px auto', textAlign: 'center'}}>
                    <p>parent context:{length}</p>
                    <Son/>
                </div>
                <List
                    header={<div>购物车</div>}
                    footer={Footer}
                    bordered
                    dataSource={cartData}
                    renderItem={item => {
                        let checked = selectedCart.includes(item.id)
                        return (
                            <HoverCartItem onClick={() => {
                                onCartSelected(item.id, checked)
                            }}>
                                <CartItem item={item}
                                          checked={checked}
                                />
                            </HoverCartItem>
                        )
                    }}
                />
            </CartDiv>

        </ReactContext.Provider>
    )
}
