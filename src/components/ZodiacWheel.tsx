import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const symbolPaths: { [key: string]: string } = {
  // Ram horns curling from a center point
  'Aries': 'M -8,4 C -8,-4 0,-4 0,4 C 0,-4 8,-4 8,4',
  // Bull's head with horns 
  'Taurus': 'M -10,2 A 10 8 0 0 1 10,2 M -8,6 L 8,6',
  // The parallel lines of Gemini
  'Gemini': 'M -6,-8 L -6,8 M 6,-8 L 6,8',
  // Swirling symbol for Cancer
  'Cancer': 'M -8,-3 C -3,2 3,-8 8,-3',
  // Lion's mane and tail
  'Leo': 'M -8,0 Q 0,-8 8,0 Q 4,8 -8,8',
  // The maiden's symbol
  'Virgo': 'M -8,0 Q -4,-8 0,0 T 8,0 L 10,8',
  // The balanced scales
  'Libra': 'M -10,0 L 10,0 M -8,4 L 8,4',
  // Scorpion's stinger
  'Scorpio': 'M -8,0 Q -4,-6 0,0 T 8,0 L 12,-6',
  // Arrow for Sagittarius
  'Sagittarius': 'M -6,-6 L 6,6 M -6,6 L 6,-6 M 0,-8 L 0,8',
  // Sea-goat symbol
  'Capricorn': 'M -8,4 C -4,-4 4,-4 8,4 C 4,0 0,-4 -4,-8',
  // Water bearer waves
  'Aquarius': 'M -12,0 C -8,-4 -4,4 0,0 C 4,-4 8,4 12,0',
  // The two fish tied together
  'Pisces': 'M -10,-4 C -6,0 -2,-4 0,0 M 0,0 C 2,4 6,0 10,4 M 0,-6 L 0,6'
};

const ZodiacWheel: React.FC = () => {
  const size = 320;
  const padding = 0;
  const adjustedSize = size + padding * 2;
  const center = adjustedSize / 2;
  const outerRadius = size / 2;
  const innerRadius = outerRadius - 25;
  const symbolRadius = outerRadius - 60;
  const textRadius = outerRadius - 13;
  const innerCircleRadius = 34;

  const getCoordinates = (angle: number, r: number) => ({
    x: Math.round((center + r * Math.cos(angle)) * 1000) / 1000,
    y: Math.round((center + r * Math.sin(angle)) * 1000) / 1000,
  });

  return (
    <div className="relative">
      <motion.svg
        width={adjustedSize}
        height={adjustedSize}
        viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="mt-8"
      >
        {/* Background */}
        <circle cx={center} cy={center} r={outerRadius} fill="none" />
        
        {/* Circles */}
        <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="white" strokeWidth="2" />
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="white" strokeWidth="1" />
        
        {/* Dividing lines */}
        {zodiacSigns.map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const innerPoint = getCoordinates(angle, innerCircleRadius);
          const outerPoint = getCoordinates(angle, outerRadius);
          return (
            <line
              key={i}
              x1={innerPoint.x}
              y1={innerPoint.y}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="silver"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Zodiac symbols */}
        {zodiacSigns.map((sign, i) => {
          const angle = (i * 30 - 75) * (Math.PI / 180);
          const point = getCoordinates(angle, symbolRadius);
          const rotationAngle = (i * 30 + 15);
          return (
            <g
              key={`symbol-${sign}`}
              transform={`translate(${point.x}, ${point.y}) rotate(${rotationAngle}) scale(1.5)`}
            >
              <path
                d={symbolPaths[sign]}
                stroke="silver"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        <circle cx={center} cy={center} r={innerCircleRadius} fill="none" stroke="white" strokeWidth="1" />

        {/* Sign names */}
        {zodiacSigns.map((sign, i) => {
          const angle = (i * 30 - 90 + 15) * (Math.PI / 180);
          const point = getCoordinates(angle, textRadius);
          return (
            <text
              key={`name-${sign}`}
              x={point.x}
              y={point.y}
              fill="silver"
              fontSize="10"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${(i * 30 + 15)}, ${point.x}, ${point.y})`}
            >
              {sign}
            </text>
          );
        })}
      </motion.svg>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
        <Sun size={36} color="silver" className="mr-[11px]" />
      </div>
    </div>
  );
};

export default ZodiacWheel;