import React from "react"
import {CartItem} from "./"
import {OnCheckedChange} from './use-checked'
import {Typography} from "antd"
import styled from "styled-components";

interface Props {
    item: CartItem
    checked: boolean
    onCheckedChange: OnCheckedChange<CartItem>
}

// memo优化策略
function areEqual(prevProps: Props, nextProps: Props) {
    return (
        prevProps.checked === nextProps.checked
    )
}

const CardItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 24px;
`
const CardCheckBox = styled.div`
 margin-right: 8px;
`
const CardInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`
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
                {name} <Typography.Text mark>${price}</Typography.Text>
            </CardInfo>
        </CardItem>
    )
}, areEqual)


export default ItemCard