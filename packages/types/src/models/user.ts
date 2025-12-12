// packages/types/src/user.ts
import { BaseEntity } from "../utility/common";

// 🔑 유저 권한 Enum
export enum UserRole {
  /**
   * 전체 관리자
   */
  ADMIN = "ADMIN",
  /**
   * 일반 유저
   */
  USER = "USER",
  /**
   * 비로그인 (심리테스트 등)
   */
  GUEST = "GUEST",
}

// 🔑 로그인 제공자
export enum AuthProvider {
  /**
   * 구글
   */
  GOOGLE = "GOOGLE",
  /**
   * 카카오
   */
  KAKAO = "KAKAO",
  /**
   * 이메일
   */
  EMAIL = "EMAIL",
}

export interface User extends BaseEntity {
  /**
   * 이메일
   */
  email: string;
  /**
   * 닉네임
   */
  nickname: string;
  /**
   * 프로필 이미지
   */
  profileImage?: string;
  /**
   * 권한
   */
  role: UserRole;
  /**
   * 로그인 제공자
   */
  provider: AuthProvider;
  /**
   * 포인트/재화 (수익화를 위해 미리 설계)
   */
  points: number;
}
