/* istanbul ignore file */
/* tslint:disable */

import type { ApiRequestOptions } from "./ApiRequestOptions";
import type { ApiResult } from "./ApiResult";

type ErrorBody = {
  code?: string;
  message?: string;
  field?: string;
};

export class ApiError extends Error {
  public readonly url: string;
  public readonly status: number;
  public readonly statusText: string;
  public readonly body: any;
  public readonly request: ApiRequestOptions;
  public readonly code?: string;
  public readonly field?: string;

  constructor(
    request: ApiRequestOptions,
    response: ApiResult,
    defaultMessage: string,
  ) {
    const rawBody = response.body;
    const body =
      typeof rawBody === "object" && rawBody !== null
        ? (rawBody as ErrorBody)
        : undefined;
    const bodyMessage = body?.message;
    const message =
      typeof bodyMessage === "string"
        ? bodyMessage
        : (defaultMessage ?? `HTTP ${response.status}`);
    super(message);

    this.name = "ApiError";
    this.url = response.url;
    this.status = response.status;
    this.statusText = response.statusText;
    this.body = response.body;
    this.request = request;
    this.code = body?.code;
    this.field = body?.field;
  }
}
