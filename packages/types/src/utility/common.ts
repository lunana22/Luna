export type Selected = {
  /**
   * 선택된 값의 레이블
   */
  label: string;
  /**
   * 선택된 값
   */
  value: string;
};

export type InputFeedbackType = "error" | "success" | "info";

export type InputFeedback = {
  /**
   * 상태톤
   */
  type: InputFeedbackType;
  /**
   * 메시지(문자/리치 모두)
   */
  message?: React.ReactNode;
  /**
   * aria-describedby 연결용(선택)
   */
  id?: string;
  /**
   * 상태 아이콘(선택)
   */
  icon?: React.ReactNode;
};

export type ID = string; // UUID 사용 권장

export type DateString = string; // ISO 8601

export interface BaseEntity {
  id: ID;
  createdAt: DateString;
  updatedAt: DateString;
}

// 🌍 지원 언어 (확장 가능)
export enum Language {
  KO = "KO", // 한국어
  EN = "EN", // 영어
  JA = "JA", // 일본어
  ZH = "ZH", // 중국어
  // 필요한 언어 계속 추가
}
