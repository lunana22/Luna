import { Language } from "./common";

// =========================================================
//  단어장
// =========================================================
export interface DeckMetadata {
  defaultSourceLang: Language; // 질문 언어 (예: EN)
  defaultTargetLang: Language; // 정답 언어 (예: KO)
  tags: string[];
}

// =========================================================
//  폴더
// =========================================================
export interface FolderMetadata {
  sortOrder: "NAME" | "DATE" | "CUSTOM";
  color?: string;
}
