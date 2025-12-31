"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import {
  Plus,
  MessageSquare,
  Search,
  ImageIcon,
  AppWindow,
  FolderKanban,
  Send,
  Sparkles,
  Palette,
  Settings,
  HelpCircle,
  LogOut,
  Play,
  Bell,
  Users,
  Shield,
  Database,
  User,
  ChevronDown,
  Check,
} from "lucide-react";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type Theme = "light" | "dark";

export default function ChatPage() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [counter, setCounter] = useState(1);
  const [theme, setTheme] = useState<Theme>("light");
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    const userMessage: ChatMessage = {
      id: counter,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setCounter((prev) => prev + 1);
    setInput("");
    setIsThinking(true);

    const replyText =
      "Đây là câu trả lời demo. Bạn có thể nối API thật sau này, nhưng hiện tại UI chỉ đang fake dữ liệu để mô phỏng chatbot.";

    const reply: ChatMessage = {
      id: counter + 1,
      role: "assistant",
      content: replyText,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, reply]);
      setCounter((prev) => prev + 1);
      setIsThinking(false);
    }, 700);
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`flex min-h-screen transition-colors ${
        isDark
          ? "bg-[#050509] text-gray-100"
          : "bg-linear-to-b from-[#f7f7f8] to-[#e5e7eb] text-gray-900"
      }`}
    >
      {/* Sidebar trái giống ChatGPT 4.x */}
      <aside
        className={`flex min-h-screen flex-col border-r backdrop-blur-sm shadow-sm transition-all duration-200 ${
          isSidebarCollapsed ? "w-[80px]" : "w-[270px]"
        } ${
          isDark
            ? "border-gray-800 bg-[#202123] text-gray-100"
            : "border-gray-200 bg-white/95 text-gray-900"
        }`}
      >
        {/* Top: logo ChatGPT + collapse icon */}
        {isSidebarCollapsed ? (
          /* Thu gọn: chỉ còn logo, hover hiện icon collapse/expand giống ChatGPT */
          <div className="flex items-center justify-center px-3 py-3">
            <button
              type="button"
              aria-label="Expand sidebar"
              className="group relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100/10"
              onClick={() => setIsSidebarCollapsed(false)}
            >
              <Image
                src="/assets/image.png"
                alt="ChatGPT logo"
                width={28}
                height={28}
                className={`h-7 w-7 ${isDark ? "invert" : ""}`}
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-xl ${
                    isDark ? "bg-white/10" : "bg-gray-100"
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-xl border ${
                      isDark ? "border-white/70" : "border-gray-500"
                    }`}
                  >
                    <span className="flex h-3.5 w-3 items-center justify-between">
                      <span
                        className={`h-full w-[6px] rounded-sm ${
                          isDark ? "bg-white" : "bg-gray-600"
                        }`}
                      />
                      <span
                        className={`h-full w-[2px] rounded-sm ${
                          isDark ? "bg-white/70" : "bg-gray-400"
                        }`}
                      />
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </div>
        ) : (
          /* Mở rộng: logo + nút collapse tách riêng như hiện tại */
          <div className="flex items-center justify-between px-3 py-3">
            <div className="flex items-center">
              <Image
                src="/assets/image.png"
                alt="ChatGPT logo"
                width={28}
                height={28}
                className={`h-7 w-7 ${isDark ? "invert" : ""}`}
              />
            </div>
            <button
              type="button"
              aria-label="Collapse sidebar"
              className={`inline-flex h-7 w-7 items-center justify-center rounded-md border text-gray-500 ${
                isDark ? "border-gray-600 hover:bg-[#2a2b32]" : "border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setIsSidebarCollapsed(true)}
            >
              <span className="relative inline-flex h-4 w-4 items-center justify-center">
                <span
                  className={`absolute left-[3px] h-3 w-[2px] rounded-sm ${
                    isDark ? "bg-gray-400" : "bg-gray-500"
                  }`}
                />
                <span
                  className={`absolute right-[3px] h-3 w-[6px] rounded-sm ${
                    isDark ? "bg-gray-400" : "bg-gray-500"
                  }`}
                />
              </span>
            </button>
          </div>
        )}

        {/* Nút New chat */}
        <div>
          <button
            type="button"
            className={`group flex w-full items-center gap-2 rounded-full px-2 py-1.5 text-sm ${
              isDark
                ? "text-gray-100 hover:bg-[#2a2b32]"
                : "text-gray-800 hover:bg-gray-100"
            } ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <Plus className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>New chat</span>}
          </button>
        </div>

        {/* Navigation items: Search, Images, Apps, Projects */}
        <nav
          className={`px-1 pb-3 text-sm ${
            isDark ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <button
            className={`group flex w-full items-center gap-2 rounded-full px-2 py-2 ${
              isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
            } ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <Search className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>Search chats</span>}
          </button>
          <button
            className={`group flex w-full items-center gap-2 rounded-full px-2 py-2 ${
              isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
            } ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <ImageIcon className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>Images</span>}
          </button>
          <button
            className={`group flex w-full items-center gap-2 rounded-full px-2 py-2 ${
              isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
            } ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <AppWindow className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>Apps</span>}
          </button>
          <button
            className={`group flex w-full items-center gap-2 rounded-full px-2 py-2 ${
              isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
            } ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <FolderKanban className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>Projects</span>}
          </button>
        </nav>

        {/* Your chats section (giữ flex-1 để account luôn ở đáy) */}
        <div
          className={`mt-1 flex-1 overflow-y-auto border-t pt-3 text-sm ${
            isDark ? "border-gray-800" : "border-gray-100"
          }`}
        >
          {!isSidebarCollapsed && (
            <>
              <div
                className={`px-3 text-xs font-semibold uppercase tracking-wide ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Your chats
              </div>
              <div className="mt-2 space-y-1 px-1">
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left ${
                    isDark
                      ? "text-gray-100 hover:bg-[#2a2b32]"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <MessageSquare
                    className={`h-4 w-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <span className="truncate">Giới thiệu về Nuxt</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left ${
                    isDark
                      ? "text-gray-100 hover:bg-[#2a2b32]"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <MessageSquare
                    className={`h-4 w-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <span className="truncate">Giải thích mã Node.js</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left ${
                    isDark
                      ? "text-gray-100 hover:bg-[#2a2b32]"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <MessageSquare
                    className={`h-4 w-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <span className="truncate">RAG là gì</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer user info / account avatar */}
        <div
          className={`relative border-t px-3 py-3 text-sm ${
            isDark ? "border-gray-800" : "border-gray-100"
          }`}
        >
          {isAccountMenuOpen && (
            <div className="absolute bottom-14 left-0 right-0 z-20 px-1">
              <div
                className={`overflow-hidden rounded-2xl border shadow-xl ${
                  isDark
                    ? "border-gray-700 bg-[#202123] text-gray-100"
                    : "border-gray-200 bg-white text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3 px-3 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                    MK
                  </div>
                  {!isSidebarCollapsed && (
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Minh Kim</span>
                      <span className="text-xs text-gray-400">Free</span>
                    </div>
                  )}
                </div>

                <div
                  className={`border-t ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  }`}
                />

                <div
                  className={`py-1 text-sm ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <button
                    className={`flex w-full items-center gap-2 px-4 py-2 ${
                      isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-50"
                    }`}
                    type="button"
                    onClick={() => {
                      setIsSettingsOpen(true);
                      setIsAccountMenuOpen(false);
                    }}
                  >
                    <Settings className="h-4 w-4 text-gray-500" />
                    <span>Settings</span>
                  </button>
                  <button
                    className={`flex w-full items-center gap-2 px-4 py-2 ${
                      isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-50"
                    }`}
                  >
                    <HelpCircle className="h-4 w-4 text-gray-500" />
                    <span>Help</span>
                  </button>
                  <button
                    className={`flex w-full items-center gap-2 px-4 py-2 ${
                      isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-50"
                    }`}
                  >
                    <LogOut className="h-4 w-4 text-gray-500" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {isSidebarCollapsed ? (
            /* Chế độ thu gọn: chỉ còn avatar tròn */
            <div className="flex justify-center">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white hover:brightness-110"
                onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                aria-label="Account menu"
              >
                MK
              </button>
            </div>
          ) : (
            /* Chế độ mở rộng: pill Minh Kim – Free – Upgrade */
            <button
              type="button"
              className={`flex w-full items-center justify-between rounded-xl px-2 py-1 ${
                isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
              }`}
              onClick={() => setIsAccountMenuOpen((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                  MK
                </div>
                <div className="flex flex-col items-start">
                  <span
                    className={`text-xs font-medium ${
                      isDark ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    Minh Kim
                  </span>
                  <span className="text-[11px] text-gray-500">Free</span>
                </div>
              </div>
              <span className="text-[11px] text-gray-500">Upgrade</span>
            </button>
          )}
        </div>
      </aside>

      {/* Khu vực chat chính giống màn hình new chat / conversation */}
      <main className="flex min-h-screen flex-1 flex-col">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto w-full max-w-2xl space-y-4">
            {messages.length === 0 && (
              <div className="pt-20 text-center">
                <h1
                  className={`mb-3 text-3xl font-semibold tracking-tight ${
                    isDark ? "text-gray-50" : "text-gray-900"
                  }`}
                >
                  Where should we begin?
                </h1>
                <p className="text-sm text-gray-500">
                  Hãy nhập câu hỏi đầu tiên để bắt đầu cuộc trò chuyện demo.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-black text-white"
                      : isDark
                        ? "bg-[#202123] text-gray-50 shadow-sm"
                        : "bg-white text-gray-900 shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    isDark
                      ? "bg-[#202123] text-gray-400"
                      : "bg-white text-gray-500"
                  }`}
                >
                  Đang soạn câu trả lời...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input bar phía dưới */}
        <form
          onSubmit={handleSubmit}
          className={`border-t px-4 py-4 ${
            isDark ? "border-gray-800 bg-[#050509]" : "border-gray-200 bg-[#f7f7f8]"
          }`}
        >
          <div className="mx-auto w-full max-w-2xl">
            <div
              className={`rounded-full border px-4 py-2.5 shadow-sm hover:border-gray-300 ${
                isDark
                  ? "border-gray-700 bg-[#202123]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-gray-500 hover:bg-gray-50 ${
                    isDark ? "border-gray-600" : "border-gray-200"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything"
                  className={`flex-1 border-none bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-white disabled:cursor-not-allowed disabled:bg-gray-500 ${
                    isDark ? "bg-gray-200 text-black hover:bg-gray-100" : "bg-black hover:bg-neutral-800"
                  }`}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-gray-400">
              Chat demo – phản hồi chỉ là fakedata, chưa nối API thật.
            </p>
          </div>
        </form>
      </main>

      {/* Settings modal với blur background */}
      {isSettingsOpen && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className={`flex h-[520px] w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl ${
              isDark
                ? "border border-gray-700 bg-[#202123] text-gray-100"
                : "border border-gray-100 bg-white text-gray-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left nav */}
            <div
              className={`flex w-60 flex-col border-r ${
                isDark ? "border-gray-700 bg-[#17171b]" : "border-gray-100 bg-gray-50/80"
              }`}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <span
                  className={`text-sm font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Settings
                </span>
                <button
                  type="button"
                  className={`text-sm ${
                    isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-600"
                  }`}
                  onClick={() => setIsSettingsOpen(false)}
                >
                  ✕
                </button>
              </div>
              <nav
                className={`mt-1 flex-1 space-y-1 px-2 text-sm ${
                  isDark ? "text-gray-100" : "text-gray-700"
                }`}
              >
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 font-medium shadow-sm ${
                    isDark ? "bg-[#2a2b32] text-gray-100" : "bg-white text-gray-900"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>General</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 ${
                    isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 ${
                    isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Personalization</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 ${
                    isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
                  }`}
                >
                  <AppWindow className="h-4 w-4" />
                  <span>Apps</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 ${
                    isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
                  }`}
                >
                  <Database className="h-4 w-4" />
                  <span>Data controls</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 ${
                    isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 ${
                    isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Parental controls</span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 ${
                    isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </button>
              </nav>
            </div>

            {/* Right content */}
            <div
              className={`flex flex-1 flex-col ${
                isDark ? "bg-[#202123]" : "bg-white"
              }`}
            >
              <div
                className={`flex-1 overflow-y-auto px-10 py-6 text-sm ${
                  isDark ? "text-gray-100" : "text-gray-800"
                }`}
              >
                <h2
                  className={`mb-4 text-base font-semibold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  General
                </h2>

                <div
                  className={`border-t ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  }`}
                >
                  {/* Appearance */}
                  <div
                    className={`flex items-center justify-between border-b py-3 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <span className="text-sm">Appearance</span>
                    <div className="relative">
                      <button
                        type="button"
                        className={`flex items-center gap-1.5 text-sm ${
                          isDark ? "text-gray-100" : "text-gray-700"
                        }`}
                        onClick={() => setIsAppearanceOpen((prev) => !prev)}
                      >
                        <span>{theme === "light" ? "Light" : "Dark"}</span>
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </button>
                      {isAppearanceOpen && (
                        <div
                          className={`absolute right-0 top-7 z-40 w-40 rounded-2xl border py-1 shadow-lg ${
                            isDark
                              ? "border-gray-700 bg-[#202123] text-gray-100"
                              : "border-gray-200 bg-white text-gray-900"
                          }`}
                        >
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-gray-50/10"
                            onClick={() => {
                              setTheme("light");
                              setIsAppearanceOpen(false);
                            }}
                          >
                            <span>Light</span>
                            {theme === "light" && (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-gray-50/10"
                            onClick={() => {
                              setTheme("dark");
                              setIsAppearanceOpen(false);
                            }}
                          >
                            <span>Dark</span>
                            {theme === "dark" && (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Accent color */}
                  <div
                    className={`flex items-center justify-between border-b py-3 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <span className="text-sm">Accent color</span>
                    <button
                      type="button"
                      className={`flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-100" : "text-gray-700"
                      }`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                      <span>Default</span>
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </button>
                  </div>

                  {/* Language */}
                  <div
                    className={`flex items-center justify-between border-b py-3 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <span className="text-sm">Language</span>
                    <button
                      type="button"
                      className={`flex items-center gap-1.5 text-sm ${
                        isDark ? "text-gray-100" : "text-gray-700"
                      }`}
                    >
                      <span>Auto-detect</span>
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </button>
                  </div>

                  {/* Spoken language */}
                  <div
                    className={`border-b py-3 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">Spoken language</span>
                      <button
                        type="button"
                        className={`flex items-center gap-1.5 text-sm ${
                          isDark ? "text-gray-100" : "text-gray-700"
                        }`}
                      >
                        <span>Auto-detect</span>
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      For best results, select the language you mainly speak. If
                      it&apos;s not listed, it may still be supported via
                      auto-detection.
                    </p>
                  </div>

                  {/* Voice */}
                  <div
                    className={`flex items-center justify-between border-b py-3 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <div className="text-sm">Voice</div>
                    <div
                      className={`flex items-center gap-4 text-sm ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <button
                        type="button"
                        className={`inline-flex items-center gap-1 text-xs ${
                          isDark
                            ? "text-gray-200 hover:text-gray-50"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        <Play className="h-3 w-3" />
                        <span>Play</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1 text-sm"
                      >
                        <span>Juniper</span>
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Separate voice mode */}
                  <div className="py-4">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">Separate voice mode</span>
                      <button
                        type="button"
                        className="flex h-5 w-9 items-center rounded-full bg-gray-200 px-1"
                      >
                        <span className="h-3.5 w-3.5 rounded-full bg-white shadow" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Keep ChatGPT Voice in a separate full screen, without real
                      time transcripts and visuals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

