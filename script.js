const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('messages');
const micBtn = document.getElementById('mic-btn');
const voiceCheckbox = document.getElementById('voiceCheckbox');


// --- Rozpoznawanie mowy ---
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'pl-PL';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micBtn.addEventListener('click', () => {
    recognition.start();
    micBtn.textContent = '🎤'; // Feedback – nagrywa
  });

  recognition.addEventListener('result', (e) => {
    const transcript = e.results[0][0].transcript;
    input.value = transcript;
  });

  recognition.addEventListener('end', () => {
    micBtn.textContent = '🎙️';
  });
} else {
  micBtn.disabled = true;
  micBtn.title = 'Twoja przeglądarka nie obsługuje rozpoznawania mowy';
}

// --- Obsługa formularza ---
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userText = input.value.trim();
  if (!userText) return;

  addMessage('user', userText);
  input.value = '';

  setTimeout(() => {
    const botResponse = getFakeResponse(userText);
    addMessage('bot', botResponse);
    speak(botResponse);
  }, 700);
});

function addMessage(sender, text) {
  const message = document.createElement('div');
  message.classList.add('message', sender);
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function speak(text) {
    if (!voiceCheckbox.checked) return;
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pl-PL';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  } else {
    console.warn("Twoja przeglądarka nie obsługuje syntezatora mowy.");
  }
}

function getFakeResponse(text) {
  const responses = [
    "Ciekawe pytanie!",
    "Hmmm... muszę się zastanowić.",
    "To zależy!",
    "Możesz to powtórzyć inaczej?",
    "Zapisuję to w pamięci!",
    "Jasne, zaraz to sprawdzę."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  // Zmień też ikonę/tekst przycisku
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '☀️ Tryb dzienny';
  } else {
    themeToggle.textContent = '🌙 Tryb nocny';
  }
});
