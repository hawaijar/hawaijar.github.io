import React, { useEffect, useRef } from "react";
import gsap, { TimelineMax } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);
const RADIUS = 35.5;
const XOFFSET = 145;
const YOFFSET = 254;
const STARTX = 78;
const TRANSFORMX_OFFSET = 7.36;

const defaultArray = [50, 30, 2, 10, 1, 5, 20, 3];

const buildSVG = (array = defaultArray) => {
    let startx = -1 * XOFFSET + STARTX;
    let result = [];

    for (let item of defaultArray) {
        startx = startx + XOFFSET;
        result.push(
            <g data-name={item}>
                <g fill="#1f77b4">
                    <circle cx={startx} cy={YOFFSET} r={RADIUS} />
                </g>
                <text
                    transform={`translate(${startx - TRANSFORMX_OFFSET} 263)`}
                    fontSize={30}
                    fill="#fff"
                    stroke="#fff"
                    strokeMiterlimit={10}
                    fontFamily="MyriadPro-Regular, Myriad Pro"
                >
                    {item}
                </text>
            </g>
        )
    }
    return result;
};
const buildIndices = (array = defaultArray) => {
    let start = -1 * XOFFSET + STARTX;
    let result = [];
    let index = 0;
    for (let item of defaultArray) {
        start = start + XOFFSET;
        result.push(
            <text transform={`translate(${start} 313.4)`}>{index}</text>
        )
        index += 1;
    }
    return result;
};

const HeapContainer = (props) => {
    const CHILD_VALUE = 5;
    const PARENT_VALUE = 30;

    useEffect(() => {
        let child = document.querySelector(`[data-name="${CHILD_VALUE}"]`);
        const childX = child.getBBox().x + RADIUS;
        let parent = document.querySelector(`[data-name="${PARENT_VALUE}"]`);
        const parentX = parent.getBBox().x + RADIUS;
        let parentPositionX = parentX - childX;
        // (moving)child to parent
        gsap.to(child, {
            duration: 3,
            ease: "power1.inOut",
            motionPath: {
                path: [{ x: 0, y: 0 }, { x: 0, y: -254 }, { x: parentPositionX, y: -254 }, { x: parentPositionX, y: 0 }],
                type: "cubic"
            }
        });
        // (moving)parent to child
        parentPositionX = childX - parentX;
        gsap.to(parent, {
            duration: 3,
            delay: 0.5,
            ease: "power1.inOut",
            motionPath: {
                path: [{ x: 0, y: 0 }, { x: 0, y: -254 }, { x: parentPositionX, y: -254 }, { x: parentPositionX, y: 0 }],
                type: "cubic"
            }
        })
    }, [])
    return (
        <svg viewBox="0 0 1204 389" {...props}>
            <path fill="#fff" d="M.5.5h1203v388H.5z" />
            <g fill="none" stroke="#1b1464" strokeMiterlimit={10}>
                <path d="M1203.5 386v2.5h-2.5" />
                <path strokeDasharray="5.01 5.01" d="M1195.99 388.5H5.51" />
                <path d="M3 388.5H.5V386" />
                <path strokeDasharray="4.97 4.97" d="M.5 381.03V5.49" />
                <path d="M.5 3V.5H3" />
                <path strokeDasharray="5.01 5.01" d="M8.01.5h1190.48" />
                <path d="M1201 .5h2.5V3" />
                <path strokeDasharray="4.97 4.97" d="M1203.5 7.97v375.54" />
            </g>
            <g fontSize={22} fontFamily="MyriadPro-Regular, Myriad Pro">
                {buildIndices()}
            </g>
            <g>
                {buildSVG()}
            </g>
        </svg>
    )
};

export default HeapContainer
