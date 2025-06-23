const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "nous-hermes",
      prompt: userMessage,
      stream: false
    });

    const aiResponse = response.data.response;
    res.json({ response: aiResponse });

  } catch (error) {
    console.error("Błąd Ollama:", error.message);
    res.status(500).json({ error: "Model nie odpowiedział. Sprawdź, czy Ollama działa." });
  }
});

app.listen(port, () => {
  console.log(`✅ Proxy server działa na http://localhost:${port}`);
});
