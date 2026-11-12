export const QUIZ = [
  { q: "A cookie is left out for Santa. You…", a: [
    { t: "Leave it. Obviously.", e: "🍪", p: 3 },
    { t: "Take a tiny nibble. Quality control.", e: "🤏", p: 2 },
    { t: "It's gone. I panicked.", e: "😬", p: 1 },
  ] },
  { q: "Your sibling (or pet) knocks over your tower. You…", a: [
    { t: "Help them build a bigger one", e: "🏰", p: 3 },
    { t: "Sigh dramatically, then forgive", e: "😮‍💨", p: 2 },
    { t: "Plot elaborate revenge", e: "🦹", p: 1 },
  ] },
  { q: "Bedtime is announced. You…", a: [
    { t: "Brush teeth, pyjamas, done", e: "🪥", p: 3 },
    { t: "Negotiate five more minutes", e: "⏱️", p: 2 },
    { t: "Suddenly have 40 questions", e: "❓", p: 1 },
  ] },
  { q: "Someone new joins your class. You…", a: [
    { t: "Say hi and show them around", e: "👋", p: 3 },
    { t: "Smile from a safe distance", e: "🙂", p: 2 },
    { t: "Wait to see if they have snacks", e: "🥨", p: 1 },
  ] },
  { q: "Your room right now is…", a: [
    { t: "Tidy enough for an elf inspection", e: "✨", p: 3 },
    { t: "An organised kind of messy", e: "🧺", p: 2 },
    { t: "A natural habitat", e: "🌋", p: 1 },
  ] },
  { q: "Pick a Christmas superpower:", a: [
    { t: "Making everyone laugh", e: "🤣", p: 3 },
    { t: "Finding the best presents", e: "🎁", p: 3 },
    { t: "Staying up to spot the sleigh", e: "🛷", p: 2 },
  ] },
] as const;

/** Everyone's on the Nice List; the score just decides how nice. Range 82–99. */
export function niceScore(points: number[]) {
  const max = QUIZ.length * 3;
  const min = QUIZ.length * 1;
  const total = points.reduce((a, b) => a + b, 0);
  const ratio = (total - min) / (max - min);
  return Math.round(82 + ratio * 17);
}
