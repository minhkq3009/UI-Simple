"use client";

import {
  Plus,
  MessageSquare,
  Search,
  ImageIcon,
  AppWindow,
  FolderKanban,
  Send,
} from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex min-h-screen bg-linear-to-b from-[#f7f7f8] to-[#e5e7eb] text-gray-900">
      {/* Sidebar trái giống ChatGPT 4.x */}
      <aside className="flex min-h-screen w-[270px] flex-col border-r border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        {/* Top: logo ChatGPT + workspace */}
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
              <span className="text-xs">GPT</span>
            </div>
            <span>ChatGPT</span>
          </div>
        </div>

        {/* Nút New chat */}
        <div className="px-3 pb-2">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-full bg-black px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            <Plus className="h-4 w-4" />
            <span>New chat</span>
          </button>
        </div>

        {/* Navigation items: Search, Images, Apps, Projects */}
        <nav className="px-1 pb-3 text-sm text-gray-700">
          <button className="flex w-full items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100">
            <Search className="h-4 w-4" />
            <span>Search chats</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100">
            <ImageIcon className="h-4 w-4" />
            <span>Images</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100">
            <AppWindow className="h-4 w-4" />
            <span>Apps</span>
          </button>
          <button className="flex w-full items-center gap-2 rounded-full px-3 py-2 hover:bg-gray-100">
            <FolderKanban className="h-4 w-4" />
            <span>Projects</span>
          </button>
        </nav>

        {/* Your chats section */}
        <div className="mt-1 flex-1 overflow-y-auto border-t border-gray-100 pt-3 text-sm">
          <div className="px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Your chats
          </div>
          <div className="mt-2 space-y-1 px-1">
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-800 hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <span className="truncate">Giới thiệu về Nuxt</span>
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-800 hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <span className="truncate">Giải thích mã Node.js</span>
            </button>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-gray-800 hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <span className="truncate">RAG là gì</span>
            </button>
          </div>
        </div>

        {/* Footer user info giống thanh dưới cùng */}
        <div className="border-t border-gray-100 px-3 py-3 text-sm">
          <div className="flex items-center justify-between rounded-xl px-2 py-1 hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                MK
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-800">
                  Minh Kim
                </span>
                <span className="text-[11px] text-gray-500">Free</span>
              </div>
            </div>
            <span className="text-[11px] text-gray-500">Upgrade</span>
          </div>
        </div>
      </aside>

      {/* Khu vực chat chính giống màn hình new chat */}
      <main className="flex min-h-screen flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-2xl text-center">
            <h1 className="mb-6 text-3xl font-semibold tracking-tight text-gray-900">
              Where should we begin?
            </h1>

            {/* Ô input lớn giữa màn hình */}
            <div className="rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm hover:border-gray-300">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  placeholder="Ask anything"
                  className="flex-1 border-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-neutral-800"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Note nhỏ phía dưới giống ChatGPT */}
        <div className="pb-6 text-center text-[11px] text-gray-400">
          Chat UI demo – not connected to any AI backend.
        </div>
      </main>
    </div>
  );
}

