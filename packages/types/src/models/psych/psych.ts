// packages/types/src/psych.ts
import { BaseEntity, ID } from "../../utility/common";

// 🔑 테스트 타입 (MBTI형 vs 점수 합산형)
export enum TestType {
  /**
   * MBTI형
   */
  MBTI = "MBTI",
  /**
   * 점수 합산형 (예: 80점 이상 A타입)
   */
  SCORE = "SCORE",
}

// 🧪 테스트 메타 정보 (목록에 보여질 것)
export interface PsychTest extends BaseEntity {
  /**
   * 제목
   */
  title: string;
  /**
   * 부제목
   */
  subTitle?: string;
  /**
   * 썸네일 URL
   */
  thumbnailUrl: string;
  /**
   * 조회수
   */
  viewCount: number;
  /**
   * 테스트 타입
   */
  testType: TestType;
  /**
   * 총 문항 수
   */
  questionCount: number;
}

// ❓ 질문지
export interface Question extends BaseEntity {
  /**
   * 테스트 ID
   */
  testId: ID;
  /**
   * 순서
   */
  order: number;
  /**
   * 내용
   */
  content: string;
  /**
   * 이미지 URL
   */
  imageUrl?: string;
  /**
   * 선택지들
   */
  options: AnswerOption[];
}

// 🅰️ 선택지
export interface AnswerOption {
  /**
   * ID
   */
  id: ID;
  /**
   * 내용
   */
  text: string;
  /**
   * 점수
   */
  score?: number;
  /**
   * 유형 인디케이터 // MBTI형일 때 ('I' 유형 +1)
   */
  typeIndicator?: string;
}

// 📊 결과 데이터 (미리 만들어두는 결과 화면)
export interface TestResultType extends BaseEntity {
  /**
   * 테스트 ID
   */
  testId: ID;
  /**
   * 결과 이름
   */
  resultName: string;
  /**
   * 결과 설명
   */
  description: string;
  /**
   * 최소 점수 (점수형)
   */
  minScore?: number;
  /**
   * 최대 점수 (점수형)
   */
  maxScore?: number;
  /**
   * MBTI 코드 (MBTI형)
   */
  mbtiCode?: string;
  /**
   * 매칭 이미지 URL
   */
  matchingImageUrl: string;
}

// 👤 유저의 플레이 기록 (통계용)
export interface UserTestHistory extends BaseEntity {
  /**
   * 소유자 ID
   */
  userId: ID | null; // 비회원일 수도 있으므로 optional
  /**
   * 테스트 ID
   */
  testId: ID;
  /**
   * 결과 ID
   */
  resultTypeId: ID; // 어떤 결과가 나왔는지
  /**
   * 선택지 ID들
   */
  selectedOptions: ID[]; // 유저가 고른 선택지 ID들 (분석용)
}
