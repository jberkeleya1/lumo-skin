import React from 'react';
import styles from './IconHeart.module.css';

interface IconHeartProps {
  size?: number; // pixel size
  color?: string;
}

const IconHeart: React.FC<IconHeartProps> = ({
  size = 64,
  color = '#cc333f',
}) => {
  return (
    <div
      className={styles.heart}
      style={{
        height: `${size}px`,
        background: color,
        ['--heart-color' as any]: color, // for dynamic custom property
      }}
    />
  );
};

export default IconHeart;
