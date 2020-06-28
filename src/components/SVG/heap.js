import React, { useEffect, useRef } from "react";
import gsap, {TimelineMax} from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);
const RADIUS = 35.5;

const HeapContainer = (props) => {

    const CHILD_VALUE = 5;
    const PARENT_VALUE = 30;

    useEffect(() => {
        let child = document.querySelector(`[data-name="${CHILD_VALUE}"]`);
        const childX = child.getBBox().x + RADIUS;
        let parent = document.querySelector(`[data-name="${PARENT_VALUE}"]`);
        const parentX = parent.getBBox().x + RADIUS;
        let parentPositionX = parentX - childX;
        // child to parent
        gsap.to(child, {
            duration: 3,
            ease: "power1.inOut",
            motionPath: {
                path: [{x:0, y:0}, {x:0, y:-254}, {x:parentPositionX, y:-254}, {x:parentPositionX, y:0}],
                type: "cubic"
              }
        });
        // parent to child
        parentPositionX = childX - parentX;
        gsap.to(parent, {
            duration: 3,
            delay: 0.5,
            ease: "power1.inOut",
            motionPath: {
                path: [{x:0, y:0}, {x:0, y:-254},{x:parentPositionX, y:-254},{x:parentPositionX, y:0}],
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
                <text transform="translate(1131.76 314.97)">{"7"}</text>
                <text transform="translate(970.29 313.4)">{"6"}</text>
                <text transform="translate(820.29 313.4)">{"5"}</text>
                <text transform="translate(670.29 313.4)">{"4"}</text>
                <text transform="translate(520.29 313.4)">{"3"}</text>
                <text transform="translate(370.29 313.4)">{"2"}</text>
                <text transform="translate(220.29 313.4)">{"1"}</text>
                <text transform="translate(70.29 313.4)">{"0"}</text>
            </g>
            <g>
                <g data-name={30}>
                    <g fill="#1f77b4">
                        <circle cx={224} cy={254.21} r={35.5} />
                        <path d="M224 219.21a35 35 0 11-35 35 35 35 0 0135-35m0-1a36 36 0 1036 36 36 36 0 00-36-36z" />
                    </g>
                    <text
                        transform="translate(207.36 263.21)"
                        fontSize={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeMiterlimit={10}
                        fontFamily="MyriadPro-Regular, Myriad Pro"
                    >
                        {"30"}
                    </text>
                </g>
                <g data-name={5}>
                    <g fill="#1f77b4">
                        <circle cx={823} cy={255.07} r={35.5} />
                        <path d="M823 220.07a35 35 0 11-35 35 35 35 0 0135-35m0-1a36 36 0 1036 36 36 36 0 00-36-36z" />
                    </g>
                    <text
                        transform="translate(816.36 264.07)"
                        fontSize={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeMiterlimit={10}
                        fontFamily="MyriadPro-Regular, Myriad Pro"
                    >
                        {"5"}
                    </text>
                </g>
                <g data-name={20}>
                    <g fill="#1f77b4">
                        <circle cx={970} cy={254.64} r={35.5} />
                        <path d="M970 219.64a35 35 0 11-35 35 35 35 0 0135-35m0-1a36 36 0 1036 36 36 36 0 00-36-36z" />
                    </g>
                    <text
                        transform="translate(953.36 263.64)"
                        fontSize={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeMiterlimit={10}
                        fontFamily="MyriadPro-Regular, Myriad Pro"
                    >
                        {"20"}
                    </text>
                </g>
                <g data-name={1}>
                    <g fill="#1f77b4">
                        <circle cx={675} cy={254.43} r={35.5} />
                        <path d="M675 219.43a35 35 0 11-35 35 35 35 0 0135-35m0-1a36 36 0 1036 36 36 36 0 00-36-36z" />
                    </g>
                    <text
                        transform="translate(668.36 263.43)"
                        fontSize={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeMiterlimit={10}
                        fontFamily="MyriadPro-Regular, Myriad Pro"
                    >
                        {"1"}
                    </text>
                </g>
                <g data-name={10} id='parent'>
                    <g fill="#1f77b4">
                        <circle cx={526} cy={254} r={35.5} />
                        <path d="M526 219a35 35 0 11-35 35 35 35 0 0135-35m0-1a36 36 0 1036 36 36 36 0 00-36-36z" />
                    </g>
                    <text
                        transform="translate(509.36 263)"
                        fontSize={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeMiterlimit={10}
                        fontFamily="MyriadPro-Regular, Myriad Pro"
                    >
                        {"10"}
                    </text>
                </g>
                <g data-name={2}>
                    <g fill="#1f77b4">
                        <circle cx={374} cy={255.29} r={35.5} />
                        <path d="M374 220.29a35 35 0 11-35 35 35 35 0 0135-35m0-1a36 36 0 1036 36 36 36 0 00-36-36z" />
                    </g>
                    <text
                        transform="translate(367.36 264.29)"
                        fontSize={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeMiterlimit={10}
                        fontFamily="MyriadPro-Regular, Myriad Pro"
                    >
                        {"2"}
                    </text>
                </g>
                <g data-name={3} id='child'>
                    <g fill="#1f77b4">
                        <circle cx={1132} cy={254} r={35.5} />
                        <path d="M1132 219a35 35 0 11-35 35 35 35 0 0135-35m0-1a36 36 0 1036 36 36 36 0 00-36-36z" />
                    </g>
                    <text
                        transform="translate(1115.36 263)"
                        fontSize={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeMiterlimit={10}
                        fontFamily="MyriadPro-Regular, Myriad Pro"
                    >
                        <tspan>{"3"}</tspan>
                    </text>
                </g>
                <g data-name={50}>
                    <g fill="#1f77b4">
                        <circle cx={78} cy={254} r={35.5} />
                        <path d="M78 219a35 35 0 11-35 35 35 35 0 0135-35m0-1a36 36 0 1036 36 36 36 0 00-36-36z" />
                    </g>
                    <text
                        transform="translate(61.36 263)"
                        fontSize={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeMiterlimit={10}
                        fontFamily="MyriadPro-Regular, Myriad Pro"
                    >
                        {"50"}
                    </text>
                </g>
            </g>
        </svg>
    )
};

export default HeapContainer
