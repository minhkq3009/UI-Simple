import { NextRequest, NextResponse } from "next/server";

// Dùng Groq (LLM free tier, OpenAI-compatible)
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is not set in environment variables");
}

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// Đơn giản hoá: chuẩn hoá một số teencode / viết tắt phổ biến của tiếng Việt
function normalizeVietnameseSlang(input: string): string {
  let text = input;

  const rules: [RegExp, string][] = [
    [/\bm\b/gi, "mày"],
    [/\bt\b/gi, "tớ"],
    [/\bmk\b/gi, "mày"],
    [/\btao\b/gi, "tao"],
    [/\bko\b/gi, "không"],
    [/\bk\b/gi, "không"],
    [/\bkhum\b/gi, "không"],
    [/\bkhum\b/gi, "không"],
    [/\bđc\b/gi, "được"],
    [/\bdc\b/gi, "được"],
    [/\bj\b/gi, "gì"],
    [/\bvs\b/gi, "với"],
    [/\bhok\b/gi, "không"],
  ];

  for (const [pattern, replacement] of rules) {
    text = text.replace(pattern, replacement);
  }

  return text;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message as string | undefined;
    const historyInput = Array.isArray(body?.history)
      ? (body.history as Array<{ role?: string; content?: unknown }>)
      : null;

    const historyMessages =
      historyInput
        ?.map((m) => ({
          role: m.role,
          content: m.content,
        }))
        .filter(
          (m): m is { role: "user" | "assistant"; content: string } =>
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.trim().length > 0,
        ) ?? [];

    if (
      (!message || typeof message !== "string") &&
      historyMessages.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing 'message' or 'history' in request body" },
        { status: 400 },
      );
    }

    const normalizedHistory = historyMessages.map((m) => ({
      role: m.role,
      content: m.role === "user" ? normalizeVietnameseSlang(m.content) : m.content,
    }));

    const normalizedMessage =
      message && typeof message === "string"
        ? normalizeVietnameseSlang(message)
        : message;

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
              "You are a helpful assistant for a Vietnamese chat UI. Users often write in informal Vietnamese chat slang and abbreviations (for example: 'm' = 'mày', 't' = 'tao/tớ', 'k'/'ko' = 'không', 'dc'/'đc' = 'được', 'j' = 'gì'). Always interpret these abbreviations correctly based on context. You see the full conversation history, so use previous turns to resolve references (like 'các hãng xe kia'). Format your responses using Markdown when helpful (headings using ##, bullet lists, and fenced code blocks for code). Keep answers concise and in the same language style as the user (usually Vietnamese).",
          },
          ...(normalizedHistory.length > 0
            ? normalizedHistory
            : [
                {
                  role: "user" as const,
                  content: normalizedMessage as string,
                },
              ]),
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

