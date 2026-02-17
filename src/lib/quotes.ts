const QUOTES = [
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Strength does not come from winning. Your struggles develop your strengths.", author: "Arnold Schwarzenegger" },
  { text: "We are what we repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "It is not that I'm so smart. But I stay with the questions much longer.", author: "Albert Einstein" },
  { text: "Small disciplines repeated with consistency every day lead to great achievements gained slowly over time.", author: "John C. Maxwell" },
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
  { text: "He who conquers himself is the mightiest warrior.", author: "Confucius" },
  { text: "Do not wait to strike till the iron is hot, but make it hot by striking.", author: "William Butler Yeats" },
  { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
  { text: "A river cuts through rock not because of its power, but because of its persistence.", author: "Jim Watkins" },
  { text: "Self-control is strength. Calmness is mastery.", author: "James Allen" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "What we achieve inwardly will change outer reality.", author: "Plutarch" },
  { text: "Be tolerant with others and strict with yourself.", author: "Marcus Aurelius" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "Out of suffering have emerged the strongest souls.", author: "Kahlil Gibran" },
  { text: "Patience is not the ability to wait, but the ability to keep a good attitude while waiting.", author: "Joyce Meyer" },
  { text: "First say to yourself what you would be, and then do what you have to do.", author: "Epictetus" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "Don't count the days. Make the days count.", author: "Muhammad Ali" },
  { text: "With self-discipline most anything is possible.", author: "Theodore Roosevelt" },
  { text: "No man is free who is not master of himself.", author: "Epictetus" },
  { text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
];

/**
 * Returns a quote that changes once per calendar day.
 * Uses the day-of-year to deterministically pick a quote.
 */
export function getDailyQuote(): { text: string; author: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return QUOTES[dayOfYear % QUOTES.length];
}
