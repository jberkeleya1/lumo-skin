import React from 'react';

interface IconBarChartProps {
  size?: number;
  color?: string;
  spacing?: number;
}

const IconBarChart: React.FC<IconBarChartProps> = ({
  size = 64,
  color = '#C68B48',
  spacing = 8,
}) => {
  const barWidth = size / 6;
  const bar1Height = size * 0.4;
  const bar2Height = size * 0.65;
  const bar3Height = size * 0.9;

  const baseY = size;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bar 1 */}
      <rect
        x={0}
        y={baseY - bar1Height}
        width={barWidth}
        height={bar1Height}
        fill={color}
        rx={barWidth * 0.2}
      />
      {/* Bar 2 */}
      <rect
        x={barWidth + spacing}
        y={baseY - bar2Height}
        width={barWidth}
        height={bar2Height}
        fill={color}
        rx={barWidth * 0.2}
      />
      {/* Bar 3 */}
      <rect
        x={(barWidth + spacing) * 2}
        y={baseY - bar3Height}
        width={barWidth}
        height={bar3Height}
        fill={color}
        rx={barWidth * 0.2}
      />
    </svg>
  );
};

export default IconBarChart;
