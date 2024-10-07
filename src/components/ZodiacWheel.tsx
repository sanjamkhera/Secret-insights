
import React from 'react';
import { motion } from 'framer-motion';
import { Eclipse } from 'lucide-react';

// Define the list of Zodiac signs in order
const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

// Unicode symbols for each zodiac sign
const zodiacSymbols: { [key: string]: string } = {
  'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
  'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
  'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
};

// Simplified constellation patterns (adjusted to be centered)
// Each constellation is represented by an array of [x, y] coordinate pairs
const constellations: { [key: string]: [number, number][] } = {
  'Aries': [[-15, -15], [-5, -5], [5, -10], [15, 0]],
  'Taurus': [[-15, -5], [-5, 5], [5, 0], [0, -10], [10, -15]],
  'Gemini': [[-15, -15], [-10, -5], [-5, 5], [0, 15], [5, 5], [10, -5], [15, -15]],
  'Cancer': [[-15, -7], [-5, -2], [5, -7], [0, 3], [10, 8]],
  'Leo': [[-15, -12], [-5, -7], [5, -12], [0, -2], [10, 3], [5, 13], [-5, 8], [-15, 13]],
  'Virgo': [[-15, -10], [-10, 0], [-5, 10], [0, 0], [5, -10], [10, 0], [15, 10]],
  'Libra': [[-15, -5], [-5, 5], [5, -5], [15, 5]],
  'Scorpio': [[-15, -7], [-5, -2], [5, -7], [15, -2], [10, 8], [20, 13]],
  'Sagittarius': [[-15, -15], [-5, -5], [5, -10], [15, 0], [10, 10], [0, 5], [-10, 15]],
  'Capricorn': [[-15, -7], [-5, 3], [5, -2], [15, 8], [20, -2], [10, -12]],
  'Aquarius': [[-15, -7], [-5, -2], [5, -7], [15, -2], [10, 8], [0, 13], [-10, 8]],
  'Pisces': [[-15, -7], [-5, -2], [5, -7], [15, -2], [5, 8], [-5, 13], [-15, 8]]
};


const ZodiacWheel: React.FC = () => {
  // Define the dimensions and radii for the wheel
  const size = 320; // Overall size of the wheel
  const padding = 30; // Padding around the wheel
  const adjustedSize = size + padding * 2; // Total size including padding
  const center = adjustedSize / 2; // Center point of the wheel
  const outerRadius = size / 2; // Radius of the outer circle
  const innerRadius = outerRadius - 25; // Radius of the inner circle
  const symbolRadius = outerRadius - 90; // Radius for placing zodiac symbols
  const constellationRadius = outerRadius - 50;; // Radius for placing constellations
  const textRadius = outerRadius - 13; // Radius for placing zodiac sign names
  const innerCircleRadius = 34; // New variable: Radius of the innermost circle

  // Helper function to calculate coordinates on the circle
  const getCoordinates = (angle: number, r: number) => ({
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle),
  });

  return (
    <div className="relative">
      {/* Main SVG container with rotation animation */}
      <motion.svg
        width={adjustedSize}
        height={adjustedSize}
        viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
        animate={{ rotate: 360 }} // Rotate 360 degrees
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }} // Take 60 seconds to complete one rotation, repeat infinitely
        className={'m-3'}
      >

        {/* Draw the outer and inner circles of the wheel */}
        <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="white" strokeWidth="2" />
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="white" strokeWidth="1" />

        {/* Draw the dividing lines for each zodiac sign */}
        {zodiacSigns.map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180); // Convert degrees to radians, subtract 90 to start at top
          const innerPoint = getCoordinates(angle, innerCircleRadius);
          const outerPoint = getCoordinates(angle, outerRadius);
          return (
            <line
              key={i}
              x1={innerPoint.x}
              y1={innerPoint.y}
              x2={outerPoint.x}
              y2={outerPoint.y}
              stroke="white"
              strokeWidth="1"
            />
          );
        })}

        {/* Draw the constellations for each zodiac sign */}
        {zodiacSigns.map((sign, i) => {
          const angle = (i * 30 - 75) * (Math.PI / 180);
          const basePoint = getCoordinates(angle, constellationRadius);
          const pattern = constellations[sign];

          return (
            <g key={`constellation-${sign}`}>
              {/* Draw stars */}
              {pattern.map((point, j) => (
                <circle
                  key={`star-${j}`}
                  cx={basePoint.x + point[0]}
                  cy={basePoint.y + point[1]}
                  r="1"
                  fill="#8a2be2"
                />
              ))}
              {/* Connect stars with lines */}
              {pattern.slice(1).map((point, j) => (
                <line
                  key={`line-${j}`}
                  x1={basePoint.x + pattern[j][0]}
                  y1={basePoint.y + pattern[j][1]}
                  x2={basePoint.x + point[0]}
                  y2={basePoint.y + point[1]}
                  stroke="#8a2be2"
                  strokeWidth="1"
                />
              ))}
            </g>
          );
        })}

        {/* Draw inner circles (like a clock face) */}

        <circle cx={center} cy={center} r={innerCircleRadius} fill="none" stroke="white" strokeWidth="1" />

        {/* Add zodiac sign names in a circular pattern */}
        {zodiacSigns.map((sign, i) => {
          const angle = (i * 30 - 90 + 15) * (Math.PI / 180);
          const point = getCoordinates(angle, textRadius);
          return (
            <text
              key={`name-${sign}`}
              x={point.x}
              y={point.y}
              fill="white"
              fontSize="11"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${(i * 30 + 15)}, ${point.x}, ${point.y})`} // Rotate text to align with wheel
            >
              {sign}
            </text>
          );
        })}
      </motion.svg>

      {/* Rotating container for zodiac symbols */}
      <motion.div
        className="absolute top-[1px] left-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {zodiacSigns.map((sign, i) => {
          const angle = (i * 30 - 75) * (Math.PI / 180); // Subtract 75 to center within each segment
          const point = getCoordinates(angle, symbolRadius);
          return (
            <motion.div
              key={`symbol-${sign}`}
              className="absolute text-fuchsia-500 text-sm"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: 'translate(-50%, -50%)',
                textShadow: '0 0 5px #ff00ff',
              }}
              animate={{ rotate: -360 }} // Counter-rotate to keep symbols upright
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {zodiacSymbols[sign]}
            </motion.div>
          );
        })}
      </motion.div>

      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{ transform: `translate(${padding - 30}px, ${padding - 30}px)` }}
      >
        <Eclipse size={36} color="white" />
      </div>
    </div>
  );
};

export default ZodiacWheel;