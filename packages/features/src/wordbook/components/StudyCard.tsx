import { useState } from "react";
import { StudyViewItem } from "@luna/types";

interface StudyCardProps {
  item: StudyViewItem;
  variant?: "mobile" | "tablet";
  className?: string;
}

export const StudyCard = ({
  item,
  variant = "mobile",
  className,
}: StudyCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Mobile: Purple Gradient
  const mobileFrontClass =
    "bg-gradient-to-br from-study-gradient-from to-study-gradient-to text-inverse";
  const mobileBackClass = "bg-surface-primary text-text-primary";

  // Tablet: Clean Minimalist (Dark/Light contrast or Glass)
  // Let's go with a "Dark Mode" card for tablet to look premium
  const tabletFrontClass =
    "bg-study-card-tablet-front text-study-card-tablet-front border border-study-card-tablet-front";
  const tabletBackClass =
    "bg-study-card-tablet-back text-study-card-tablet-back border border-study-card-tablet-back";

  const frontClass = variant === "mobile" ? mobileFrontClass : tabletFrontClass;
  const backClass = variant === "mobile" ? mobileBackClass : tabletBackClass;

  return (
    <div
      className={`relative w-full aspect-3/4 perspective-[1000px] cursor-pointer group ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`
          w-full h-full relative transition-transform duration-500 transform-3d
          ${isFlipped ? "transform-[rotateY(180deg)]" : ""}
        `}
      >
        {/* Front (Question) */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 ${frontClass}`}
        >
          <div className="text-label-medium opacity-70 absolute top-8 uppercase tracking-widest">
            Question
          </div>
          <h2 className="text-display-small text-center leading-tight text-white">
            {item.front}
          </h2>
          {item.pronunciation && (
            <div className="mt-6 px-4 py-1 bg-surface-primary/10 rounded-full text-label-small font-mono backdrop-blur-sm">
              /{item.pronunciation}/
            </div>
          )}
          <div className="absolute bottom-8 text-label-xsmall opacity-50 animate-pulse">
            Tap to flip
          </div>
        </div>

        {/* Back (Answer) */}
        <div
          className={`absolute w-full h-full backface-hidden transform-[rotateY(180deg)] rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 ${backClass}`}
        >
          <div className="text-label-medium opacity-40 absolute top-8 uppercase tracking-widest">
            Answer
          </div>
          <h2
            className={`text-heading-large text-center mb-6 ${variant === "mobile" ? "text-study-gradient-end" : "text-text-primary"}`}
          >
            {item.back}
          </h2>
          {item.example && (
            <p className="text-center opacity-70 italic px-6 border-t border-gray-200/20 pt-6 mt-2 leading-relaxed">
              "{item.example}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
