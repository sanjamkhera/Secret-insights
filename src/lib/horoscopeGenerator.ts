// src/lib/horoscopeGenerator.ts

import { CelestialData, CelestialBodyCell } from '../types/celestialData';

// Define the main categories for life themes
type LifeThemeCategory = 'relationships' | 'success' | 'personal-growth' | 'wellness';
type Sentiment = 'positive' | 'neutral' | 'challenging';

// Interface for tracking cosmic influences on life aspects
interface LifeAspect {
  primary: LifeThemeCategory;
  secondary: string[];
  intensity: number;
  sentiment: Sentiment;
}

// Structure for organized horoscope themes
interface HoroscopeTheme {
  category: LifeThemeCategory;
  intensity: number;
  description: string;
  advice: string[];
}

export class HoroscopeGenerator {
  // Define the major celestial aspects used in calculations
  private static readonly ASPECTS = {
    harmonious: 0,    // Perfect alignment
    challenging: 180, // Opposition
    growth: 120,     // Opportunity
    action: 90,      // Tension requiring action
  };

  // Comprehensive mapping of life themes and their interpretations
  private static readonly LIFE_THEMES = {
    relationships: {
      positive: [
        'Your charisma is attracting meaningful connections',
        'Your emotional awareness is creating deeper bonds',
        'Your social circle is poised for expansion'
      ],
      neutral: [
        'Focus on maintaining existing relationships',
        'Take time to understand others&39 perspectives',
        'Balance social energy with personal time'
      ],
      challenging: [
        'Important relationships require your attention',
        'Communication needs extra care and patience',
        'Take time to reassess your boundaries'
      ]
    },
    success: {
      positive: [
        'New opportunities align with your goals',
        'Your innovative thinking opens new doors',
        'Success comes through authentic action'
      ],
      neutral: [
        'Stay focused on long-term objectives',
        'Small steps lead to significant progress',
        'Balance ambition with practical action'
      ],
      challenging: [
        'Reassess your approach to challenges',
        'Learn from temporary setbacks',
        'Focus on preparation and planning'
      ]
    },
    'personal-growth': {
      positive: [
        'Your personal transformation accelerates',
        'Inner wisdom guides your path',
        'Creative inspiration flows naturally'
      ],
      neutral: [
        'Focus on steady self-improvement',
        'Balance growth with stability',
        'Take time for self-reflection'
      ],
      challenging: [
        'Growth comes through overcoming obstacles',
        'Important lessons emerge from challenges',
        'Focus on inner strength and resilience'
      ]
    },
    wellness: {
      positive: [
        'Your energy and vitality are heightened',
        'Harmony between mind and body increases',
        'Natural rhythms support your well-being'
      ],
      neutral: [
        'Maintain consistent wellness routines',
        'Balance activity with rest',
        'Focus on sustainable health practices'
      ],
      challenging: [
        'Listen closely to your body&39s needs',
        'Adjust your pace for better balance',
        'Prioritize rest and recovery'
      ]
    }
  };

  /**
   * Calculates the cosmic influence between two celestial bodies
   * Uses position and distance to determine strength and nature of influence
   */
  private static calculateCosmicInfluence(
    celestialBody1: CelestialBodyCell,
    celestialBody2: CelestialBodyCell
  ): number {
    // Convert astronomical positions to angles
    const angle1 = parseFloat(celestialBody1.position.equatorial.rightAscension.hours) * 15;
    const angle2 = parseFloat(celestialBody2.position.equatorial.rightAscension.hours) * 15;

    // Calculate the angular difference and base influence
    const angleDifference = Math.abs(angle1 - angle2);
    const baseInfluence = Math.cos(angleDifference * Math.PI / 180);

    // Adjust influence based on celestial distances
    const distance1 = parseFloat(celestialBody1.distance.fromEarth.au);
    const distance2 = parseFloat(celestialBody2.distance.fromEarth.au);
    const distanceModifier = 1 / ((distance1 + distance2) / 2);

    return (baseInfluence + 1) * distanceModifier;
  }

  /**
   * Generates life aspects based on celestial positions
   * Maps cosmic influences to practical life areas
   */
  private static generateLifeAspects(data: CelestialData): LifeAspect[] {
    const aspects: LifeAspect[] = [];
    const bodies = data.table.rows;
    const categories: LifeThemeCategory[] = ['relationships', 'success', 'personal-growth', 'wellness'];

    // Calculate influences between celestial bodies
    for (let i = 0; i < bodies.length - 1; i++) {
      const influence = this.calculateCosmicInfluence(
        bodies[i].cells[0],
        bodies[i + 1].cells[0]
      );

      // Determine sentiment based on influence strength
      let sentiment: Sentiment;
      if (influence > 0.6) sentiment = 'positive';
      else if (influence > 0.3) sentiment = 'neutral';
      else sentiment = 'challenging';

      aspects.push({
        primary: categories[i % categories.length],
        secondary: this.getSecondaryAspects(influence),
        intensity: influence,
        sentiment
      });
    }

    return aspects;
  }

