import { FileNode, DeckMetadata } from "@luna/types";
import { Badge } from "@luna/ui/core/client";

interface Props {
  node: FileNode;
  onClick: () => void;
}

export const WordBookCard = ({ node, onClick }: Props) => {
  const metadata = node.metadata as DeckMetadata;

  // 랜덤 그라디언트로 책 표지 느낌 내기 (언어별로 다르게 해도 좋음)
  const gradients = [
    "from-blue-500 to-cyan-400",
    "from-emerald-500 to-teal-400",
    "from-indigo-500 to-purple-500",
    "from-rose-500 to-orange-400",
  ];
  // ID 기반으로 색상 결정 (일관성 유지)
  const colorIndex = node.id.charCodeAt(0) % gradients.length;
  const headerGradient = gradients[colorIndex];

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      {/* 🎨 상단 컬러 바 (책등 느낌) */}
      <div className={`h-3 w-full bg-linear-to-r ${headerGradient}`} />

      <div className="p-6 flex flex-col h-full">
        {/* 상단: 뱃지 & 메타 정보 */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-1.5">
            <Badge
              variant="default"
              className="bg-gray-100 text-gray-600 font-bold border-0"
            >
              {metadata?.defaultSourceLang || "EN"}
            </Badge>
            <span className="text-gray-300 text-xs">➜</span>
            <Badge variant="blue" className="font-bold">
              {metadata?.defaultTargetLang || "KO"}
            </Badge>
          </div>
          <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
            👀 {node.viewCount}
          </span>
        </div>

        {/* 중단: 제목 & 설명 */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {node.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
          {node.description || "설명이 없는 단어장입니다."}
        </p>

        {/* 하단: 태그 & 진행률(데코레이션) */}
        <div className="mt-auto">
          {/* 가짜 진행률 바 (나중에 실제 데이터 연결) */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[45%] bg-gray-300 rounded-full" />
            </div>
            <span className="text-xs text-gray-400 font-medium">45%</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {metadata?.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
