import React, {ReactComponentElement, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {Button} from 'antd'

const modalRoot = document.body
const el = document.createElement('div')
el.style.width = '300px'
el.style.height = '100px'
el.style.backgroundColor = 'green'
el.style.position = 'absolute'
el.style.top = '25px'
el.style.left = '350px'

const Modal = (props: { children: ReactComponentElement<any> }) => {
console.log('render')
    useEffect(() => {
        modalRoot.appendChild(el)

        return () => {
            modalRoot.removeChild(el)
        }
    }, [])

    return ReactDOM.createPortal(props.children, el)
}

const Child = (props: { click: number }) => {
    return (
        <div className="modal">
            这个是通过ReactDOM.createPortal创建的内容
            <br/>
            {props.click}
        </div>
    )
}
const ReactPortal = () => {
    const [click, setClick] = useState(0)
    const handleClick = () => {
        setClick(count => count + 1)
    }
    return (
        <div>
            <Button onClick={handleClick}>点击加1</Button>
            <p>点击次数: {click}</p>
            <Modal>
                <Child click={click}/>
            </Modal>
        </div>
    )
}

export default ReactPortal