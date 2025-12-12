import { CancelablePromise } from "../core/CancelablePromise";
import { request } from "../core/request";
import { OpenAPI } from "../core/OpenAPI";
import { ENDPOINTS } from "@learninboard/utils/constants";
import {
  BlogContentsResponseDto,
  YoutubeContentsResponseDto,
} from "@learninboard/types";

class ContentsService {
  public static getBlogContents(): CancelablePromise<BlogContentsResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.CONTENTS.BLOG,
    });
  }
  public static getYoutubeContents(): CancelablePromise<YoutubeContentsResponseDto> {
    return request(OpenAPI, {
      method: "GET",
      url: ENDPOINTS.CONTENTS.YOUTUBE,
    });
  }
}

export { ContentsService };
