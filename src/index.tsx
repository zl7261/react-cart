import React from 'react'
import ReactDOM from 'react-dom'
import Cart from './cart'
import 'antd/dist/antd.css'
import styled from 'styled-components'

const AppDiv = styled.div`
    text-align: center;
`

function App() {
    return (
        <AppDiv>
            <Cart/>
        </AppDiv>
    )
}

ReactDOM.render(<App/>, document.querySelector('#app'))

