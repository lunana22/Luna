// utils/dictionaryConstants.ts
import { MemorizationStatus, PartOfSpeech } from "@luna/types";

// ⚡ Enum 값을 키(Key)로 사용하여 라벨과 색상을 매핑
export const POS_CONFIG: Record<
  PartOfSpeech,
  { label: string; color: string; bg: string }
> = {
  [PartOfSpeech.NOUN]: {
    label: "명사",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  [PartOfSpeech.VERB]: {
    label: "동사",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  [PartOfSpeech.ADJECTIVE]: {
    label: "형용사",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  [PartOfSpeech.ADVERB]: {
    label: "부사",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  [PartOfSpeech.CONJUNCTION]: {
    label: "접속사",
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  [PartOfSpeech.PREPOSITION]: {
    label: "전치사",
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  [PartOfSpeech.PRONOUN]: {
    label: "대명사",
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  [PartOfSpeech.INTERJECTION]: {
    label: "감탄사",
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  [PartOfSpeech.PHRASE]: {
    label: "숙어",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
};

// 🎨 상태별 UI 설정 (라벨, 색상, 아이콘 등)
export const MEMORIZATION_CONFIG: Record<
  MemorizationStatus,
  {
    label: string;
    variant: "blue" | "orange" | "default" | "green";
    icon?: string;
  }
> = {
  [MemorizationStatus.MEMORIZED]: {
    label: "외움",
    variant: "blue",
    icon: "",
  },
  [MemorizationStatus.CONFUSED]: {
    label: "헷갈림",
    variant: "orange",
    icon: "",
  },
  [MemorizationStatus.UNKNOWN]: {
    label: "학습전",
    variant: "default",
    icon: "",
  },
};
