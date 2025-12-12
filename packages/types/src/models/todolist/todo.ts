// packages/types/src/todo.ts
import { BaseEntity, ID } from "../../utility/common";

export enum TodoPriority {
  /**
   * 낮음
   */
  LOW = "LOW",
  /**
   * 중간
   */
  MEDIUM = "MEDIUM",
  /**
   * 높음
   */
  HIGH = "HIGH",
}

export interface Todo extends BaseEntity {
  /**
   * 소유자
   */
  ownerId: ID;
  /**
   * 내용
   */
  content: string;
  /**
   * 완료 여부
   */
  isDone: boolean;
  /**
   * 마감일
   */
  dueDate?: string;
  /**
   * 우선순위
   */
  priority: TodoPriority;
  /**
   * 태그
   */
  tags?: string[];
}
