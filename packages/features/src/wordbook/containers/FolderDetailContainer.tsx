import { useMemo } from "react";
import { useGetFolderContents } from "@luna/queries";
import { FileNode, NodeType } from "@luna/types";
import { FileNodeCard } from "../components/FileNodeCard";

interface FolderDetailContainerProps {
  currentFolderId: string | null;

  // 부모가 내려주는 미리 로드된 데이터 (Optional)
  preloadedFolderInfo?: FileNode;
  preloadedChildren?: FileNode[];

  onNavigateFolder: (folderId: string) => void;
  onOpenWordBook: (bookId: string) => void;
  onGoBack: () => void;
}

export const FolderDetailContainer = ({
  currentFolderId,
  preloadedFolderInfo,
  preloadedChildren,
  onNavigateFolder,
  onOpenWordBook,
  onGoBack,
}: FolderDetailContainerProps) => {
  const hasPreloadedData = preloadedChildren !== undefined;

  // 📡 데이터 동기화 (백그라운드 or 직접 접속 시 사용)
  const { data, isLoading } = useGetFolderContents(currentFolderId, {
    enabled: !hasPreloadedData && !!currentFolderId,
  });

  // 데이터 병합: Props가 있으면 그것을 우선 사용 (즉시 렌더링)
  // data.subFolders, data.wordbooks 대신 data.children을 필터링해야 함
  // 하지만 useGetFolderContents의 리턴 타입도 확인 필요.
  // 만약 useGetFolderContents가 FileNode를 리턴한다면 children을 필터링해야 함.

  // 여기서는 data가 FileNode라고 가정하고 처리 (또는 API 응답 구조에 따라 다름)
  // 기존 코드에서 data?.subFolders 였던걸 보면, useGetFolderContents의 리턴 타입도 수정되었거나
  // FileNode 구조에 맞춰서 children을 필터링해야 함.

  const displayChildren = preloadedChildren ?? data?.children ?? [];
  const displayCurrentFolder = preloadedFolderInfo ?? data?.currentNode;

  // ⚡ 정렬 및 분리 로직
  // 1. 폴더는 항상 먼저 노출
  // 2. 그 외(단어장 등)는 이름순 정렬
  const { folders, others } = useMemo(() => {
    const folders: FileNode[] = [];
    const others: FileNode[] = [];

    displayChildren.forEach((child) => {
      if (child.type === NodeType.FOLDER) {
        folders.push(child);
      } else {
        others.push(child);
      }
    });

    // 폴더는 기본적으로 생성순/메타데이터순일 수 있으나 여기선 그대로 둠 (필요시 정렬 추가)
    // others(단어장)는 이름순 정렬
    others.sort((a, b) => a.name.localeCompare(b.name));

    return { folders, others };
  }, [displayChildren]);

  // 로딩 상태 결정
  const showSkeleton = !hasPreloadedData && isLoading;

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Header Area */}
      <div className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={onGoBack}
            disabled={!currentFolderId}
            className={`
              mr-4 p-1.5 rounded-md transition-colors
              ${
                !currentFolderId
                  ? "opacity-30 cursor-default text-gray-400"
                  : "cursor-pointer hover:bg-gray-100 text-gray-600"
              }
            `}
          >
            {/* Simple Chevron Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {displayCurrentFolder ? displayCurrentFolder.name : "Recent"}
            </h2>
            {/* Optional Breadcrumb or Subtitle */}
            {displayCurrentFolder && (
              <span className="text-xs text-gray-400 font-medium mt-0.5">
                Folder
              </span>
            )}
          </div>
        </div>

        {/* Right Side Actions (Placeholder for Search/Menu) */}
        <div className="flex items-center space-x-3 text-gray-400">
          <span className="cursor-pointer hover:text-gray-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <span className="cursor-pointer hover:text-gray-600">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="flex flex-wrap content-start -m-2">
          {/* Folders */}
          {folders.map((folder) => (
            <FileNodeCard
              key={`folder-${folder.id}`}
              node={folder}
              onClick={() => onNavigateFolder(folder.id)}
            />
          ))}

          {/* Others (WordBooks) */}
          {others.map((node) => (
            <FileNodeCard
              key={`node-${node.id}`}
              node={node}
              onClick={() => {
                if (node.type === NodeType.DECK) {
                  onOpenWordBook(node.id);
                }
              }}
            />
          ))}

          {/* Loading Skeleton */}
          {showSkeleton && (
            <>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-28 h-28 m-3 bg-gray-50 rounded-xl animate-pulse"
                />
              ))}
            </>
          )}
        </div>

        {/* Empty State */}
        {!showSkeleton && displayChildren.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-300 select-none">
            <div className="mb-3">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium">Empty Folder</p>
          </div>
        )}
      </div>
    </div>
  );
};
