import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import { TimelineMax } from "gsap";

const {number} = PropTypes;

const Node = ({value, position, animate={}}) => {
    const elm = useRef(null);
    useEffect(() => {
      const tl = new TimelineMax();
      tl.fromTo(elm.current, 2, { y: 0 }, { y: -100 });
      tl.fromTo(elm.current, 2, { y: -100 }, { y: 0 });
    },[])
    return (
      <svg width="300" height="300" viewBox="0 0  300 300">
        <g id={`container-node-${value}`}>
            <g id="node" ref={elm}>
              <circle className="node-circle" cx="45%" cy="45%" r="22" fill="#1f77b4" />
              <text
                className="node-value"
                x={value < 10? "45%": "47%"}
                y="45%"
                fontSize="1.2rem"
                fill="white"
                textAnchor="middle"
                alignmentBaseline="central"
                fontFamily="'Fira Mono',monospace"
              >
                {value}
              </text>
            </g>
          <text
            fill="black"
            x="45%"
            y="168"
            fontSize="1rem"
            textAnchor="middle"
            alignmentBaseline="central"
            fontFamily="'Fira Mono',monospace"
          >
            {position}
          </text>
        </g>
      </svg>
    );
  };
  
  Node.propTypes = {
    value: number,
    position: number
  }
  Number.defaultProps = {
    value: 0,
    position: 0
  }
  export default Node;
  