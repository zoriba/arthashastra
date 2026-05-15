import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(
  cors({
    origin: "https://candid-lokum-2e9d79.netlify.app",
  }),
);

app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        error: "No message provided",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an educational AI assistant that helps users understand dark patterns, manipulative UI design, online shopping tricks, and ethical e-commerce practices.

Your goals are:
- explain concepts clearly
- answer questions simply
- provide examples when helpful
- keep answers concise but informative
- avoid overly technical language
- encourage safe and informed online behavior

Do not use markdown formatting like **, ##, bullet points, or code blocks.

Keep responses clean and readable in plain text.
`,
        },

        {
          role: "user",

          content: userMessage,
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content;

    res.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message || "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
