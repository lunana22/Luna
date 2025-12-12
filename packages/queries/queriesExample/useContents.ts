import { QUERY_KEY } from "@learninboard/utils/constants";
import { ContentsService } from "@learninboard/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogContents = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CONTENTS.BLOG],
    queryFn: () => ContentsService.getBlogContents(),
  });
};

export const useGetYoutubeContents = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CONTENTS.YOUTUBE],
    queryFn: () => ContentsService.getYoutubeContents(),
  });
};
