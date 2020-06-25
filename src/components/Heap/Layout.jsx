import React from 'react';
import BinaryNode from '../SVG';
import './index.scss';
const nums = [5, 15, 3, 23, 10, 2, 50, 3, 1, 8];
const Layout = () => {
    return(
        <div className='container'>
            {nums.map((num, idx) => <BinaryNode value={num} position={idx} />)}
            <div><button>Start</button></div>
        </div>
    )
}

export default Layout;