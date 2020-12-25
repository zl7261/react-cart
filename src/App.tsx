import React from 'react';
import Cart from './cart'
import 'antd/dist/antd.css';
import styled from "styled-components";

const AppDiv = styled.div`
    text-align: center;
`

function App() {
    return (
        <AppDiv>
            <Cart/>
        </AppDiv>
    );
}

export default App;
