import { useQuery } from "@tanstack/react-query";
import { StudyViewItem } from "@luna/types";
import { WorkBookService } from "@luna/api";
import { QUERY_KEY } from "../../utils/dist";
import { CustomQueryOptions } from "./lib/types";

/**
 * 📘 특정 단어장(Deck) 안의 아이템들 가져오기 (상세 화면용)
 */
export const useGetStudyItemsInDeck = <TData = StudyViewItem[]>(
  deckId: string,
  options?: CustomQueryOptions<StudyViewItem[], TData>
) => {
  return useQuery<StudyViewItem[], Error, TData>({
    queryKey: [QUERY_KEY.STUDY_ITEM.IN_DECK(deckId)],
    queryFn: () => WorkBookService.getStudyItemsInDeck(deckId),
    enabled: !!deckId,
    ...options,
  });
};
