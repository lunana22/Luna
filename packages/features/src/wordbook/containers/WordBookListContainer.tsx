"use client"; // 👈 Next.js App Router에서 Hooks를 쓰려면 필수!

import { useMemo } from "react";
import { useRouter } from "@luna/i18n/next/routing"; // 👈 변경된 import
import { useParams } from "next/navigation";
import { useGetFileTree } from "@luna/queries";
import { FileNode, NodeType } from "@luna/types";
import { FolderDetailContainer } from "./FolderDetailContainer";

// ... (findNodeById 함수는 동일) ...
const findNodeById = (nodes: FileNode[], id: string): FileNode | undefined => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export const WordBookListContainer = () => {
  // 1️⃣ [변경] Next.js Hooks 사용
  const router = useRouter();
  const params = useParams();

  // params.folderId는 배열일 수도 있고 string일 수도 있음 (Next.js 특성)
  // [[...folderId]]를 썼다면 배열로 들어옵니다. ex: ['123']
  const rawFolderId = params?.id;

  const currentFolderId = Array.isArray(rawFolderId)
    ? rawFolderId[0]
    : rawFolderId || null;

  // 📡 데이터 로드
  const { data: rootFolders = [] } = useGetFileTree("user-1");

  // 2️⃣ 트리에서 현재 폴더 찾기 (동일)
  const currentFolderNode = useMemo(() => {
    if (!currentFolderId) return undefined;
    return findNodeById(rootFolders, currentFolderId);
  }, [rootFolders, currentFolderId]);

  // 3️⃣ [변경] 이동 핸들러: router.push 사용
  const handleNavigate = (targetId: string | null) => {
    if (targetId) {
      router.push(`/folder/${targetId}`);
    } else {
      router.push(`/folder`); // 혹은 루트 경로 '/'
    }
  };

  const handleGoBack = () => {
    const parentId = currentFolderNode?.parentId || null;
    handleNavigate(parentId);
  };

  // 📂 사이드바 렌더링 (동일)
  const renderSidebarItem = (folder: FileNode, depth = 0) => {
    // 폴더만 렌더링
    if (folder.type !== NodeType.FOLDER) return null;

    const isSelected = folder.id === currentFolderId;
    const subFolders =
      folder.children?.filter((child) => child.type === NodeType.FOLDER) || [];

    return (
      <div key={folder.id}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate(folder.id);
          }}
          className={`
            flex items-center px-2 py-1.5 mb-0.5 rounded-[5px] cursor-pointer truncate transition-colors duration-100
            ${isSelected ? "bg-[#B4D8FD] text-[#0058D0]" : "hover:bg-[#E3E3E3]"}
          `}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <span
            className={`mr-2.5 text-base ${isSelected ? "text-[#0058D0]" : "text-[#007AFF]"}`}
          >
            {isSelected ? "📂" : "📁"}
          </span>
          {folder.name}
        </div>

        {subFolders.length > 0 && (
          <div>
            {subFolders.map((child) => renderSidebarItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex w-full h-screen bg-[#F6F6F6] text-sm font-sans">
      {/* ⬅️ 사이드바 (Mac Finder Style) */}
      <aside className="w-[220px] bg-[#F1F1F1]/80 backdrop-blur-xl border-r border-[#D1D1D1] flex flex-col pt-5 select-none text-[13px] font-medium text-[#4B4B4B]">
        {/* Favorites Section */}
        {/* <div className="mb-6">
          <div className="px-4 py-1 text-[11px] font-bold text-[#8C8C8C] mb-1 uppercase tracking-wide">
            Favorites
          </div>
          <div className="px-2 space-y-0.5">
            <div className="flex items-center px-2 py-1.5 rounded-[5px] cursor-pointer hover:bg-[#E3E3E3] transition-colors">
              <span className="mr-2.5 text-[#007AFF] text-base">📡</span>{" "}
              Airdrop
            </div>
            <div className="flex items-center px-2 py-1.5 rounded-[5px] cursor-pointer hover:bg-[#E3E3E3] transition-colors">
              <span className="mr-2.5 text-[#8E8E93] text-base">🕒</span>{" "}
              Recents
            </div>
            <div className="flex items-center px-2 py-1.5 rounded-[5px] cursor-pointer hover:bg-[#E3E3E3] transition-colors">
              <span className="mr-2.5 text-[#007AFF] text-base">📂</span>{" "}
              Documents
            </div>
          </div>
        </div> */}

        {/* iCloud / Locations Section */}
        <div className="flex-1 overflow-y-auto pb-4 custom-scrollbar">
          <div className="px-4 py-1 text-[11px] font-bold text-[#8C8C8C] mb-1 uppercase tracking-wide">
            Locations
          </div>
          <div className="px-2 space-y-0.5">
            <div
              onClick={() => handleNavigate(null)}
              className={`
                flex items-center px-2 py-1.5 rounded-[5px] cursor-pointer transition-colors
                ${!currentFolderId ? "bg-[#B4D8FD] text-[#0058D0]" : "hover:bg-[#E3E3E3]"}
              `}
            >
              <span className="mr-2.5 text-base">🏠</span> All Files
            </div>
            {rootFolders.map((folder) => renderSidebarItem(folder))}
          </div>
        </div>
      </aside>

      {/* ➡️ 메인 컨텐츠 */}
      <main className="flex-1 bg-white flex flex-col min-w-0">
        <FolderDetailContainer
          currentFolderId={currentFolderId}
          preloadedFolderInfo={currentFolderNode}
          preloadedChildren={
            currentFolderNode ? currentFolderNode.children : rootFolders
          }
          onNavigateFolder={handleNavigate}
          onOpenWordBook={(bookId) => router.push(`/wordbook/${bookId}`)}
          onGoBack={handleGoBack}
        />
      </main>
    </div>
  );
};
