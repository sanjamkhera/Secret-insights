'use client'

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CelestialData } from "@/types/celestialData";
import { Sparkles } from 'lucide-react';

// Define zodiac constellations and their nearby non-zodiac constellations
const CONSTELLATION_TO_ZODIAC: Record<string, string> = {
  // Direct zodiac mappings
  'Ari': 'Aries',
  'Tau': 'Taurus',
  'Gem': 'Gemini',
  'Cnc': 'Cancer',
  'Leo': 'Leo',
  'Vir': 'Virgo',
  'Lib': 'Libra',
  'Sco': 'Scorpio',
  'Sgr': 'Sagittarius',
  'Cap': 'Capricorn',
  'Aqr': 'Aquarius',
  'Psc': 'Pisces',
  
  // Non-zodiac to nearest zodiac mappings
  'Oph': 'Sagittarius',
  'Cet': 'Pisces',
  'Ori': 'Taurus',
  'Hya': 'Leo',
  'Ser': 'Scorpio',
  'Aql': 'Capricorn',
};

const getZodiacSign = (constellation: string): string => {
  const constCode = constellation.substring(0, 3);
  return CONSTELLATION_TO_ZODIAC[constCode] || 'Unknown';
};

export const CelestialTable = ({ data }: { data: CelestialData }) => {
  const celestialBodies = data.table.rows
    .map(row => ({
      planet: row.entry.name,
      constellation: row.cells[0].position.constellation.short,
      zodiac: getZodiacSign(row.cells[0].position.constellation.short)
    }))
    .filter(body => body.planet !== 'Earth');

  return (
    <Card className="bg-transparent text-white shadow-lg border-black-400 border-2 max-w-sm mx-auto rounded-3xl overflow-hidden transition-all duration-300 ease-in-out transform">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
          <h3 className="text-xl font-thin text-white">Current Planetary Alignments</h3>
        </div>
        
        <div className="overflow-hidden rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-900/40">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-blue-200">
                    Celestial Body
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-blue-200">
                    Current Sign
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-800/30">
                {celestialBodies.map(({ planet, zodiac }, index) => (
                  <tr 
                    key={planet}
                    className={`
                      ${index % 2 === 0 ? 'bg-blue-900/20' : 'bg-blue-900/10'}
                      hover:bg-blue-800/30 transition-colors duration-150
                    `}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium text-blue-100">{planet}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-blue-200">{zodiac}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-blue-300/70 italic">
            Observed from Vancouver, Canada
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CelestialTable;