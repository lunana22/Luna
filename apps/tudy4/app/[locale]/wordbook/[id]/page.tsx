"use client";
import { useParams } from "next/navigation";
import { WordListContainer } from "@luna/features/client";

export default function WorkBookPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <main className="p-6 max-w-2xl mx-auto">
      {/* 헤더 등... */}

      {/* ⚡ 상세 리스트 컨테이너 한 줄로 끝! */}
      <WordListContainer bookId={id} />
    </main>
  );
}
