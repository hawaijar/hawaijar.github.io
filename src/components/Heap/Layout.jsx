import React from 'react';
import BinaryNode from '../SVG';
import './index.scss';
const nums = [5];

const Layout = () => {
    return(
        <div className='container'>
            {nums.map((num, idx) => <BinaryNode value={num} position={idx} />)}
            <div><button>Start</button></div>
        </div>
    )
}

export default Layout;