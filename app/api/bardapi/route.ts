import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_BARD_API_KEY as string
);

async function run(userInput: string): Promise<string> {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = userInput;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  return text;
}

export const GET = async (req: NextRequest) => {
  try {
    const prompt = await req.url.split("?prompt=")[1];
    const result = await run(prompt);
    return NextResponse.json(
      {
        content: result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
};
