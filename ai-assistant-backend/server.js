require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const aiResponse = chatCompletion.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Błąd OpenAI:", error.message);
    res.status(500).json({ error: "Coś poszło nie tak 😢" });
  }
});

app.listen(port, () => {
  console.log(`✅ Serwer działa na http://localhost:${port}`);
});
