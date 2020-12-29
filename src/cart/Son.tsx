// 导入Consumer
import {ReactContext} from '../utils/context'
import React, {useContext} from 'react'

function Son() {
    const {length} = useContext(ReactContext)

    return (

        <p style={{
            border: '1px solid blue',
            margin: '20px auto',
            textAlign: 'center'
        }}>son context:{length}</p>
    )
}

export default Son