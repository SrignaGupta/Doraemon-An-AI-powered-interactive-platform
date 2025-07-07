const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3000;

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("❌ API_KEY not set in .env file!");
  process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("User message:", userMessage);

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // ✅ WORKING MODEL
        messages: [
          { role: "system", content: "You are Doraemon, the friendly robot cat from the future. Answer in a fun and helpful way!" },
          { role: "user", content: userMessage }
        ],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const botReply = response.data.choices?.[0]?.message?.content || "No reply from Doraemon.";
    res.json({ reply: botReply.trim() });

  } catch (err) {
    console.error("❌ Error from OpenRouter:", err.response?.data || err.message);
    res.status(500).json({ error: "Doraemon is busy right now. Please try again later!" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Doraemon server running at http://localhost:${PORT}`);
});
