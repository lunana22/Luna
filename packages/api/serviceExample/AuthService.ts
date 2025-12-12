import type {
  LoginAsPortalRequestDto,
  LoginAsPortalResponseDto,
} from "@learninboard/types";
import type { MeResponseDto } from "@learninboard/types";

import { ENDPOINTS } from "@learninboard/utils/constants";
import { request as request } from "../core/request";
import { OpenAPI } from "../core/OpenAPI";
import { CancelablePromise } from "../core/CancelablePromise";

class AuthService {
  /** login (POST /api/user) */
  public static login(
    requestBody: LoginAsPortalRequestDto,
  ): CancelablePromise<LoginAsPortalResponseDto> {
    return request(OpenAPI, {
      method: "POST",
      url: ENDPOINTS.AUTH.LOGIN,
      body: requestBody,
      mediaType: "application/json",
    });
  }
  public static async loginWithRoute(requestBody: LoginAsPortalRequestDto) {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));

      throw {
        status: res.status,
        code: json?.code,
        message: json?.message ?? `HTTP ${res.status}`,
        field: json?.field,
      };
    }

    return await res.json();
  }

  public static async logout(): Promise<void> {
    const res = await fetch(`/api/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  }

  public static getMe(): CancelablePromise<MeResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.AUTH.ME,
    });
  }
}

export { AuthService };
