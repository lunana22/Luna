// packages/types/src/wordbook.ts
import { BaseEntity, ID, Language } from "../../utility/common";

/**
 * 🏷️ 아이템 타입 (확장성 핵심)
 */
export enum StudyItemType {
  DICTIONARY_WORD = "WORD", // 기존: 사전 데이터 연동
  SIMPLE_CARD = "CARD", // 신규: 단순 텍스트 (질문/정답 직접 입력)
  CODE_SNIPPET = "CODE", // 신규: 코드 블록
}

/**
 * 🔑 암기 상태 (Status)
 */
export enum MemorizationStatus {
  /**
   * 모름 (기본)
   */
  UNKNOWN = "UNKNOWN",
  /**
   * 헷갈림
   */
  CONFUSED = "CONFUSED",
  /**
   * 외움
   */
  MEMORIZED = "MEMORIZED",
}

/**
 *  학습 아이템 (Study Item)
 * - 유저 단어장과 사전(Dictionary)을 연결하는 매개체
 */
export interface StudyItem extends BaseEntity {
  /**
   * 연결된 파일 ID
   */
  nodeId: ID;
  /**
   * 아이템 타입
   */
  type: StudyItemType;

  /**
   * 나의 암기 상태
   */
  status: MemorizationStatus;

  /**
   * 아이템 내용
   */
  content: WordContent | CardContent;

  /**
   * 📝 개인 메모 (Optional)
   * - 뜻 외에 외우는 팁 등을 자유롭게 적는 공간
   */
  memo?: string;
  /**
   * ⭐ 중요 표시 (별표/형광펜)
   * - status와 별개로 '내가 중요하게 생각하는 단어' 마킹
   */
  isPinned?: boolean;

  /**
   * 📊 퀴즈 통계 - 맞힌 횟수
   * - 성취도 분석용
   */
  correctCount: number;

  /**
   * 📊 퀴즈 통계 - 틀린 횟수
   * - 취약점 분석용 (틀린 횟수가 높으면 AI가 집중 케어)
   */
  wrongCount: number;
  /**
   * 📉 망각 곡선 알고리즘용 (Spaced Repetition)
   * - 다음 복습 권장 시각
   * - AI가 "지금 복습하세요!" 알림 보낼 때 기준이 됨
   */
  nextReviewAt?: Date;

  /**
   * ⏱️ 마지막 학습 시각
   * - "오랫동안 안 본 단어" 정렬용
   */
  lastStudiedAt?: Date;
}

/**
 * 사전 기반 단어
 */
export interface WordContent {
  termId: ID; // 사전 ID
  customMeanings?: Partial<Record<Language, string>>;
}

/**
 * 단순 카드 (질문/정답)
 */
export interface CardContent {
  front: string; // 질문
  back: string; // 정답
  hint?: string;
}
