export interface QuizOption {
  t: string;
  e: string;
  p: number; // base points (1 = 100, 2 = 150, 3 = 200)
  sparkle?: string;
}

export interface QuizQuestion {
  id: string;
  category: "kindness" | "reindeer" | "workshop" | "superpower" | "silly" | "traditions";
  q: string;
  badge: string;
  a: QuizOption[];
}

export const BASE_QUESTIONS: QuizQuestion[] = [
  {
    id: "cookie",
    category: "traditions",
    badge: "🍪 Holiday Sweet Tooth",
    q: "A freshly baked cookie is cooling on the counter for Santa. What's your move?",
    a: [
      { t: "Guard it like a royal treasure! Nobody touches Santa's snack.", e: "🛡️", p: 3, sparkle: "+200 Pts · True Guard!" },
      { t: "Take a microscopic test nibble. Strictly quality control.", e: "🤏", p: 2, sparkle: "+150 Pts · Safety First!" },
      { t: "Oops... it vanished into my belly. I panicked!", e: "😬", p: 1, sparkle: "+100 Pts · Honest Belly!" },
    ],
  },
  {
    id: "tower",
    category: "kindness",
    badge: "🏰 Sibling & Friends",
    q: "Your brother, sister, or pet accidentally knocks over your giant block tower. You...",
    a: [
      { t: "Laugh and team up to build an even taller mega-castle!", e: "🏰", p: 3, sparkle: "+200 Pts · Master Builder!" },
      { t: "Take a big deep breath, sigh dramatically, and forgive them.", e: "😮‍💨", p: 2, sparkle: "+150 Pts · Zen Energy!" },
      { t: "Plot a very silly, giggly snowball revenge.", e: "☃️", p: 1, sparkle: "+100 Pts · Playful Spirit!" },
    ],
  },
  {
    id: "bedtime",
    category: "silly",
    badge: "🛏️ Christmas Eve Bedtime",
    q: "It's bedtime before the big holiday morning. What does your routine look like?",
    a: [
      { t: "Pajamas on, teeth sparkling clean, in bed counting flying reindeer.", e: "🪥", p: 3, sparkle: "+200 Pts · Bedtime Hero!" },
      { t: "Negotiate for 'just five more minutes of holiday magic'!", e: "⏱️", p: 2, sparkle: "+150 Pts · Diplomat!" },
      { t: "Suddenly need to ask 47 very important questions about life.", e: "❓", p: 1, sparkle: "+100 Pts · Curious Mind!" },
    ],
  },
  {
    id: "new_friend",
    category: "kindness",
    badge: "🤝 Friendship Spark",
    q: "A new student joins your class and is sitting all alone at lunch. You...",
    a: [
      { t: "Rush over with a big smile, invite them over, and share a treat!", e: "👋", p: 3, sparkle: "+200 Pts · Heart of Gold!" },
      { t: "Give a friendly wave from your table and save them a seat.", e: "🙂", p: 2, sparkle: "+150 Pts · Sweet Welcome!" },
      { t: "Perform an impromptu goofy joke to make them laugh.", e: "🎭", p: 1, sparkle: "+100 Pts · Cheer Spreader!" },
    ],
  },
  {
    id: "room_tidy",
    category: "workshop",
    badge: "✨ Elf Inspection",
    q: "If Santa's chief inspector elf inspected your bedroom right now, what would they find?",
    a: [
      { t: "Spotless! Everything tucked away like an organized toy workshop.", e: "✨", p: 3, sparkle: "+200 Pts · Elf Approved!" },
      { t: "A cozy, creative kind of messy. I know where everything is!", e: "🧺", p: 2, sparkle: "+150 Pts · Creative Mind!" },
      { t: "A wild dinosaur habitat. Proceed at your own risk!", e: "🌋", p: 1, sparkle: "+100 Pts · Adventure Zone!" },
    ],
  },
  {
    id: "superpower",
    category: "superpower",
    badge: "⚡ Holiday Superpower",
    q: "If you were granted one ultimate holiday superpower, which would you pick?",
    a: [
      { t: "The power to make any sad person burst into joyful laughter!", e: "🤣", p: 3, sparkle: "+200 Pts · Joy Machine!" },
      { t: "Supersonic toy-building speed with magic elf hammers!", e: "🔨", p: 3, sparkle: "+200 Pts · Maker Power!" },
      { t: "Night-vision goggles to spot the sleigh crossing the moon!", e: "🛷", p: 2, sparkle: "+150 Pts · Sky Watcher!" },
    ],
  },
  {
    id: "reindeer_treat",
    category: "reindeer",
    badge: "🥕 Reindeer Flight School",
    q: "Rudolph and the reindeer land on your roof feeling chilly. What snack do you serve?",
    a: [
      { t: "Glittery magical carrots dusted with powdered peppermint sugar!", e: "🥕", p: 3, sparkle: "+200 Pts · Reindeer Chef!" },
      { t: "Crispy red holiday apples sliced into star shapes.", e: "🍎", p: 3, sparkle: "+200 Pts · Star Nutrition!" },
      { t: "Warm oats with a sprinkle of starlight cinnamon.", e: "🥣", p: 2, sparkle: "+150 Pts · Cozy Treat!" },
    ],
  },
  {
    id: "secret_kindness",
    category: "kindness",
    badge: "💌 Secret Secret Agent",
    q: "You have 10 minutes to pull off an anonymous holiday kindness mission. What's your play?",
    a: [
      { t: "Leave a secret encouraging holiday card on a parent's pillow.", e: "💌", p: 3, sparkle: "+200 Pts · Stealth Kindness!" },
      { t: "Quietly wash and put away someone else's breakfast dishes.", e: "🧽", p: 3, sparkle: "+200 Pts · Wonder Helper!" },
      { t: "Draw a cheerful holiday picture and tape it to the fridge.", e: "🎨", p: 2, sparkle: "+150 Pts · Secret Artist!" },
    ],
  },
  {
    id: "snowball",
    category: "silly",
    badge: "❄️ Winter Tactics",
    q: "A friendly neighborhood snowball tournament breaks out. What is your strategy?",
    a: [
      { t: "Build a snow fortress complete with hot cocoa supply depot!", e: "🏰", p: 3, sparkle: "+200 Pts · Snow Architect!" },
      { t: "The stealth snow-ninja dive: sneak up and tap shoulders!", e: "🥷", p: 2, sparkle: "+150 Pts · Frost Ninja!" },
      { t: "Lie down in the snow and make giant laughing snow angels.", e: "👼", p: 2, sparkle: "+150 Pts · Peace Maker!" },
    ],
  },
  {
    id: "elf_job",
    category: "workshop",
    badge: "🎁 North Pole Careers",
    q: "If you could work at the Wonderpost workshop for one day, which department calls you?",
    a: [
      { t: "The Golden Wax Seal Stamping & Letter Ribbon Department!", e: "📜", p: 3, sparkle: "+200 Pts · Master Scribe!" },
      { t: "The Sleigh Flying & Aurora Sky Navigation Room!", e: "🧭", p: 3, sparkle: "+200 Pts · Pilot Prodigy!" },
      { t: "The Holiday Candy Cane Flavor Invention Lab!", e: "🍭", p: 2, sparkle: "+150 Pts · Sweet Scientist!" },
    ],
  },
  {
    id: "gift_wrapping",
    category: "traditions",
    badge: "🎀 Ribbon & Bows",
    q: "You're wrapping a secret present for someone you love. How does it look?",
    a: [
      { t: "Flawless corners, 3 satin bows, and a handwritten heart note.", e: "🎀", p: 3, sparkle: "+200 Pts · Gift Artist!" },
      { t: "Lots of tape everywhere... like, 8 rolls of tape. It's indestructible!", e: "📦", p: 2, sparkle: "+150 Pts · Fort Knox Gift!" },
      { t: "Wrapped in newspaper comic strips with giant colorful smiley faces.", e: "🗞️", p: 2, sparkle: "+150 Pts · Creative Rebel!" },
    ],
  },
  {
    id: "music_spirit",
    category: "traditions",
    badge: "🎶 Caroling Crew",
    q: "When a joyful holiday tune starts playing on the radio, what happens?",
    a: [
      { t: "I sing every single word at top volume with dance moves!", e: "🎤", p: 3, sparkle: "+200 Pts · Carol Superstar!" },
      { t: "Tap my boots and do a little secretly awesome shoulder dance.", e: "🕺", p: 2, sparkle: "+150 Pts · Groovy Elf!" },
      { t: "Play air guitar using a wrapping paper tube!", e: "🎸", p: 3, sparkle: "+200 Pts · Rockin' Reindeer!" },
    ],
  },
];

