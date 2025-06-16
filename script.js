const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userText = input.value.trim();
  if (!userText) return;

  addMessage('user', userText);
  input.value = '';

  setTimeout(() => {
    const botResponse = getFakeResponse(userText);
    addMessage('bot', botResponse);
  }, 700); // symulacja opóźnienia AI
});

function addMessage(sender, text) {
  const message = document.createElement('div');
  message.classList.add('message', sender);
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
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
