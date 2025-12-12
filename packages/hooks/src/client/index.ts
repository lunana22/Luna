"use client";

import { useTestHook } from "./useTestHook";
// 미디어 쿼리 훅 (ex 사이즈 측정 조건 맞으면 함수 실행)
import { useMediaQuery } from "./useMediaQuery";
// 바깥 영역 클릭 감지 훅 (ex 드랍다운 클릭 외부 클릭 시 닫히도록)
import { useClickOutside } from "./useClickOutside";
// 관리자 로케일 체크
import { useAdminLocaleCheck } from "./useAdminLocaleCheck";
// 앱 유틸리티 훅 (ex 서비스 워커 등록, 알림 권한 체크)
import { useAppUtilities } from "./useAppUtilities";

// 필드 피드백 훅
import { useFieldFeedback } from "./useFieldFeedback";

// 로케일 변경 훅
import { useLocaleChange } from "./useLocaleChange";

// 유저 메뉴 훅
import { useUserMenuHook } from "./useUserMenuHook";

// 스크롤 훅
import { useScrollArea } from "./useScrollArea";

// 앱 스크롤 숨김 훅
import { useAppScrollHide } from "./useAppScrollHide";

// 쿼리값 변경 훅
import { useQueryChange } from "./useQueryChange";
// 쿼리값 변경 훅

import { useElementSize } from "./useElementSize";

export {
  useAppUtilities,
  useTestHook,
  useMediaQuery,
  useClickOutside,
  useAdminLocaleCheck,
  useFieldFeedback,
  useLocaleChange,
  useUserMenuHook,
  useScrollArea,
  useAppScrollHide,
  useQueryChange,
  useElementSize,
};
