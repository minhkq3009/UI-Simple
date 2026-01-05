import { NextRequest, NextResponse } from "next/server";

// Dùng Groq (LLM free tier, OpenAI-compatible)
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is not set in environment variables");
}

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message as string | undefined;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'message' in request body" },
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
              "You are a helpful assistant for a demo chat UI. Format your responses using Markdown when helpful (headings using ##, bullet lists, and fenced code blocks for code). Keep answers concise.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("Groq API error:", data);
      const rawMessage: string =
        typeof data?.error?.message === "string"
          ? data.error.message
          : "Unknown error from Groq API";

      let friendlyMessage = `LLM error (${groqRes.status}): ${rawMessage}`;
      if (groqRes.status === 401) {
        friendlyMessage =
          "GROQ_API_KEY không hợp lệ hoặc bị thiếu. Hãy kiểm tra lại key trong .env.local.";
      } else if (groqRes.status === 429) {
        friendlyMessage =
          "Groq báo hết quota / rate limit (429). Hãy đợi một lúc hoặc kiểm tra hạn mức tài khoản Groq.";
      }

      return NextResponse.json(
        { error: friendlyMessage },
        { status: groqRes.status },
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content ?? "LLM không trả về nội dung.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      {
        error:
          "Có lỗi không mong đợi ở server khi gọi LLM. Vui lòng thử lại sau.",
      },
      { status: 500 },
    );
  }
}

