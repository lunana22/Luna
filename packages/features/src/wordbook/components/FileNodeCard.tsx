import { FileNode, NodeType } from "@luna/types";

interface FileNodeCardProps {
  node: FileNode;
  onClick: () => void;
}

export const FileNodeCard = ({ node, onClick }: FileNodeCardProps) => {
  const isFolder = node.type === NodeType.FOLDER;
  const displayName = node.name;

  return (
    <div
      onClick={onClick}
      className="
        group flex flex-col items-center justify-start p-2 m-3
        w-28 cursor-pointer transition-all duration-200
        hover:bg-gray-100/50 rounded-xl
      "
    >
      {/* Icon Area */}
      <div className="flex items-center justify-center relative mb-2 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 w-[100px] h-[100px]">
        {isFolder ? (
          // Premium Pink Folder SVG
          <div className="w-16 h-14 relative drop-shadow-md">
            <svg
              viewBox="0 0 100 80"
              className="w-full h-full fill-pink-200 stroke-pink-300 stroke-1"
            >
              <path
                d="M5 10 C5 5 10 0 15 0 L40 0 C45 0 50 5 50 10 L55 10 C60 10 95 10 95 15 L95 75 C95 80 90 85 85 85 L5 85 C0 85 0 80 0 75 L0 15 C0 10 5 10 5 10 Z"
                className="fill-pink-100"
              />
              <path
                d="M0 20 C0 15 5 15 10 15 L90 15 C95 15 100 20 100 25 L100 75 C100 80 95 85 90 85 L10 85 C5 85 0 80 0 75 Z"
                className="fill-pink-200"
              />
            </svg>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-lg pointer-events-none" />
          </div>
        ) : (
          // Premium WordBook Icon
          <div className="w-14 h-16 relative drop-shadow-md">
            <div className="absolute inset-0 bg-blue-500 rounded-r-md rounded-l-sm transform translate-x-0.5" />
            <div className="absolute inset-0 bg-white border border-gray-200 rounded-r-md rounded-l-sm flex items-center justify-center overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500/20" />
              <span className="text-2xl font-serif text-blue-600 font-bold">
                A
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Text Area */}
      <span className="text-xs text-center text-gray-700 font-medium leading-tight line-clamp-2 break-words w-full px-1 group-hover:text-black">
        {displayName}
      </span>
    </div>
  );
};
