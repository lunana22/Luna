import type { GetELearninBoardAccessResponseDto } from "@learninboard/types";
import { ENDPOINTS } from "@learninboard/utils/constants";
import { request as request } from "../core/request";
import { OpenAPI } from "../core/OpenAPI";
import { CancelablePromise } from "../core/CancelablePromise";

class ELearninBoardService {
  public static LoginAsStudent(): CancelablePromise<GetELearninBoardAccessResponseDto> {
    return request(OpenAPI, {
      method: "POST",
      url: ENDPOINTS.ELEARNINBOARD.LOGIN_AS_STUDENT,
    });
  }
}

export { ELearninBoardService };
