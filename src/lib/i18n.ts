import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      sidebar: {
        newChat: "New chat",
        searchChats: "Search chats",
        images: "Images",
        apps: "Apps",
        projects: "Projects",
        yourChats: "Your chats",
      },
      main: {
        title: "Where should we begin?",
        subtitle: "Type your first question to start a demo conversation.",
        placeholder: "Ask anything",
        footerNote: "Chat demo – responses are fake data, not a real AI backend.",
      },
      settings: {
        general: "General",
        appearance: "Appearance",
        accentColor: "Accent color",
        language: "Language",
        spokenLanguage: "Spoken language",
        spokenLanguageHelp:
          "For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.",
        voice: "Voice",
        separateVoiceMode: "Separate voice mode",
        autoDetect: "Auto-detect",
        defaultAccent: "Default",
        play: "Play",
      },
    },
  },
  vi: {
    translation: {
      sidebar: {
        newChat: "Cuộc chat mới",
        searchChats: "Tìm kiếm cuộc chat",
        images: "Hình ảnh",
        apps: "Ứng dụng",
        projects: "Dự án",
        yourChats: "Cuộc chat của bạn",
      },
      main: {
        title: "Bắt đầu từ đâu đây?",
        subtitle: "Hãy nhập câu hỏi đầu tiên để bắt đầu cuộc trò chuyện demo.",
        placeholder: "Hỏi bất cứ điều gì",
        footerNote:
          "Chat demo – phản hồi chỉ là dữ liệu giả, chưa kết nối AI thật.",
      },
      settings: {
        general: "Cài đặt chung",
        appearance: "Giao diện",
        accentColor: "Màu nhấn",
        language: "Ngôn ngữ",
        spokenLanguage: "Ngôn ngữ nói",
        spokenLanguageHelp:
          "Để có kết quả tốt nhất, hãy chọn ngôn ngữ bạn thường sử dụng. Nếu không có trong danh sách, hệ thống vẫn có thể tự nhận diện.",
        voice: "Giọng nói",
        separateVoiceMode: "Chế độ giọng nói riêng",
        autoDetect: "Tự động nhận diện",
        defaultAccent: "Mặc định",
        play: "Phát",
      },
    },
  },
  ja: {
    translation: {
      sidebar: {
        newChat: "新しいチャット",
        searchChats: "チャットを検索",
        images: "画像",
        apps: "アプリ",
        projects: "プロジェクト",
        yourChats: "あなたのチャット",
      },
      main: {
        title: "どこから始めましょうか？",
        subtitle: "最初の質問を入力してデモ会話を始めましょう。",
        placeholder: "なんでも聞いてください",
        footerNote:
          "デモ用チャットです。返信はダミーデータであり、本物のAIではありません。",
      },
      settings: {
        general: "一般",
        appearance: "表示",
        accentColor: "アクセントカラー",
        language: "言語",
        spokenLanguage: "話す言語",
        spokenLanguageHelp:
          "最適な結果を得るには、主に使用する言語を選択してください。リストにない場合でも、自動検出でサポートされる可能性があります。",
        voice: "ボイス",
        separateVoiceMode: "音声モードを分離",
        autoDetect: "自動検出",
        defaultAccent: "デフォルト",
        play: "再生",
      },
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;


