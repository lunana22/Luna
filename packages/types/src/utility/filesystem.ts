import { BaseEntity, ID, Language } from "./common";
import { DeckMetadata, FolderMetadata } from "./filesystem.metadata";

/**
 * 1. 파일 종류 🏷️
 */
export enum NodeType {
  /**
   * 📁 폴더
   */
  FOLDER = "FOLDER",
  /**
   * 📇 단어장
   */
  DECK = "DECK",
  // PDF, NOTE... (확장성)
}

// 🗂️ 폴더 (단어장들을 묶는 상위 개념)
export interface FileNode extends BaseEntity {
  /**
   * 소유자 ID
   */
  ownerId: ID | null;
  /**
   * 파일 이름
   */
  name: string;
  /**
   * 파일 설명
   */
  description?: string;
  /**
   * 폴더 아이콘
   */
  emoji?: string;

  /**
   * 상위 폴더 ID
   */
  parentId?: ID | null;
  /**
   * 파일 종류
   */
  type: NodeType;
  /**
   * 공개 여부
   */
  isPublic?: boolean;
  /**
   * 🍴 가져가기(Fork) 횟수 (New! ⭐)
   * - "이 자료가 얼마나 유용한가?"를 나타내는 진짜 척도
   * - 인기순 정렬할 때: (viewCount * 0.1) + (forkCount * 1.0) 가중치 적용
   */
  forkCount: number;
  /**
   * 조회수 (인기순 정렬용)
   */
  viewCount: number;
  /**
   * 원본 파일 ID (Fork된 경우)
   */
  originalNodeId?: ID | null;

  /**
   * 하위 파일
   */
  children?: FileNode[];
  /**
   * 메타데이터
   */
  metadata: DeckMetadata | FolderMetadata;
}
