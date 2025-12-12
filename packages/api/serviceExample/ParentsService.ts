import type { StudentDto } from "@learninboard/types";

import { ENDPOINTS } from "@learninboard/utils/constants";
import { request as request } from "../core/request";
import { OpenAPI } from "../core/OpenAPI";
import { CancelablePromise } from "../core/CancelablePromise";
import { parentsRequest } from "../core/parentsRequest";

class ParentsService {
  public static getMyChildren(): CancelablePromise<{ data: StudentDto[] }> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.PARENTS.STUDENTS.LIST,
    });
  }

  public static getStudentProfileByParent(): CancelablePromise<StudentDto> {
    return parentsRequest({
      method: "GET",
      url: ENDPOINTS.PARENTS.STUDENTS.DETAIL,
    });
  }
}

export { ParentsService };
