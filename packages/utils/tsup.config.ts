import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/constants/index.ts",
    "src/lib/index.ts",
    "src/plugins/index.ts",
    "src/storage/index.ts",
    "src/validation/index.ts",
  ], // 공개 엔트리
  format: ["esm", "cjs"], // dual build
  dts: true, // *.d.ts 생성
  sourcemap: true, // 디버깅
  clean: true, // dist 정리
  treeshake: true,
  target: "es2020", // 런타임(Node 18+/브라우저) 맞춰 조정
  splitting: false, // 라이브러리는 보통 off
  minify: false, // 라이브러리는 가독성 위해 보통 off
  tsconfig: "tsconfig.build.json", //  이 tsconfig를 강제 사용
  external: ["react", "next", "firebase", "date-fns"], // 런타임에 있는 것들은 external
});
