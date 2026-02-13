import type { Level } from '../context/UserContext';
import { BookOpen, MonitorPlay, BrainCircuit } from 'lucide-react';
import schoolAheadSign from '../assets/file.svg';

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
          title: 'Mandatory: STOP Sign',
          image: 'https://img.icons8.com/color/240/stop-sign.png',
          body: 'A red octagon. You must come to a complete stop before the stop line or crosswalk. Check for traffic and proceed only when safe.',
        },
        {
          title: 'Mandatory: GIVE WAY',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTSAxMCwxMCBMIDE5MCwxMCBMIDEwMCwxOTAgWiIgZmlsbD0id2hpdGUiIHN0cm9rZT0iI2QzMmYyZiIgc3Ryb2tlLXdpZHRoPSIxNSIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9ImJsYWNrIj5HSVZFPC90ZXh0PgogIDx0ZXh0IHg9IjEwMCIgeT0iMTA1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJibGFjayI+V0FZPC90ZXh0Pgo8L3N2Zz4=',
          body: 'An inverted triangle with red border. You must slow down and give priority to traffic on the main road.',
        },
        {
          title: 'Mandatory: NO ENTRY',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI4NSIgZmlsbD0id2hpdGUiIHN0cm9rZT0iI2QzMmYyZiIgc3Ryb2tlLXdpZHRoPSIxNSIgLz4KICA8Zz4KICAgIDxyZWN0IHg9IjkyIiB5PSI3MCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjcwIiBmaWxsPSJibGFjayIgLz4KICAgIDxwYXRoIGQ9Ik0gNzUsODAgTCAxMDAsNDUgTCAxMjUsODAgWiIgZmlsbD0iYmxhY2siIC8+CiAgPC9nPgogIDxsaW5lIHgxPSI1NSIgeTE9IjU1IiB4Mj0iMTQ1IiB5Mj0iMTQ1IiBzdHJva2U9IiNkMzJmMmYiIHN0cm9rZS13aWR0aD0iMTUiIC8+Cjwvc3ZnPg==',
          body: 'A red circle with a black arrow pointing up and a red diagonal slash. It indicates that entry is prohibited for all vehicles in the straight direction.',
        },
        {
          title: 'Cautionary: SCHOOL AHEAD',
          image: schoolAheadSign,
          body: 'A red triangle with a silhouette of a child running with a school bag. Slow down and be alert for children crossing the road near schools.',
        },
        {
          title: 'Cautionary: PEDESTRIAN CROSSING',
          image: 'https://img.icons8.com/color/240/walking-off-road.png',
          body: 'A triangle showing a person walking. Slow down and be ready to stop for pedestrians.',
        },
        {
          title: 'Informatory: HOSPITAL',
          image: 'https://img.icons8.com/color/240/hospital-sign.png',
          body: 'A blue rectangle with a bed symbol. Indicates a hospital is nearby. Avoid using the horn.',
        },
        {
          title: 'Mandatory: NO HORN',
          image: 'https://img.icons8.com/color/240/no-audio.png',
          body: 'A circle with a horn symbol and a red diagonal bar. Do not use the horn except to avoid an accident.',
        },
        {
          title: 'Mandatory: COMPULSORY AHEAD',
          image: 'https://img.icons8.com/color/240/up.png',
          body: 'A blue circle with a white arrow pointing up. You must only proceed straight.',
        },
        {
          title: 'Cautionary: NARROW BRIDGE',
          image: 'https://img.icons8.com/color/240/bridge.png',
          body: 'A triangle showing a road narrowing. Slow down and watch for oncoming traffic on the bridge.',
        },
        {
          title: 'Mandatory: ONE WAY',
          image: 'https://img.icons8.com/color/240/one-way-street.png',
          body: 'A blue rectangle with a white arrow. Indicates traffic is allowed in one direction only.',
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
          question: 'What does a red traffic signal indicate?',
          options: ['Go', 'Stop', 'Slow down', 'Turn left'],
          correct: 1
        },
        {
          question: 'What should you do when you see a yellow traffic light?',
          options: ['Speed up', 'Stop immediately', 'Slow down and be ready to stop', 'Ignore it'],
          correct: 2
        },
        {
          question: 'What does a green traffic signal mean?',
          options: ['Stop', 'Go if the road is clear', 'Slow down', 'Turn right only'],
          correct: 1
        },
        {
          question: 'What does this road sign mean? (Triangle with red border)',
          options: ['Mandatory instruction', 'Informative sign', 'Warning sign', 'Direction sign'],
          correct: 2
        },
        {
          question: 'What is the maximum speed limit near a school (unless specified)?',
          options: ['25 km/h', '40 km/h', '60 km/h', '80 km/h'],
          correct: 0
        },
        {
          question: 'When should you use a horn?',
          options: ['At night', 'Near hospitals', 'To warn other road users', 'In silence zones'],
          correct: 2
        },
        {
          question: 'What does a zebra crossing indicate?',
          options: ['Parking area', 'Speed breaker', 'Pedestrian crossing', 'No entry'],
          correct: 2
        },
        {
          question: 'What should a driver do when approaching a pedestrian crossing?',
          options: ['Speed up', 'Stop if pedestrians are waiting', 'Sound horn continuously', 'Ignore pedestrians'],
          correct: 1
        },
        {
          question: 'What does a circular road sign with red border indicate?',
          options: ['Warning', 'Mandatory instruction', 'Information', 'Direction'],
          correct: 1
        },
        {
          question: 'What is the legal age to get a Learner’s Licence for two-wheelers with gear in India?',
          options: ['16 years', '17 years', '18 years', '21 years'],
          correct: 2
        },
        {
          question: 'What should you do when an ambulance is approaching from behind?',
          options: ['Stop immediately', 'Speed up', 'Give way by moving to the side', 'Ignore it'],
          correct: 2
        },
        {
          question: 'Driving under the influence of alcohol is:',
          options: ['Allowed in small quantity', 'Allowed at night', 'Not an offence', 'A punishable offence'],
          correct: 3
        },
        {
          question: 'What does this sign mean? (Horn with a cross mark)',
          options: ['Horn compulsory', 'No horn', 'Sound horn', 'Horn allowed'],
          correct: 1
        },
        {
          question: 'What is the main purpose of seat belts?',
          options: ['Decoration', 'Comfort', 'Safety during accidents', 'Avoid police fine'],
          correct: 2
        },
        {
          question: 'Which side of the road should vehicles drive in India?',
          options: ['Right side', 'Left side', 'Any side', 'Middle'],
          correct: 1
        },
        {
          question: 'What does a broken white line on the road mean?',
          options: ['No overtaking', 'Lane divider, overtaking allowed', 'Road closed', 'Stop line'],
          correct: 1
        },
        {
          question: 'What should you do at an unmanned railway crossing?',
          options: ['Cross fast', 'Stop, look both sides, then cross', 'Sound horn and cross', 'Ignore and cross'],
          correct: 1
        },
        {
          question: 'What does a blue road sign usually indicate?',
          options: ['Prohibition', 'Warning', 'Information or service', 'Stop'],
          correct: 2
        },
        {
          question: 'Using a mobile phone while driving is:',
          options: ['Allowed', 'Allowed at signals', 'Allowed in traffic', 'Prohibited'],
          correct: 3
        },
        {
          question: 'What should you do if traffic police gives a hand signal to stop?',
          options: ['Ignore it', 'Follow traffic signal', 'Follow police instruction', 'Speed up'],
          correct: 2
        }
      ]
    }
  },
  {
    id: '8',
    title: 'Intermediate Quiz',
    description: 'Test your knowledge on intermediate driving concepts.',
    level: 'Intermediate',
    duration: '10 min',
    type: 'quiz',
    icon: BrainCircuit,
    content: {
      questions: [
        {
          question: 'When two vehicles approach an uncontrolled intersection at the same time, who has the right of way?',
          options: ['Vehicle on the right', 'Vehicle on the left', 'Faster vehicle', 'Bigger vehicle'],
          correct: 0
        },
        {
          question: 'What does a solid white line in the middle of the road indicate?',
          options: ['Lane divider, overtaking allowed', 'No overtaking', 'Stop line', 'Pedestrian crossing'],
          correct: 1
        },
        {
          question: 'What should you do when traffic light is green but the intersection is blocked?',
          options: ['Enter the intersection', 'Wait until the intersection is clear', 'Sound horn and move', 'Move slowly'],
          correct: 1
        },
        {
          question: 'What is the punishment for driving without a valid licence?',
          options: ['Warning only', '₹500 fine', '₹5000 fine and/or imprisonment', 'No punishment'],
          correct: 2
        },
        {
          question: 'What does a red circular sign with a white horizontal line indicate?',
          options: ['No parking', 'No stopping', 'No entry', 'One way'],
          correct: 2
        },
        {
          question: 'What should you do if your vehicle skids on a wet road?',
          options: ['Apply sudden brakes', 'Turn steering sharply', 'Ease off accelerator and steer gently', 'Speed up'],
          correct: 2
        },
        {
          question: 'Overtaking is not allowed:',
          options: ['On a straight road', 'On a narrow bridge', 'During daytime', 'When road is clear'],
          correct: 1
        },
        {
          question: 'What does a double solid line on the road mean?',
          options: ['Overtaking allowed for both', 'Overtaking allowed on one side', 'No overtaking for both directions', 'Lane divider'],
          correct: 2
        },
        {
          question: 'When should headlights be dipped?',
          options: ['While overtaking', 'When vehicle approaches from opposite direction', 'On highways', 'In fog'],
          correct: 1
        },
        {
          question: 'What does a flashing red signal mean?',
          options: ['Go slowly', 'Stop and proceed when safe', 'No entry', 'Speed up'],
          correct: 1
        },
        {
          question: 'What is the correct hand signal for stopping?',
          options: ['Arm stretched sideways', 'Arm raised upward', 'Arm bent downward', 'Circular movement'],
          correct: 1
        },
        {
          question: 'What should a driver do at a roundabout?',
          options: ['Give way to traffic entering', 'Give way to traffic already on the roundabout', 'Stop completely', 'Sound horn'],
          correct: 1
        },
        {
          question: 'What is the minimum distance to keep from the vehicle ahead at high speed?',
          options: ['1 second gap', '2 second gap', '5 second gap', 'No fixed distance'],
          correct: 1
        },
        {
          question: 'What does this sign indicate? (Triangle with children symbol)',
          options: ['Hospital zone', 'Pedestrian crossing', 'School ahead', 'Playground'],
          correct: 2
        },
        {
          question: 'Parking is prohibited:',
          options: ['Near traffic signals', 'Near hospitals', 'On footpaths', 'All of the above'],
          correct: 3
        },
        {
          question: 'What should you do if your brakes fail while driving?',
          options: ['Switch off engine immediately', 'Use hand brake gradually', 'Jump out', 'Accelerate'],
          correct: 1
        },
        {
          question: 'What does a blue circular sign indicate?',
          options: ['Prohibition', 'Mandatory instruction', 'Warning', 'Stop'],
          correct: 1
        },
        {
          question: 'Driving at night without headlights is:',
          options: ['Allowed', 'Allowed in city', 'Dangerous and illegal', 'Safe'],
          correct: 2
        },
        {
          question: 'What should you do when you see a “STOP” sign?',
          options: ['Slow down', 'Stop completely and proceed if safe', 'Sound horn', 'Ignore if road is clear'],
          correct: 1
        },
        {
          question: 'What is the main cause of road accidents in India?',
          options: ['Road condition', 'Weather', 'Human error', 'Vehicle failure'],
          correct: 2
        },
        {
          question: 'What does a yellow box junction mean?',
          options: ['Parking allowed', 'Do not stop unless exit is clear', 'Speed breaker', 'Pedestrian area'],
          correct: 1
        },
        {
          question: 'What is the legal blood alcohol limit for private vehicle drivers in India?',
          options: ['10 mg/100 ml', '20 mg/100 ml', '30 mg/100 ml', '50 mg/100 ml'],
          correct: 2
        },
        {
          question: 'What should you do when driving downhill?',
          options: ['Use neutral gear', 'Use low gear', 'Switch off engine', 'Increase speed'],
          correct: 1
        },
        {
          question: 'What does a broken yellow line indicate?',
          options: ['Overtaking allowed', 'No overtaking', 'Road closed', 'Stop line'],
          correct: 0
        },
        {
          question: 'What is the validity of a Learner’s Licence in India?',
          options: ['3 months', '6 months', '1 year', '5 years'],
          correct: 1
        },
        {
          question: 'When fog reduces visibility, what should be used?',
          options: ['High beam', 'Low beam / fog lamps', 'Parking lights', 'Hazard lights only'],
          correct: 1
        },
        {
          question: 'What should you do before changing lanes?',
          options: ['Speed up', 'Apply brakes', 'Check mirrors and signal', 'Sound horn'],
          correct: 2
        },
        {
          question: 'What does a red triangle sign indicate?',
          options: ['Mandatory', 'Prohibitory', 'Warning', 'Informative'],
          correct: 2
        },
        {
          question: 'Driving a vehicle with defective brakes is:',
          options: ['Allowed', 'Allowed slowly', 'Prohibited', 'Allowed at night'],
          correct: 2
        },
        {
          question: 'What is the correct action when a vehicle in front stops suddenly?',
          options: ['Overtake', 'Apply brakes and maintain safe distance', 'Sound horn', 'Turn sharply'],
          correct: 1
        },
        {
          question: 'What does a white transverse line at an intersection mean?',
          options: ['Speed breaker', 'Stop line', 'Lane marking', 'Parking line'],
          correct: 1
        },
        {
          question: 'What is compulsory for two-wheeler riders?',
          options: ['Sunglasses', 'Helmet', 'Gloves', 'Jacket'],
          correct: 1
        },
        {
          question: 'What should you do when approaching a blind curve?',
          options: ['Speed up', 'Keep to the left and slow down', 'Overtake', 'Switch off lights'],
          correct: 1
        },
        {
          question: 'What does a No U-Turn sign mean?',
          options: ['U-turn allowed', 'U-turn prohibited', 'Turn right', 'Turn left'],
          correct: 1
        },
        {
          question: 'What is the meaning of a green arrow signal?',
          options: ['Go straight only', 'Turn in arrow direction', 'Stop', 'Slow down'],
          correct: 1
        },
        {
          question: 'What should you do if tyre bursts while driving?',
          options: ['Brake hard', 'Hold steering firmly and slow down', 'Jump out', 'Turn sharply'],
          correct: 1
        },
        {
          question: 'What does “Give Way” sign mean?',
          options: ['Stop immediately', 'Give priority to other traffic', 'Speed up', 'Park'],
          correct: 1
        },
        {
          question: 'What is the first thing to do after a road accident?',
          options: ['Run away', 'Help injured and inform police', 'Move vehicle immediately', 'Argue'],
          correct: 1
        },
        {
          question: 'What does a flashing yellow signal indicate?',
          options: ['Stop', 'Proceed with caution', 'No entry', 'Speed up'],
          correct: 1
        },
        {
          question: 'What should you do when driving behind a cyclist?',
          options: ['Overtake closely', 'Maintain safe distance', 'Sound horn continuously', 'Push cyclist'],
          correct: 1
        }
      ]
    }
  },
  {
    id: '6',
    title: 'Night Driving',
    description: 'Special considerations for driving in low light conditions.',
    level: 'Expert',
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
    level: 'Expert',
    duration: '15 min',
    type: 'simulation',
    icon: MonitorPlay,
    content: {
      scenario: 'Multi-lane roundabout',
      instruction: 'Choose the correct lane for your exit and signal appropriately.',
    }
  },
];
