// Quotes/jokes based on mood
const moodQuotes = {
  happy: [
  "Keep shining, the world needs your light! ✨😊",
  "Happiness is contagious — go spread it! 😄🌈",
  "Make today so awesome, yesterday gets jealous. 😎🌟",
  "Smiles are free, but they’re worth a lot. 😊💛",
  "A joyful heart is the best therapy. 🎈✨",
  "Laughter is the sun that drives winter from the human face. 😂🌞"
],
  sad: [
  "Why don't scientists trust atoms? Because they make up everything. 😄🧪",
  "You're doing better than you think. 💛😌",
  "Every storm runs out of rain. 🌧🌤",
  "How do you comfort a JavaScript bug? You console it. 🐛💻",
  "What do you call a bear with no teeth? A gummy bear. 🐻🍬",
  "Some days are cloudy — doesn’t mean the sun’s gone. 🌥☀"
],
 angry: [
  "Take a deep breath... peace begins with you. 🧘‍♀😌",
  "Let it go. Not for them — for you. 💨🕊",
  "Your calm mind is the ultimate power. 🧠💪",
  "Anger is one letter short of danger. ⚠😤",
  "Silence is the best reply to a fool. 🤐✌",
  "Pause. Breathe. Respond, don’t react. 🧘‍♂🫧"
],
 stressed: [
  "Breathe in. Breathe out. You're okay. 🌿😮‍💨",
  "Even machines need to restart. So can you. 🔄🤖",
  "One thing at a time. You've got this. 💪📋",
  "Don’t forget to drink water and unclench your jaw. 💧🙂",
  "Progress, not perfection. 🌼🧡",
  "Storms make trees take deeper roots. 🌳⛈"
]
};

// 🎵 Music file names (placed in same folder as index.html)
const musicTracks = {
  happy: "happy.mp3",
  sad: "sad.mp3",
  angry: "angry.mp3",
  stressed: "stressed.mp3"
};

// DOM Elements
const quoteText = document.getElementById('quote-text');
const moodButtons = document.querySelectorAll('.mood-btn');
const anotherBtn = document.getElementById('another-btn');
const musicBtn = document.getElementById('music-btn');
const music = document.getElementById('bg-music');

let currentMood = null;
let musicOn = true;

// Get a random quote for the mood
function getRandomQuote(mood) {
  const quotes = moodQuotes[mood];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Play music
function playMusic(mood) {
  const track = musicTracks[mood];
  if (track) {
    music.src = track;
    if (musicOn) {
      music.play().catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }
}

// Set the mood
function setMood(mood) {
  currentMood = mood;
  quoteText.textContent = getRandomQuote(mood);
  document.body.className = mood;
  playMusic(mood);
}

// Mood buttons
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.dataset.mood;
    setMood(mood);
  });
});

// Show another quote
anotherBtn.addEventListener('click', () => {
  if (currentMood) {
    quoteText.textContent = getRandomQuote(currentMood);
  }
});

// Music toggle
musicBtn.addEventListener('click', () => {
  musicOn = !musicOn;
  if (musicOn) {
    music.play();
    musicBtn.textContent = "🎧 Music On";
  } else {
    music.pause();
    musicBtn.textContent = "🔇 Music Off";
  }
});