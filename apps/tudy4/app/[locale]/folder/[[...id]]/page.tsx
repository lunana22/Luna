import { WordBookListContainer } from "@luna/features/client";

export default function FolderPage() {
  return (
    <div className="h-screen bg-gray-50">
      <div className="w-full h-full mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <WordBookListContainer />
      </div>
    </div>
  );
}