  /**
   * Maps influence levels to secondary life aspects
   */
  private static getSecondaryAspects(influence: number): string[] {
    if (influence > 0.7) {
      return ['opportunity', 'growth', 'connection'];
    } else if (influence > 0.4) {
      return ['reflection', 'preparation', 'learning'];
    } else {
      return ['patience', 'planning', 'self-care'];
    }
  }

  /**
   * Interprets life aspects into structured horoscope themes
   */
  private static interpretAspects(aspects: LifeAspect[]): HoroscopeTheme[] {
    return aspects.map(aspect => ({
      category: aspect.primary,
      intensity: aspect.intensity,
      description: this.LIFE_THEMES[aspect.primary][aspect.sentiment][
        Math.floor(Math.random() * this.LIFE_THEMES[aspect.primary][aspect.sentiment].length)
      ],
      advice: aspect.secondary.map(secondaryAspect => {
        const adviceOptions = {
          opportunity: [
            'Embrace new possibilities with confidence',
            'Take initiative when opportunities present themselves',
            'Trust in your ability to succeed'
          ],
          growth: [
            'Each experience brings valuable lessons',
            'Your personal growth is accelerating',
            'Trust your journey of development'
          ],
          connection: [
            'Meaningful connections await your engagement',
            'Share your authentic self with others',
            'Build bridges of understanding'
          ],
          reflection: [
            'Take time to connect with your inner wisdom',
            'Quiet moments bring valuable insights',
            'Understanding comes through reflection'
          ],
          preparation: [
            'Lay the groundwork for future success',
            'Careful preparation ensures better outcomes',
            'Plan your next steps mindfully'
          ],
          'self-care': [
            'Prioritize your physical and emotional needs',
            'Find balance in your daily routine',
            'Nurture your well-being'
          ],
          planning: [
            'Strategic thinking leads to success',
            'Consider your long-term vision',
            'Organize your path forward'
          ],
          patience: [
            'Trust in divine timing',
            'Good things come to those who wait',
            'Stay steady on your path'
          ],
          learning: [
            'Every experience brings wisdom',
            'Stay open to new understanding',
            'Knowledge transforms into power'
          ]
        };

        return adviceOptions[secondaryAspect as keyof typeof adviceOptions][
          Math.floor(Math.random() * 3)
        ];
      })
    }));
  }

  /**
   * Main method to generate a complete horoscope
   */
  public static generateHoroscope(
    sign: string,
    celestialData: CelestialData,
    date: string
  ): string {
    const lifeAspects = this.generateLifeAspects(celestialData);
    const themes = this.interpretAspects(lifeAspects);

    return this.createEngagingHoroscope(sign, themes, date);
  }

  /**
   * Creates the final horoscope text with personalized elements
   */
  private static createEngagingHoroscope(
    sign: string,
    themes: HoroscopeTheme[],
    date: string
  ): string {
    const timeOfDay = new Date().getHours() < 12 ? 'morning' : 'day';
    const intro = this.generatePersonalizedIntro(sign, date, timeOfDay);

    const mainContent = themes
      .map(theme => this.createThemeNarrative(theme))
      .join(' ');

    const conclusion =  this.generateEmpoweringConclusion();

    return `${intro} ${mainContent} ${conclusion}`;
  }

  /**
   * Generates a personalized introduction based on time and sign
   */
  private static generatePersonalizedIntro(
    sign: string,
    date: string,
    timeOfDay: string
  ): string {
    const intros = [
      `${sign}, your ${timeOfDay} holds special promise.`,
      `The energy surrounding you today, ${sign}, is particularly noteworthy.`,
      `As you navigate this ${timeOfDay}, ${sign}, the universe offers clear guidance.`,
      `Welcome to a ${timeOfDay} of potential, dear ${sign}.`
    ];

    return intros[Math.floor(Math.random() * intros.length)];
  }

  /**
   * Creates a narrative for each theme with appropriate intensity
   */
  private static createThemeNarrative(theme: HoroscopeTheme): string {
    const intensityWords = {
      high: ['powerfully', 'significantly', 'strongly'],
      medium: ['notably', 'distinctly', 'measurably'],
      low: ['gently', 'subtly', 'quietly']
    };

    const intensity = theme.intensity > 0.7 ? 'high' : theme.intensity > 0.4 ? 'medium' : 'low';
    const intensityWord = intensityWords[intensity][Math.floor(Math.random() * 3)];

    return `${theme.description} ${intensityWord}. ${theme.advice[Math.floor(Math.random() * theme.advice.length)]
      }`;
  }

  /**
   * Generates an empowering conclusion based on the dominant theme
   */
  private static generateEmpoweringConclusion(): string {  // Remove dominantTheme parameter
    const conclusions = [
      'Trust your inner wisdom as you embrace these energies.',
      'The universe supports your journey toward your highest good.',
      'Stay open to the boundless possibilities that await you.',
      'Your path is illuminated by cosmic wisdom.'
    ];
  
    return conclusions[Math.floor(Math.random() * conclusions.length)];
  }
}