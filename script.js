const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('messages');
const micBtn = document.getElementById('mic-btn');
const voiceCheckbox = document.getElementById('voiceCheckbox');
const themeToggle = document.getElementById('themeToggle');

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
    micBtn.textContent = '🎤';
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
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userText = input.value.trim();
  if (!userText) return;

  addMessage('user', userText);
  input.value = '';

  const botResponse = await fetchAIResponse(userText);
  addMessage('bot', botResponse);
  speak(botResponse);
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

async function fetchAIResponse(userMessage) {
  try {
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Błąd podczas komunikacji z serwerem:", error);
    return "Przepraszam, nie mogę teraz odpowiedzieć 😢";
  }
}

// --- Tryb nocny ---
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Tryb dzienny' : '🌙 Tryb nocny';
});