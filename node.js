import GoogleGenAI from "@google/genai";
const ai = new GoogleGenAI({});
userInput = "what are dark patterns";
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `${userInput}`,
    config: {
      systemInstruction:
        "You are specialized in dark/deceptive pattern research and are explaining to a user that has litte to no information about the same",
    },
  });
  console.log(response.text);
}
await main();
