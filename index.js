import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/analyze", async (req, res) => {
  const { text } = req.body;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: text }]
  });

  res.json({ result: response.choices[0].message.content });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Bridge running on port", port);
});
