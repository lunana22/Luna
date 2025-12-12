// import { WordBook, WordViewItem, Folder, FolderDetail } from "@luna/types";
// import { ENDPOINTS } from "@luna/utils/constants";

// import { CancelablePromise } from "../core/CancelablePromise";
// import { request } from "../core/request";
// import { OpenAPI } from "../core/OpenAPI";
import { FileNode, StudyViewItem } from "@luna/types";
import {
  getStudyItemsInDeck,
  getFileTree,
  getFolderContents,
  getAllMyDecks,
} from "../mock_data/Dictionary_data";

class WorkBookService {
  // 내 모든 단어장 가져오기
  public static getAllMyDecks(userId: string): Promise<FileNode[]> {
    return getAllMyDecks(userId);
  }

  /**
   * 📘 특정 단어장(Deck) 안의 아이템들 가져오기 (상세 화면용)
   * - WORD 타입: 사전 데이터 조인 + 언어 설정에 따른 앞뒤 전환
   * - CARD 타입: 그냥 그대로 보여줌
   */
  public static getStudyItemsInDeck(bookId: string): Promise<StudyViewItem[]> {
    return getStudyItemsInDeck(bookId);
  }

  // 전체 폴더 트리 조회
  public static getFileTree(userId: string): Promise<FileNode[]> {
    return getFileTree(userId);
  }
  // 선택한 폴더 -> 폴더 내용 조회
  public static getFolderContents(folderId: string | null): Promise<{
    currentNode?: FileNode;
    children: FileNode[];
  }> {
    return getFolderContents(folderId);
  }
}

export { WorkBookService };
