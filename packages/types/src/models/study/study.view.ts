import { ID } from "../../utility";
import { MemorizationStatus, StudyItemType } from "./study";

/**
 * 🎨 UI 표시용 (View Model)
 * - WordItem + DictionaryTerm + DictionaryMeaning이 합쳐진 형태
 * - 프론트엔드에서 리스트 렌더링할 때 이 타입을 씁니다.
 */
export interface StudyViewItem {
  /**
   * 내 단어장 아이템 ID (삭제/수정용)
   */
  itemId: ID;

  /**
   * 아이템 타입
   */
  type: StudyItemType;
  /**
   * 화면 표시 질문
   */
  front: string;
  /**
   * 화면 표시 정답
   */
  back: string;

  /**
   * 발음 기호 (예: [æp.l])
   * - 사전 기반 단어의 경우
   */
  pronunciation?: string;
  /**
   * 예문 (뜻에 따라 예문이 달라질 수 있으므로 여기에 위치)
   * - 사전 기반 단어의 경우
   */
  example?: string;

  /**
   * 외움 상태
   */
  status: MemorizationStatus;

  /**
   * 태그 (예: ['토익', '중학영단어'])
   */
  tags?: string[];
}
