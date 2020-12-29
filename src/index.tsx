import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import 'antd/dist/antd.css'

export default function App() {
    return (
        <Router/>
    )
}

ReactDOM.render(<App/>, document.querySelector('#app'))

