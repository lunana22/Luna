import { BaseEntity, ID } from "../../utility";

/**
 * 👣 상세 학습 로그 (Action)
 * - 퀴즈 정답/오답, 상태 변경 등 "개별 아이템"에 대한 상호작용
 * - AI 분석(골든타임, 취약점)의 핵심 데이터
 */
export interface StudyLog extends BaseEntity {
  userId: ID;
  nodeId: ID;
  studyItemId: ID;

  /**
   * 행동의 결과
   * - CORRECT / WRONG (퀴즈 결과)
   * - MEMORIZED / CONFUSED (목록에서 상태 변경)
   */
  result: "CORRECT" | "WRONG" | "MEMORIZED" | "CONFUSED";

  /**
   * ⏱️ (선택사항) 퀴즈 반응 속도
   * - 퀴즈 모드일 때만 기록 (목록 보기일 땐 null or 0)
   * - "쉬운 단어" vs "어려운 단어" 구분용
   */
  reactionTimeMs?: number;

  /**
   * 🕒 행동 발생 시각 (Created At) < BaseEntity에 있음
   * - 이걸로 "시간대 분석"을 합니다.
   */
}

/**
 * 📅 일간 학습 통계 (하루가 끝날 때 or 실시간 갱신)
 * - "오늘 총 얼마나 공부했나" 보여주기용
 */
export interface DailyStudyStat extends BaseEntity {
  userId: ID;

  /**
   * 일자
   */
  date: string; // "2024-05-20"

  /**
   * 오늘 푼 퀴즈 수
   */
  quizCount: number;

  /**
   * 오늘 맞힌 개수
   */
  correctCount: number;

  /**
   * 오늘 상태를 '암기완료'로 바꾼 단어 수 (성취감!)
   */
  memorizedCount: number;

  /**
   * ⏳ 총 학습 시간 (초)
   * - 단어별 시간이 아니라, "앱에 머무른 세션 시간"의 합
   */
  totalStudyTimeSeconds: number;
}
