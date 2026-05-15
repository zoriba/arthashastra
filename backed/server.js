import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "https://candid-lokum-2e9d79.netlify.app",
  }),
);

app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },

        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are an expert in dark patterns and unethical e-commerce practices. Analyze user input and explain manipulative tactics clearly.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();
    console.log(data);
    res.json({
      reply: data.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
