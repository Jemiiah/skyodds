import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { flightNumber, route, departureTime, odds } = await req.json();

    if (!flightNumber) {
      return NextResponse.json(
        { error: "Missing flight data" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert Aviation Risk Analyst. 
      Analyze flight ${flightNumber} (${route}) departing at ${departureTime}.
      
      Market Odds:
      - On Time: ${odds.onTime}%
      - Delayed > 30m: ${odds.delayed30}%
      - Delayed > 2h: ${odds.delayed120}%
      - Cancelled: ${odds.cancelled}%

      Task:
      Provide a risk assessment, most likely outcome, confidence score (0-100), and a trading recommendation.

      IMPORTANT: Return ONLY a raw JSON object. Do not include Markdown formatting.
      {
        "summary": "string",
        "mostLikelyOutcome": "string",
        "confidenceScore": number,
        "keyFactors": ["string", "string"],
        "recommendation": "string"
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful JSON analysis bot." },
        { role: "user", content: prompt },
      ],
      model: "llama-3.1-8b-instant", // Extremely fast & efficient
      temperature: 0.5,
      max_tokens: 1024,
      response_format: { type: "json_object" }, // Llama 3 supports JSON mode natively on Groq
    });

    const content = chatCompletion.choices[0]?.message?.content || "{}";
    const report = JSON.parse(content);

    return NextResponse.json(report);
  } catch (error) {
    console.error("Groq Error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
