const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("❌ API_KEY not set in .env file!");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// 👉 Serve static files like talk.html, app.js, css, etc.
app.use(express.static(path.join(__dirname)));

// test endpoint
app.get("/", (req, res) => {
  res.send("✅ Doraemon server is up and running!");
});

// main chat endpoint (to match your frontend: /api/chat)
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message?.trim();
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided!" });
  }

  console.log("👤 User:", userMessage);

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // ✅ working model
        messages: [
          {
            role: "system",
            content: "You are Doraemon, the friendly robot cat from the future. Answer in a fun and helpful way!",
          },
          { role: "user", content: userMessage },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botReply =
      response.data.choices?.[0]?.message?.content?.trim() ||
      "No reply from Doraemon.";
    console.log("🤖 Doraemon:", botReply);

    res.json({ reply: botReply });
  } catch (err) {
    console.error(
      "❌ Error from OpenRouter:",
      err.response?.data || err.message || err
    );
    res
      .status(500)
      .json({ error: "Doraemon is busy right now. Please try again later!" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Doraemon server running at http://localhost:${PORT}`);
});
