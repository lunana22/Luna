import { useState } from "react";
import { useGetStudyItemsInDeck } from "@luna/queries"; // 상세(단어목록) 조회 훅
import { WordListItem } from "../components/WordListItem";
import { StudyCard } from "../components/StudyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  bookId: string;
}

export const WordListContainer = ({ bookId }: Props) => {
  const { data: words, isLoading } = useGetStudyItemsInDeck(bookId);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500">
        단어 불러오는 중... ⏳
      </div>
    );
  }

  if (!words || words.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-xl">
        <p className="text-gray-400">아직 단어가 없네요!</p>
        <p className="text-sm text-gray-400">
          우측 하단 버튼을 눌러 추가해보세요.
        </p>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20">
      {/* Header / Filter / Mode Toggle */}
      <div className="flex justify-between items-center mb-6 px-1">
        <span className="text-sm font-bold text-gray-500">
          Total {words.length} words
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setIsStudyMode(false)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${!isStudyMode ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:bg-gray-100"}`}
          >
            List
          </button>
          <button
            onClick={() => setIsStudyMode(true)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${isStudyMode ? "bg-purple-100 text-purple-600" : "text-gray-400 hover:bg-gray-100"}`}
          >
            Study
          </button>
        </div>
      </div>

      {isStudyMode ? (
        /* Study Mode (Card View) */
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <div className="w-full max-w-sm md:max-w-md mb-8">
            {/* Mobile Card */}
            <div className="md:hidden">
              <StudyCard item={words[currentIndex]} variant="mobile" />
            </div>
            {/* Tablet Card */}
            <div className="hidden md:block">
              <StudyCard item={words[currentIndex]} variant="tablet" />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-8">
            <button
              onClick={handlePrev}
              className="p-4 rounded-full bg-white shadow-md hover:bg-gray-50 text-xl flex items-center justify-center transition-colors"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <span className="font-mono text-gray-500">
              {currentIndex + 1} / {words.length}
            </span>
            <button
              onClick={handleNext}
              className="p-4 rounded-full bg-white shadow-md hover:bg-gray-50 text-xl flex items-center justify-center transition-colors"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      ) : (
        /* List Mode */
        <>
          {/* Mobile View (Onevoca Style) */}
          <div className="md:hidden flex flex-col gap-4">
            {words.map((item) => (
              <WordListItem
                key={item.itemId}
                item={item}
                onClick={() =>
                  console.log("단어 클릭(수정 모달 등):", item.front)
                }
              />
            ))}
          </div>

          {/* Tablet/Desktop View (Notebook Style) */}
          <div className="hidden md:block bg-[#fdfbf7] p-8 rounded-lg shadow-2xl min-h-[600px] relative overflow-hidden border border-gray-200">
            {/* Notebook Binding/Holes */}
            <div className="absolute left-0 top-0 bottom-0 w-12 border-r-2 border-red-200 bg-[#fdfbf7] z-10 flex flex-col items-center pt-4 gap-8">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-gray-200 shadow-inner"
                />
              ))}
            </div>

            {/* Notebook Lines & Content */}
            <div
              className="ml-12 h-full"
              style={{
                backgroundImage:
                  "linear-gradient(#e5e7eb 1px, transparent 1px)",
                backgroundSize: "100% 2rem",
                lineHeight: "2rem",
              }}
            >
              <h2 className="text-3xl font-serif text-gray-800 mb-8 pl-4 pt-1">
                Vocabulary Note
              </h2>

              <div className="grid grid-cols-1 gap-y-0">
                {words.map((item, index) => (
                  <div
                    key={item.itemId}
                    className="flex items-baseline px-4 hover:bg-yellow-50/50 transition-colors cursor-pointer group"
                    style={{ height: "4rem" }} // 2 lines height
                    onClick={() => console.log("단어 클릭:", item.front)}
                  >
                    <span className="w-8 text-gray-400 font-mono text-sm">
                      {index + 1}.
                    </span>
                    <span className="text-xl font-serif font-bold text-gray-900 mr-4 w-1/3 truncate">
                      {item.front}
                    </span>
                    <span className="text-lg font-serif text-gray-700 flex-1 truncate border-l border-red-100 pl-4">
                      {item.back}
                    </span>
                    <span className="text-sm text-gray-400 italic w-1/4 truncate text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.example}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Action Button (Add Word) */}
      <button
        className="
          fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg 
          flex items-center justify-center text-2xl hover:bg-blue-700 hover:scale-105 transition-all
          z-50
        "
        onClick={() => console.log("Add word")}
      >
        +
      </button>
    </div>
  );
};
