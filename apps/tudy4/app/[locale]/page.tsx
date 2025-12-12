"use client";
import { WordBookListContainer } from "@luna/features/client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full mx-auto bg-white h-full rounded-3xl shadow-sm border border-gray-100">
        <WordBookListContainer />
      </div>
    </div>
  );
}
