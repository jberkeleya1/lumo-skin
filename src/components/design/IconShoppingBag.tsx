import React from 'react';

interface IconShoppingBagProps {
  size?: number;
  color?: string;
}

const IconShoppingBag: React.FC<IconShoppingBagProps> = ({
  size = 48,
  color = '#C68B48',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shopping bag body */}
      <path
        d="M16 20H48L52 52H12L16 20Z"
        fill={color}
      />
      {/* Handle */}
      <path
        d="M24 20V16C24 12.6863 26.6863 10 30 10H34C37.3137 10 40 12.6863 40 16V20"
        stroke={color}
        strokeWidth="4"
        fill="none"
      />
      {/* Bar chart inside the bag */}
      <rect x="24" y="36" width="4" height="10" fill="white" />
      <rect x="30" y="32" width="4" height="14" fill="white" />
      <rect x="36" y="28" width="4" height="18" fill="white" />
    </svg>
  );
};

export default IconShoppingBag;
