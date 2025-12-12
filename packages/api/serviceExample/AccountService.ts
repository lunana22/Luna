import type { StudentDto, ParentDto, TeacherDto } from "@learninboard/types";

import { ENDPOINTS } from "@learninboard/utils/constants";
import { request as request } from "../core/request";
import { OpenAPI } from "../core/OpenAPI";
import { CancelablePromise } from "../core/CancelablePromise";

class AccountService {
  public static getStudentMe(): CancelablePromise<StudentDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.STUDENTS.ME,
    });
  }
  public static getParentMe(): CancelablePromise<ParentDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.PARENTS.ME,
    });
  }
  public static getTeacherMe(): CancelablePromise<TeacherDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.TEACHERS.ME,
    });
  }
}

export { AccountService };
