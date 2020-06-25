import React from 'react';

const Node = ({value, position}) => {
    return (
      <svg width="75" height="90">
        <g id="container-node">
          <g id="node">
            <circle className="node-circle" cx="45%" cy="45%" r="32" fill="#1f77b4" />
            <text
              className="node-value"
              x={value < 10? "48%": "47%"}
              y="45%"
              fontSize="2rem"
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
            x="50%"
            y="83"
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
  
  export default Node;
  