// Procedural dynamic question generator for virtually unlimited questions!
const ACTIONS = [
  "helping clear the holiday dinner table",
  "sharing your favorite toy with someone",
  "making a handmade card for an elder",
  "comforting a friend who had a rough day",
  "feeding a hungry winter bird outside",
  "saying thank you to someone who helped you",
  "practicing kindness without being asked",
  "holding the door open for someone carrying bags",
  "teaching a younger kid a fun winter game",
  "leaving a cheerful note on the windshield",
];

const REWARDS = [
  { t: "Jump right in with full excitement and joy!", e: "🌟", p: 3, sparkle: "+200 Pts · Pure Joy!" },
  { t: "Do it quietly with a happy little smile.", e: "✨", p: 3, sparkle: "+200 Pts · Quiet Wonder!" },
  { t: "Invent a funny theme song to make it extra fun!", e: "🎵", p: 2, sparkle: "+150 Pts · Song Maker!" },
];

export function getDynamicQuestion(index: number): QuizQuestion {
  if (index < BASE_QUESTIONS.length) {
    return BASE_QUESTIONS[index]!;
  }
  const actionIdx = (index - BASE_QUESTIONS.length) % ACTIONS.length;
  const action = ACTIONS[actionIdx];
  const roundNum = Math.floor(index / BASE_QUESTIONS.length) + 1;
  return {
    id: `dyn_${index}`,
    category: "kindness",
    badge: `🌟 Wonder Mission #${index + 1}`,
    q: `Wonder Quest Round ${roundNum}: When it comes to ${action}, what's your holiday style?`,
    a: REWARDS,
  };
}

export const RANKS = [
  { minPts: 0, title: "Snowflake Scout", emoji: "❄️", badgeColor: "text-mint border-mint/40" },
  { minPts: 500, title: "North Pole Apprentice", emoji: "⭐", badgeColor: "text-gold border-gold/40" },
  { minPts: 1200, title: "Master Toymaker", emoji: "🎁", badgeColor: "text-candy border-candy/40" },
  { minPts: 2200, title: "Reindeer Whisperer", emoji: "🦌", badgeColor: "text-amber-400 border-amber-400/40" },
  { minPts: 3500, title: "Grand Champion of Wonder", emoji: "👑", badgeColor: "text-yellow-300 border-yellow-300/40" },
];

export function getRank(points: number) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (points >= RANKS[i]!.minPts) return RANKS[i]!;
  }
  return RANKS[0]!;
}

// Retain compatibility for tests and legacy callers
export const QUIZ = BASE_QUESTIONS.slice(0, 6);

export function niceScore(points: number[]) {
  const max = points.length * 3;
  const min = points.length * 1;
  const total = points.reduce((a, b) => a + b, 0);
  if (max === min) return 99;
  const ratio = (total - min) / (max - min);
  return Math.round(82 + ratio * 17);
}
