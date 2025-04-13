import React from 'react';

interface IconFlaskProps {
  size?: number;
  color?: string;
  bubbleColor?: string;
}

const IconFlask: React.FC<IconFlaskProps> = ({
  size = 64,
  color = '#C68B48',
  bubbleColor = 'white',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Flask body with wide base */}
      <path
        d="
          M24 8
          H40
          L36 20
          V38
          C36 39 36.5 40 37 41
          L44 52
          H20
          L27 41
          C27.5 40 28 39 28 38
          V20
          L24 8
          Z
        "
        fill={color}
      />

      {/* Bubbles inside the flask */}
      <circle cx="26" cy="38" r="2" fill={bubbleColor} />
      <circle cx="34" cy="42" r="3" fill={bubbleColor} />
      <circle cx="38" cy="34" r="1.5" fill={bubbleColor} />
    </svg>
  );
};

export default IconFlask;
