import { FileNode } from "@luna/types";
import { useQuery } from "@tanstack/react-query";
import { WorkBookService } from "@luna/api";
import { QUERY_KEY } from "../../utils/dist";
import { CustomQueryOptions } from "./lib/types";

/**
 * 🌲 전체 파일 트리 조회
 */
export const useGetFileTree = <TData = FileNode[]>(
  userId: string,
  options?: CustomQueryOptions<FileNode[], TData>
) => {
  return useQuery<FileNode[], Error, TData>({
    queryKey: [QUERY_KEY.FILE_NODE.TREE, userId],
    queryFn: () => WorkBookService.getFileTree(userId),
    ...options,
    enabled: !!userId,
  });
};

/**
 * 📂 특정 폴더 내부 파일들 가져오기 (메인 Finder 화면용)
 */
export const useGetFolderContents = <
  TData = {
    currentNode?: FileNode;
    children: FileNode[];
  },
>(
  folderId: string | null,
  options?: CustomQueryOptions<
    {
      currentNode?: FileNode;
      children: FileNode[];
    },
    TData
  >
) => {
  return useQuery<
    {
      currentNode?: FileNode;
      children: FileNode[];
    },
    Error,
    TData
  >({
    queryKey: [QUERY_KEY.FILE_NODE.FOLDER_CONTENTS(folderId)],
    queryFn: () => WorkBookService.getFolderContents(folderId),
    ...options,
    enabled: true, // Root(null)일 수도 있으므로 항상 true (필요 시 조정)
  });
};

/**
 * 📚 내 모든 단어장 가져오기 (Flat List)
 */
export const useGetAllMyDecks = <TData = FileNode[]>(
  userId: string,
  options?: CustomQueryOptions<FileNode[], TData>
) => {
  return useQuery<FileNode[], Error, TData>({
    queryKey: [QUERY_KEY.FILE_NODE.ALL_MY_DECKS(userId)],
    queryFn: () => WorkBookService.getAllMyDecks(userId),
    ...options,
    enabled: !!userId,
  });
};
