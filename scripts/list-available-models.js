const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log("Fetching available models for v1beta API...\n");

    // Try v1beta endpoint
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    const data = await response.json();

    if (data.models) {
      console.log("Available Models:");
      console.log("=".repeat(60));

      data.models.forEach(model => {
        console.log(`\nModel: ${model.name}`);
        console.log(`Display Name: ${model.displayName || 'N/A'}`);
        console.log(`Description: ${model.description || 'N/A'}`);

        if (model.supportedGenerationMethods) {
          console.log(`Supported Methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
      });
    } else {
      console.log("No models found or error:", data);
    }
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

listModels();
