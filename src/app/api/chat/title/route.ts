import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is not set in environment variables");
}

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = body?.user as string | undefined;
    const assistant = body?.assistant as string | undefined;

    if (!user || !assistant) {
      return NextResponse.json(
        { error: "Missing 'user' or 'assistant' text in body" },
        { status: 400 },
      );
    }

    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You generate very short, human-friendly chat titles in Vietnamese. Respond with ONLY the title, no quotes, maximum 6 words.",
          },
          {
            role: "user",
            content: `Tóm tắt đoạn hội thoại sau thành một tiêu đề ngắn gọn:\n\nNgười dùng: ${user}\nTrợ lý: ${assistant}`,
          },
        ],
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("Groq title API error:", data);
      return NextResponse.json(
        { error: "Failed to generate title from LLM" },
        { status: groqRes.status },
      );
    }

    const rawTitle: string =
      data?.choices?.[0]?.message?.content ?? "Cuộc trò chuyện";
    const title = rawTitle.trim().replace(/^"+|"+$/g, "");

    return NextResponse.json({ title });
  } catch (error) {
    console.error("Error in /api/chat/title:", error);
    return NextResponse.json(
      { error: "Unexpected server error while generating title" },
      { status: 500 },
    );
  }
}


