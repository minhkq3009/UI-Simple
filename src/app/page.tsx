"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

type LandingMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<LandingMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [counter, setCounter] = useState(1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const userMessage: LandingMessage = {
      id: counter,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setCounter((prev) => prev + 1);
    setInput("");
    setIsThinking(true);

    try {
      const historyPayload = [...messages, userMessage]
        .slice(-6)
        .map(({ role, content }) => ({ role, content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed, history: historyPayload }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage: string =
          typeof data?.error === "string" && data.error.trim().length > 0
            ? data.error
            : `Có lỗi khi gọi LLM (mã ${res.status}).`;

        const errorReply: LandingMessage = {
          id: counter + 1,
          role: "assistant",
          content: errorMessage,
        };

        setMessages((prev) => [...prev, errorReply]);
        setCounter((prev) => prev + 1);
        return;
      }

      const replyText: string =
        typeof data.reply === "string" && data.reply.trim().length > 0
          ? data.reply
          : "LLM không trả về nội dung hợp lệ.";

      const reply: LandingMessage = {
        id: counter + 1,
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, reply]);
      setCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Error sending landing message:", error);
      const errorReply: LandingMessage = {
        id: counter + 1,
        role: "assistant",
        content:
          "Có lỗi khi gọi LLM. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.",
      };
      setMessages((prev) => [...prev, errorReply]);
      setCounter((prev) => prev + 1);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top nav giống ChatGPT landing */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/image.png"
            alt="Logo"
            width={24}
            height={24}
            className="h-7 w-7"
          />
          <span className="text-sm font-semibold text-gray-800">
            Chat Demo
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/chat" })}
            className="rounded-full bg-black px-3.5 py-1.5 font-medium text-white hover:bg-neutral-800"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/chat" })}
            className="rounded-full border border-gray-300 px-3 py-1.5 text-gray-800 hover:bg-gray-50"
          >
            Sign up for free
          </button>
        </div>
      </header>

      {/* Main hero + lightweight chat box */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 pb-16">
        <div className="w-full max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              What can we help you build today?
            </h1>
          </div>

          {/* Simple messages area – chỉ trong session, không lưu localStorage */}
          {messages.length > 0 && (
            <div className="mb-6 max-h-[260px] overflow-y-auto rounded-2xl border border-gray-100 bg-gray-50/60 px-4 py-3">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-black text-white"
                          : "bg-white text-gray-900 shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
                      Đang soạn câu trả lời...
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Input card giống hộp search ở landing ChatGPT */}
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl rounded-3xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3 px-5 py-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything"
                className="flex-1 border-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white disabled:cursor-not-allowed disabled:bg-gray-500"
                aria-label="Send message"
              >
                <span className="text-xs font-semibold">↩</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-gray-100 px-5 py-3 text-[11px] text-gray-500">
              <span className="rounded-full bg-gray-100 px-3 py-1">
                Attach
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1">
                Search
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1">
                Learn
              </span>
              <span className="rounded-full bg-gray-100 px-3 py-1">
                Generate images
              </span>
              <span className="ml-auto text-[10px] text-gray-400">
                Chats on this page are not saved to your history.
              </span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
