// import { useParentsStore } from "@learninboard/stores";
import { ApiRequestOptions } from "./ApiRequestOptions";
import { OpenAPI } from "./OpenAPI";
import { request } from "./request";
import { storageStore } from "@learninboard/utils";

export const parentsRequest = <T>(options: ApiRequestOptions) =>
  request<T>(OpenAPI, {
    ...options,
    path: {
      studentId: storageStore.currentStudentId.get() ?? "",
    },
  });
