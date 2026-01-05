"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  MoreHorizontal,
  Trash2,
} from "lucide-react";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: ChatMessage[];
};

type Theme = "light" | "dark";
type LanguageOption = "auto" | "en" | "vi" | "ja";

export default function ChatPage() {
  const { t, i18n } = useTranslation();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [counter, setCounter] = useState(1);
  const [theme, setTheme] = useState<Theme>("light");
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageOption>("auto");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [openSessionMenuId, setOpenSessionMenuId] = useState<string | null>(
    null,
  );
  const [confirmDeleteSession, setConfirmDeleteSession] =
    useState<ChatSession | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isThinking) return;

    // Tìm session hiện tại (nếu đã có)
    const existingSession =
      activeSessionId != null
        ? sessions.find((session) => session.id === activeSessionId) ?? null
        : null;

    let sessionId = activeSessionId;
    if (!sessionId || !existingSession) {
      sessionId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? (crypto as any).randomUUID()
          : `${Date.now()}`;
    }

    const currentSessionId = sessionId;

    const userMessage: ChatMessage = {
      id: counter,
      role: "user",
      content: trimmed,
    };

    // Session được xem là "mới" nếu chưa tồn tại,
    // hoặc tồn tại nhưng chưa có tin nhắn nào (tạo từ nút New chat)
    const isBrandNewSession =
      !existingSession || existingSession.messages.length === 0;

    // Cập nhật session với tin nhắn user
    setSessions((prev) => {
      const index = prev.findIndex((s) => s.id === currentSessionId);

      if (index === -1) {
        const newSession: ChatSession = {
          id: currentSessionId!,
          title: t("sidebar.newChat"),
          messages: [userMessage],
        };
        return [newSession, ...prev];
      }

      const session = prev[index];
      const updated: ChatSession = {
        ...session,
        messages: [...session.messages, userMessage],
      };

      const next = [...prev];
      next[index] = updated;
      return next;
    });

    setActiveSessionId(currentSessionId);
    setCounter((prev) => prev + 1);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage: string =
          typeof data?.error === "string" && data.error.trim().length > 0
            ? data.error
            : `Có lỗi khi gọi LLM (mã ${res.status}).`;

        const errorReply: ChatMessage = {
          id: counter + 1,
          role: "assistant",
          content: errorMessage,
        };

        setSessions((prev) => {
          const index = prev.findIndex((s) => s.id === currentSessionId);
          if (index === -1) return prev;

          const session = prev[index];
          const updated: ChatSession = {
            ...session,
            messages: [...session.messages, errorReply],
          };

          const next = [...prev];
          next[index] = updated;
          return next;
        });

        setCounter((prev) => prev + 1);
        return;
      }

      const replyText: string =
        typeof data.reply === "string" && data.reply.trim().length > 0
          ? data.reply
          : "LLM không trả về nội dung hợp lệ.";

      const reply: ChatMessage = {
        id: counter + 1,
        role: "assistant",
        content: replyText,
      };

      setSessions((prev) => {
        const index = prev.findIndex((s) => s.id === currentSessionId);
        if (index === -1) return prev;

        const session = prev[index];
        const updated: ChatSession = {
          ...session,
          messages: [...session.messages, reply],
        };

        const next = [...prev];
        next[index] = updated;
        return next;
      });

      if (isBrandNewSession && currentSessionId) {
        void generateChatTitle(currentSessionId, trimmed, replyText);
      }

      setCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorReply: ChatMessage = {
        id: counter + 1,
        role: "assistant",
        content:
          "Có lỗi khi gọi LLM. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.",
      };

      setSessions((prev) => {
        const index = prev.findIndex((s) => s.id === currentSessionId);
        if (index === -1) return prev;

        const session = prev[index];
        const updated: ChatSession = {
          ...session,
          messages: [...session.messages, errorReply],
        };

        const next = [...prev];
        next[index] = updated;
        return next;
      });

      setCounter((prev) => prev + 1);
    } finally {
      setIsThinking(false);
    }
  };

  const isDark = theme === "dark";
  const activeSession =
    (activeSessionId &&
      sessions.find((session) => session.id === activeSessionId)) ||
    null;
  const messages = activeSession?.messages ?? [];

  // Common CSS for sidebar main buttons (New chat, Search, Images, Apps, Projects)
  const sidebarMainButtonClass = `group flex w-full items-center gap-2 rounded-full px-4 py-2 text-sm ${
    isDark ? "hover:bg-[#2a2b32]" : "hover:bg-gray-100"
  } ${isSidebarCollapsed ? "justify-center" : ""}`;

  // Khởi tạo theme từ localStorage (giữ lại dark mode sau khi reload)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = window.localStorage.getItem("chat:theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme as Theme);
    }
  }, []);

  // Lưu theme mỗi khi thay đổi
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("chat:theme", theme);
  }, [theme]);

  // Đọc language + trạng thái mở Settings sau khi reload
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedLang = window.localStorage.getItem("chat:language");
    if (storedLang && ["en", "vi", "ja"].includes(storedLang)) {
      i18n.changeLanguage(storedLang);
      const mapped: Record<string, LanguageOption> = {
        en: "en",
        vi: "vi",
        ja: "ja",
      };
      setLanguage(mapped[storedLang]);
    }
  }, [i18n]);

  const handleLanguageChange = (opt: LanguageOption, lng: string) => {
    setLanguage(opt);
    i18n.changeLanguage(lng);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("chat:language", lng);
    }
    setIsLanguageOpen(false);
  };

  // Tự động scroll tới tin nhắn mới nhất
  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages.length, isThinking, activeSessionId]);

  // Load chat sessions từ localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem("chat:sessions");
      if (!raw) return;
      const parsed = JSON.parse(raw) as ChatSession[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setSessions(parsed);
        setActiveSessionId(parsed[0].id);
      }
    } catch (error) {
      console.error("Failed to load chat sessions from localStorage", error);
    }
  }, []);

  // Lưu chat sessions vào localStorage mỗi khi thay đổi
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("chat:sessions", JSON.stringify(sessions));
    } catch (error) {
      console.error("Failed to save chat sessions to localStorage", error);
    }
  }, [sessions]);

  const generateChatTitle = async (
    sessionId: string,
    userText: string,
    assistantText: string,
  ) => {
    try {
      const res = await fetch("/api/chat/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userText, assistant: assistantText }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to generate title:", data);
        return;
      }

      const title =
        typeof data?.title === "string" && data.title.trim().length > 0
          ? data.title.trim()
          : null;

      if (!title) return;

      setSessions((prev) => {
        const index = prev.findIndex((s) => s.id === sessionId);
        if (index === -1) return prev;

        const session = prev[index];
        const updated: ChatSession = {
          ...session,
          title,
        };

        const next = [...prev];
        next[index] = updated;
        return next;
      });
    } catch (error) {
      console.error("Error calling /api/chat/title:", error);
    }
  };

  const handleNewChat = () => {
    const newId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? (crypto as any).randomUUID()
        : `${Date.now()}`;

    const newSession: ChatSession = {
      id: newId,
      title: t("sidebar.newChat"),
      messages: [],
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setInput("");
    setIsThinking(false);
  };

  return (
    <div
      className={`flex h-screen transition-colors ${
        isDark
          ? "bg-[#050509] text-gray-100"
          : "bg-linear-to-b from-[#f7f7f8] to-[#e5e7eb] text-gray-900"
      }`}
      onClick={() => setOpenSessionMenuId(null)}
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

        {/* Nút New chat + navigation items */}
        <nav
          className={`text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}
        >
          <div>
            <button
              type="button"
              className={sidebarMainButtonClass}
              onClick={handleNewChat}
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
              {!isSidebarCollapsed && <span>{t("sidebar.newChat")}</span>}
            </button>
          </div>

          <button className={sidebarMainButtonClass}>
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <Search className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>{t("sidebar.searchChats")}</span>}
          </button>
          <button className={sidebarMainButtonClass}>
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <ImageIcon className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>{t("sidebar.images")}</span>}
          </button>
          <button className={sidebarMainButtonClass}>
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <AppWindow className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>{t("sidebar.apps")}</span>}
          </button>
          <button className={sidebarMainButtonClass}>
            <span
              className={`flex items-center justify-center ${
                isSidebarCollapsed
                  ? "h-7 w-7 rounded-xl bg-transparent group-hover:bg-gray-100"
                  : ""
              }`}
            >
              <FolderKanban className="h-4 w-4" />
            </span>
            {!isSidebarCollapsed && <span>{t("sidebar.projects")}</span>}
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
                {t("sidebar.yourChats")}
              </div>
              <div
                className="mt-2 space-y-1 px-1"
                onClick={() => setOpenSessionMenuId(null)}
              >
                {sessions.length === 0 ? (
                  <p
                    className={`px-3 py-2 text-xs ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Chưa có cuộc trò chuyện nào.
                  </p>
                ) : (
                  sessions.map((session) => {
                    const isActive = session.id === activeSessionId;
                    const baseClass = isDark
                      ? "text-gray-100 hover:bg-[#2a2b32]"
                      : "text-gray-800 hover:bg-gray-100";
                    const activeClass = isDark
                      ? "bg-[#2a2b32] text-gray-100"
                      : "bg-gray-100 text-gray-900";

                    return (
                      <div
                        key={session.id}
                        className="group relative flex items-center"
                      >
                        <button
                          type="button"
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left pr-8 ${
                            isActive ? activeClass : baseClass
                          }`}
                          onClick={() => {
                            setActiveSessionId(session.id);
                            setOpenSessionMenuId(null);
                          }}
                        >
                          <MessageSquare
                            className={`h-4 w-4 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <span className="truncate">
                            {session.title || "Cuộc trò chuyện mới"}
                          </span>
                        </button>

                        <button
                          type="button"
                          className={`absolute right-1 flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:text-gray-600 ${
                            isDark
                              ? "hover:bg-[#2a2b32]"
                              : "hover:bg-gray-100"
                          } opacity-0 group-hover:opacity-100`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSessionMenuId((prev) =>
                              prev === session.id ? null : session.id,
                            );
                          }}
                          aria-label="Chat actions"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                        {openSessionMenuId === session.id && (
                          <div
                            className={`absolute right-0 top-9 z-20 w-40 rounded-xl border py-1 text-xs shadow-lg ${
                              isDark
                                ? "border-gray-700 bg-[#202123] text-gray-100"
                                : "border-gray-200 bg-white text-gray-800"
                            }`}
                          >
                            <button
                              type="button"
                              className={`flex w-full items-center gap-2 px-3 py-2 text-left ${
                                isDark
                                  ? "hover:bg-[#2a2b32] text-red-400"
                                  : "hover:bg-gray-100 text-red-600"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmDeleteSession(session);
                                setOpenSessionMenuId(null);
                              }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Xóa</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
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
      <main className="flex flex-1 flex-col">
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
                  {t("main.title")}
                </h1>
                <p className="text-sm text-gray-500">{t("main.subtitle")}</p>
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
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => (
                          <p className="mb-2 last:mb-0" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="mb-2 list-disc pl-5 last:mb-0"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="mb-2 list-decimal pl-5 last:mb-0"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => <li {...props} />,
                        code: ({ node, inline, ...props }: any) =>
                          inline ? (
                            <code
                              className="rounded bg-black/10 px-1 py-0.5 text-xs"
                              {...props}
                            />
                          ) : (
                            <code
                              className="block whitespace-pre-wrap rounded-md bg-black/80 px-3 py-2 text-xs text-white"
                              {...props}
                            />
                          ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
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

            <div ref={messagesEndRef} />
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
                  placeholder={t("main.placeholder")}
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
              {t("main.footerNote")}
            </p>
          </div>
        </form>
      </main>

      {/* Modal xác nhận xóa đoạn chat */}
      {confirmDeleteSession && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setConfirmDeleteSession(null)}
        >
          <div
            className={`w-full max-w-md rounded-2xl border shadow-xl ${
              isDark
                ? "border-gray-700 bg-[#202123] text-gray-100"
                : "border-gray-200 bg-white text-gray-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 pt-4 pb-3">
              <h2
                className={`text-base font-semibold ${
                  isDark ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Xóa đoạn chat?
              </h2>
              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Hành động này sẽ xóa{" "}
                <span className="font-semibold">
                  {confirmDeleteSession.title || "New chat"}
                </span>
                .
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Bạn sẽ không thể hoàn tác sau khi xóa.
              </p>
            </div>
            <div
              className={`flex justify-end gap-2 border-t px-4 py-3 ${
                isDark ? "border-gray-700" : "border-gray-100"
              }`}
            >
              <button
                type="button"
                className={`rounded-full px-4 py-1.5 text-sm ${
                  isDark
                    ? "bg-[#2a2b32] text-gray-100 hover:bg-[#343541]"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setConfirmDeleteSession(null)}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                onClick={() => {
                  const idToDelete = confirmDeleteSession.id;
                  setSessions((prev) => {
                    const filtered = prev.filter((s) => s.id !== idToDelete);
                    if (activeSessionId === idToDelete) {
                      setActiveSessionId(filtered[0]?.id ?? null);
                    }
                    return filtered;
                  });
                  setConfirmDeleteSession(null);
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

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
                    <span className="text-sm">{t("settings.appearance")}</span>
                    <div className="relative">
                      <button
                        type="button"
                        className={`flex items-center gap-1.5 text-sm ${
                          isDark ? "text-gray-100" : "text-gray-700"
                        }`}
                        onClick={() => {
                          setIsAppearanceOpen((prev) => !prev);
                          setIsLanguageOpen(false);
                        }}
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
                    <span className="text-sm">{t("settings.accentColor")}</span>
                    <button
                      type="button"
                      className={`flex items-center gap-2 text-sm ${
                        isDark ? "text-gray-100" : "text-gray-700"
                      }`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-400" />
                      <span>{t("settings.defaultAccent")}</span>
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
                    <div className="relative">
                      <button
                        type="button"
                        className={`flex items-center gap-1.5 text-sm ${
                          isDark ? "text-gray-100" : "text-gray-700"
                        }`}
                        onClick={() => {
                          setIsLanguageOpen((prev) => !prev);
                          setIsAppearanceOpen(false);
                        }}
                      >
                        <span>
                          {language === "auto"
                            ? t("settings.autoDetect")
                            : language === "en"
                              ? "English"
                              : language === "vi"
                                ? "Tiếng Việt"
                                : "日本語"}
                        </span>
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </button>
                      {isLanguageOpen && (
                        <div
                          className={`absolute right-0 top-7 z-40 w-44 rounded-2xl border py-1 shadow-lg ${
                            isDark
                              ? "border-gray-700 bg-[#202123] text-gray-100"
                              : "border-gray-200 bg-white text-gray-900"
                          }`}
                        >
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-gray-50/10"
                            onClick={() => {
                              handleLanguageChange("auto", "en");
                            }}
                          >
                            <span>{t("settings.autoDetect")}</span>
                            {language === "auto" && (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-gray-50/10"
                            onClick={() => {
                              handleLanguageChange("en", "en");
                            }}
                          >
                            <span>English</span>
                            {language === "en" && (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-gray-50/10"
                            onClick={() => {
                              handleLanguageChange("vi", "vi");
                            }}
                          >
                            <span>Tiếng Việt</span>
                            {language === "vi" && (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-3 py-1.5 text-left text-sm hover:bg-gray-50/10"
                            onClick={() => {
                              handleLanguageChange("ja", "ja");
                            }}
                          >
                            <span>日本語</span>
                            {language === "ja" && (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Spoken language */}
                  <div
                    className={`border-b py-3 ${
                      isDark ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm">
                        {t("settings.spokenLanguage")}
                      </span>
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
                      {t("settings.spokenLanguageHelp")}
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

