import { getFcmToken } from "@luna/utils/client";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

// permissions.ts
const checkPermission = (key: "serviceWorker" | "notifications" | "push") => {
  if (key === "serviceWorker") return "serviceWorker" in navigator;
  if (key === "push") return "PushManager" in window;
  if (key === "notifications") return "Notification" in window;
  return false;
};

// 알림 권한 체크
const ensureNotificationPermission = async () => {
  if (!checkPermission("notifications")) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return await Notification.requestPermission();
  // 승인 "granted", 거절 "denied", 아무것도 안 고르면 "default".
};

const attachServiceWorkerUpdateLogger = (
  registration: ServiceWorkerRegistration
) => {
  // 이벤트 로깅
  registration.addEventListener("updatefound", () => {
    const newWorker = registration.installing;
    console.log("[SW] Update found!");
    newWorker?.addEventListener("statechange", function () {
      console.log("[SW] State changed:", this.state);
    });
  });
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("[SW] Controller changed (새 버전 활성화)");
  });
};

const registerServiceWorker = async () => {
  if (!checkPermission("serviceWorker")) return null;

  try {
    // 서비스 워커 등록
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      { scope: "/firebase-cloud-messaging-push-scope" }
    );

    //알림 권한 확인
    await ensureNotificationPermission();

    // 토큰 발급
    const fcmToken = await getFcmToken();
    if (!fcmToken) console.log("FCM 토큰을 취득할 수 없습니다.");

    // 서비스워커의 새 버전 배포 감지 및 상태 로깅
    attachServiceWorkerUpdateLogger(registration);

    return registration;
  } catch (err) {
    console.error("[SW] Registration failed:", err);
    return null;
  }
};

const useRegisterServiceWorkerEffect = () => {
  const params = useParams();
  const pathname = usePathname();
  // params.localedasd dasda/
  return useEffect(() => {
    registerServiceWorker();
  }, [pathname, params.locale]);
};

export function useAppUtilities() {
  return {
    checkPermission,
    registerServiceWorker,
    useRegisterServiceWorkerEffect,
  };
}
