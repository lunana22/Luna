import { FileNode } from "@luna/types";

/**
 * 🔄 순환 참조 방지 체크 함수
 * @param folders 전체 폴더 리스트
 * @param movingFolderId 이동하려는 폴더 ID (예: A)
 * @param newParentId 이동할 곳의 부모 ID (예: C)
 * @returns true면 순환 발생(이동 불가), false면 이동 가능
 */
export const checkCircularReference = (
  folders: FileNode[],
  movingFolderId: string,
  newParentId: string | null // null이면 최상위로 이동(항상 가능)
): boolean => {
  // 1. 최상위(Root)로 보내는 건 자기 자신이 아니면 언제나 OK
  if (newParentId === null) return false;

  // 2. 자기 자신 밑으로 들어가는 것 방지 (A -> A)
  if (movingFolderId === newParentId) return true;

  // 3. 족보 역추적 (Backtracking)
  let currentParentId: string | null | undefined = newParentId;

  // 부모가 없을 때(Root)까지 계속 타고 올라감
  while (currentParentId) {
    // 부모를 찾아 올라가다가 '나(movingFolder)'를 만나면 에러!
    if (currentParentId === movingFolderId) {
      return true; // 순환 발생!
    }

    // 다음 부모 찾기
    const parentFolder = folders.find((f) => f.id === currentParentId);
    currentParentId = parentFolder?.parentId;
  }

  return false; // 통과! (안전함)
};
