import { BaseEntity, ID } from "../../utility";

/**
 * 🕰️ 학습 세션 로그 (Session)
 * - "어떤 단어장에 들어와서 얼마나 머물렀는지" 기록
 * - AI 분석용 (집중도 분석, 이탈률 분석 등)
 */
export interface StudySessionLog extends BaseEntity {
  userId: ID;
  nodeId: ID;

  /**
   * 활동 타입
   * - VIEW: 그냥 보기
   * - QUIZ: 퀴즈 풀기
   * - FOLDING: 폴더 정리/탐색
   */
  activityType: "VIEW" | "QUIZ" | "FOLDING";

  /**
   * 시작 시각
   */
  startedAt: Date;

  /**
   * 종료 시각 (세션 종료 시 업데이트)
   */
  endedAt?: Date;

  /**
   * 머무른 시간 (초 단위)
   */
  durationSeconds: number;
}
