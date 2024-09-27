import React from 'react';
import { motion } from 'framer-motion';
import { CelestialData } from '@/types/celestialData';

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

// Simplified constellation patterns (adjust as needed)
const constellations: { [key: string]: [number, number][] } = {
  'Aries': [[0, 0], [10, 10], [20, 5], [30, 15]],
  'Taurus': [[0, 0], [10, 10], [20, 5], [15, -5], [25, -10]],
  'Gemini': [[0, 0], [5, 10], [10, 20], [15, 30], [20, 20], [25, 10], [30, 0]],
  'Cancer': [[0, 0], [10, 5], [20, 0], [15, 10], [25, 15]],
  'Leo': [[0, 0], [10, 5], [20, 0], [15, 10], [25, 15], [20, 25], [10, 20], [0, 25]],
  'Virgo': [[0, 0], [5, 10], [10, 20], [15, 10], [20, 0], [25, 10], [30, 20]],
  'Libra': [[0, 0], [10, 10], [20, 0], [30, 10]],
  'Scorpio': [[0, 0], [10, 5], [20, 0], [30, 5], [25, 15], [35, 20]],
  'Sagittarius': [[0, 0], [10, 10], [20, 5], [30, 15], [25, 25], [15, 20], [5, 30]],
  'Capricorn': [[0, 0], [10, 10], [20, 5], [30, 15], [35, 5], [25, -5]],
  'Aquarius': [[0, 0], [10, 5], [20, 0], [30, 5], [25, 15], [15, 20], [5, 15]],
  'Pisces': [[0, 0], [10, 5], [20, 0], [30, 5], [20, 15], [10, 20], [0, 15]]
};

// Props interface for the ZodiacWheel component
interface ZodiacWheelProps {
  celestialData: CelestialData | null;
}

const ZodiacWheel: React.FC<ZodiacWheelProps> = ({ celestialData }) => {
  // Define the dimensions and radii for the wheel
  const size = 360;
  const padding = 30;
  const adjustedSize = size + padding * 2;
  const center = adjustedSize / 2;
  const outerRadius = size / 2;
  const innerRadius = outerRadius - 53;
  const symbolRadius = innerRadius - 40;
  const constellationRadius = innerRadius + 22;
  const textRadius = outerRadius + 15;

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
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className={'m-3'}
      >
        {/* Generate random stars for the background */}
        {Array.from({ length: 50 }).map((_, i) => {
          const x = Math.random() * adjustedSize;
          const y = Math.random() * adjustedSize;
          const opacity = Math.random() * 0.5 + 0.5;
          return (
            <circle key={i} cx={x} cy={y} r={Math.random() * 0.8 + 0.2} fill="white" opacity={opacity} />
          );
        })}

        {/* Draw the outer and inner circles of the wheel */}
        <circle cx={center} cy={center} r={outerRadius} fill="none" stroke="white" strokeWidth="2" />
        <circle cx={center} cy={center} r={innerRadius} fill="none" stroke="white" strokeWidth="1" />

        {/* Draw the dividing lines for each zodiac sign */}
        {zodiacSigns.map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const innerPoint = getCoordinates(angle, innerRadius);
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
                  cx={basePoint.x + point[0] - 15}
                  cy={basePoint.y + point[1] - 15}
                  r="1"
                  fill="#8a2be2"
                />
              ))}
              {/* Connect stars with lines */}
              {pattern.slice(1).map((point, j) => (
                <line
                  key={`line-${j}`}
                  x1={basePoint.x + pattern[j][0] - 15}
                  y1={basePoint.y + pattern[j][1] - 15}
                  x2={basePoint.x + point[0] - 15}
                  y2={basePoint.y + point[1] - 15}
                  stroke="#8a2be2"
                  strokeWidth="1"
                />
              ))}
            </g>
          );
        })}

        {/* Draw inner circles (like a clock face) */}
        <circle cx={center} cy={center} r="45" fill="none" stroke="white" strokeWidth="1" />
        <circle cx={center} cy={center} r="30" fill="none" stroke="white" strokeWidth="1" />

        {/* Add Roman numerals for clock positions */}
        <text x={center} y={center - 38} fill="white" fontSize="12" textAnchor="middle">XII</text>
        <text x={center + 38} y={center} fill="white" fontSize="12" textAnchor="start">III</text>
        <text x={center} y={center + 42} fill="white" fontSize="12" textAnchor="middle">VI</text>
        <text x={center - 38} y={center} fill="white" fontSize="12" textAnchor="end">IX</text>

        {/* Add zodiac sign names in a circular pattern */}
        {zodiacSigns.map((sign, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const point = getCoordinates(angle, textRadius);
          return (
            <text
              key={`name-${sign}`}
              x={point.x}
              y={point.y}
              fill="white"
              fontSize="12"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${i * 30}, ${point.x}, ${point.y})`}
            >
              {sign}
            </text>
          );
        })}

        {/* Render celestial bodies if data is available */}
        {celestialData && (
          <g>
            {celestialData.table.rows.map((row) => {
              const body = row.cells[0];
              // Calculate the angle based on right ascension (converting hours to degrees)
              const angle = (parseFloat(body.position.equatorial.rightAscension.hours) / 24) * 360;
              const point = getCoordinates((angle - 90) * (Math.PI / 180), innerRadius - 10);
              return (
                <circle
                  key={body.id}
                  cx={point.x}
                  cy={point.y}
                  r={3}
                  fill="yellow"
                  // You might want to add a title or other identifier here
                />
              );
            })}
          </g>
        )}
      </motion.svg>
      
      {/* Rotating container for zodiac symbols */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {zodiacSigns.map((sign, i) => {
          const angle = (i * 30 - 75) * (Math.PI / 180);
          const point = getCoordinates(angle, symbolRadius);
          return (
            <motion.div
              key={`symbol-${sign}`}
              className="absolute text-fuchsia-500 text-xl"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: 'translate(-50%, -50%)',
                textShadow: '0 0 5px #ff00ff',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {zodiacSymbols[sign]}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ZodiacWheel;