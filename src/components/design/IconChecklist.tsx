import React from 'react';

interface IconChecklistProps {
  size?: number;
  color?: string;
}

const IconChecklist: React.FC<IconChecklistProps> = ({
  size = 48,
  color = '#C68B48',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rounded square */}
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="10"
        ry="10"
        fill="none"
        stroke={color}
        strokeWidth="4"
      />

      {/* First checkmark and line */}
      <polyline
        points="20,25 25,30 35,20"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      <line
        x1="40"
        y1="25"
        x2="80"
        y2="25"
        stroke={color}
        strokeWidth="4"
      />

      {/* Second checkmark and line */}
      <polyline
        points="20,45 25,50 35,40"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      <line
        x1="40"
        y1="45"
        x2="80"
        y2="45"
        stroke={color}
        strokeWidth="4"
      />

      {/* Third checkmark and line */}
      <polyline
        points="20,65 25,70 35,60"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      <line
        x1="40"
        y1="65"
        x2="80"
        y2="65"
        stroke={color}
        strokeWidth="4"
      />
    </svg>
  );
};

export default IconChecklist;
