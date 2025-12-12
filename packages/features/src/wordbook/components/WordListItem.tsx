import { StudyViewItem } from "@luna/types";
import { MEMORIZATION_CONFIG } from "@luna/utils/constants";

interface WordListItemProps {
  item: StudyViewItem;
  onClick?: () => void;
}

export const WordListItem = ({ item, onClick }: WordListItemProps) => {
  const statusColor: Record<string, string> = {
    UNKNOWN: "bg-gray-200",
    MEMORIZED: "bg-green-400",
  };

  const currentColor = statusColor[item.status] || "bg-gray-200";

  return (
    <div
      onClick={onClick}
      className="
        relative flex flex-col p-5 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] 
        border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer
        group overflow-hidden
      "
    >
      {/* Status Indicator (Left Bar) */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${currentColor}`} />

      <div className="flex justify-between items-start pl-2">
        <div className="flex-1 min-w-0">
          {/* Word & Pronunciation */}
          <div className="flex items-baseline gap-2 mb-1.5">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              {item.front}
            </h3>
            {item.pronunciation && (
              <span className="text-sm text-gray-400 font-normal font-mono">
                /{item.pronunciation}/
              </span>
            )}
          </div>

          {/* Meaning */}
          <p className="text-base text-gray-700 font-medium leading-relaxed mb-1">
            {item.back}
          </p>

          {/* Example Sentence */}
          {item.example && (
            <div className="mt-2 pt-2 border-t border-gray-50">
              <p className="text-sm text-gray-500 italic">"{item.example}"</p>
            </div>
          )}
        </div>

        {/* Action / Status Icon */}
        <div className="flex flex-col items-end gap-2 ml-3">
          {/* Speaker Icon (Mock) */}
          <button
            className="p-1.5 rounded-full text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Play audio");
            }}
          >
            🔊
          </button>
        </div>
      </div>
    </div>
  );
};
