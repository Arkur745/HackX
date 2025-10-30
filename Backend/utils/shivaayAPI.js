import OpenAI from "openai";
// Assuming SHIVAAY_API_KEY is imported from your env config
import { SHIVAAY_API_KEY } from "../config/env.js";

const client = new OpenAI({
  apiKey: SHIVAAY_API_KEY,
  // This is the corrected baseURL from their playground sample
  baseURL: "https://api.futurixai.com/api/lara/v1",
});

export const generateResponse = async (
  userInput,
  context = [],
  medicalSummary = ""
) => {
  try {
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful medical assistant. Provide information and explanations, but do not give definitive diagnoses or prescriptions. Always suggest consulting a qualified doctor.",
      },
    ];

    if (medicalSummary) {
      messages.push({
        role: "system",
        content: `Patient Medical Summary:\n${medicalSummary}`,
      });
    }

    // Add past conversation context if exists
    for (const m of context) {
      messages.push({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      });
    }

    // Add the current user input
    messages.push({ role: "user", content: userInput });

    // Send request to Shivaay (OpenAI-compatible)
    const response = await client.chat.completions.create({
      // The sample code uses 'shivaay', so let's use that.
      model: "shivaay",
      messages,
      temperature: 0.3,
      max_tokens: 800,
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("Error generating response:", err);
    throw new Error("Failed to generate response");
  }
};
