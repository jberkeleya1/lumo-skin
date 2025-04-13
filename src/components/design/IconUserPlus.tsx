import React from 'react';

interface IconUserPlusProps {
  size?: number;
  color?: string;
}

const IconUserPlus: React.FC<IconUserPlusProps> = ({
  size = 64,
  color = '#C68B48',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Card frame with break at middle right */}
      <path
        d="
          M20 8
          H44
          C48.42 8 52 11.58 52 16
          V24
          M52 40
          V48
          C52 52.42 48.42 56 44 56
          H20
          C15.58 56 12 52.42 12 48
          V16
          C12 11.58 15.58 8 20 8
        "
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* User head */}
      <circle cx="32" cy="26" r="5" fill={color} />

      {/* User body */}
      <ellipse cx="32" cy="40" rx="7" ry="5" fill={color} />

      {/* Plus icon (no circle), breaking into the frame */}
      <line
        x1="52"
        y1="28"
        x2="52"
        y2="36"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="48"
        y1="32"
        x2="56"
        y2="32"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconUserPlus;
