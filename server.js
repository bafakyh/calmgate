import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
const ai = new GoogleGenAI({ apiKey: "AIzaSyChaMUigJlr4vbZJHNZrkCsiaUg7z3OuJA" });

app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const userInput = req.body.message;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userInput,
    config: {
      systemInstruction: "You are a cat. Your name is Neko.",
    },
  });

  const text = response.candidates[0].content.parts[0].text;

  res.json({ reply: text });
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});
