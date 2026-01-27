import type { Level } from '../context/UserContext';
import { BookOpen, MonitorPlay, BrainCircuit } from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: Level;
  duration: string;
  type: 'theory' | 'quiz' | 'simulation';
  icon: any;
  content: any;
}

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Road Signs Basics',
    description: 'Learn the meaning of common road signs and markings.',
    level: 'Beginner',
    duration: '5 min',
    type: 'theory',
    icon: BookOpen,
    content: {
      sections: [
        {
          title: 'Stop Signs',
          body: 'A red octagon with white text. You must come to a complete stop behind the limit line, crosswalk, or corner. Check for pedestrians and other vehicles before proceeding.',
        },
        {
          title: 'Yield Signs',
          body: 'A red and white inverted triangle. You must slow down and be ready to stop if necessary to let other vehicles or pedestrians pass.',
        },
        {
          title: 'Speed Limit Signs',
          body: 'Rectangular white signs with black text indicating the maximum legal speed under ideal conditions. You must adjust your speed for weather, traffic, and road conditions.',
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Intersection Safety',
    description: 'Master the rules of right-of-way at different intersections.',
    level: 'Beginner',
    duration: '10 min',
    type: 'simulation',
    icon: MonitorPlay,
    content: {
      scenario: 'Four-way stop',
      instruction: 'Click the car that has the right of way. Remember: First to stop, first to go. If simultaneous, yield to the right.',
    }
  },
  {
    id: '3',
    title: 'Beginner Quiz',
    description: 'Test your knowledge on signs and basic rules.',
    level: 'Beginner',
    duration: '5 min',
    type: 'quiz',
    icon: BrainCircuit,
    content: {
      questions: [
        {
          question: 'What shape is a stop sign?',
          options: ['Circle', 'Octagon', 'Triangle', 'Square'],
          correct: 1
        },
        {
          question: 'What does a flashing yellow light mean?',
          options: ['Stop completely', 'Proceed with caution', 'Speed up', 'Turn right only'],
          correct: 1
        },
        {
          question: 'When can you turn right on red?',
          options: ['Never', 'Always', 'After stopping and checking for safety, unless prohibited', 'Only when a green arrow is present'],
          correct: 2
        }
      ]
    }
  },
  {
    id: '4',
    title: 'Defensive Driving',
    description: 'Learn to anticipate potential hazards before they happen.',
    level: 'Intermediate',
    duration: '15 min',
    type: 'theory',
    icon: BookOpen,
    content: {
      sections: [
        {
          title: 'Scan the Road',
          body: 'Always look 12-15 seconds ahead. Don\'t just stare at the car in front of you.',
        },
        {
          title: 'Space Cushion',
          body: 'Keep a safe following distance. Use the 3-second rule (increase to 4-5 seconds in bad weather).',
        }
      ]
    }
  },
  {
    id: '5',
    title: 'Hazard Perception',
    description: 'Identify potential hazards in real-time scenarios.',
    level: 'Intermediate',
    duration: '10 min',
    type: 'simulation',
    icon: MonitorPlay,
    content: {
      scenario: 'Urban driving',
      instruction: 'Click on hazards (pedestrians, opening doors, turning cars) as they appear.',
    }
  },
  {
    id: '6',
    title: 'Night Driving',
    description: 'Special considerations for driving in low light conditions.',
    level: 'Advanced',
    duration: '12 min',
    type: 'theory',
    icon: BookOpen,
    content: {
       sections: [
        {
          title: 'Use High Beams Wisely',
          body: 'Use high beams on open roads but dim them when within 500 feet of an oncoming vehicle or 300 feet behind another vehicle.',
        },
        {
          title: 'Reduce Speed',
          body: 'Visibility is reduced at night. Drive at a speed that allows you to stop within the distance lighted by your headlights.',
        }
      ]
    }
  },
  {
    id: '7',
    title: 'Complex Roundabouts',
    description: 'Navigate multi-lane roundabouts with confidence.',
    level: 'Advanced',
    duration: '15 min',
    type: 'simulation',
    icon: MonitorPlay,
    content: {
      scenario: 'Multi-lane roundabout',
      instruction: 'Choose the correct lane for your exit and signal appropriately.',
    }
  },
];
