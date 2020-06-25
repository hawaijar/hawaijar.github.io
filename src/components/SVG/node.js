import React from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion"

const {number} = PropTypes;

const Node = ({value, position, animate={}}) => {
    return (
      <svg width="60" height="200" viewBox="0 0  60 200">
        <g id={`container-node-${value}`}>
          <motion.g {...animate}>
            <g id="node">
              <circle className="node-circle" cx="45%" cy="45%" r="22" fill="#1f77b4" />
              <text
                className="node-value"
                x={value < 10? "48%": "47%"}
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
          </motion.g >
          <text
            fill="black"
            x="47%"
            y="62%"
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
  