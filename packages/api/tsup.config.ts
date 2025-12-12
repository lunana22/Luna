import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true, // 선언 파일 생성
  format: ["esm", "cjs"], // ESM + CJS 동시 출력
  outDir: "dist",
  clean: true,
  sourcemap: true,
  minify: false,
  target: "es2020",
  skipNodeModulesBundle: true, // node_modules 번들 제외
  treeshake: true,
  splitting: false, // 라이브러리면 보통 끄는 게 안전
  external: ["axios"], // 외부 의존성은 external (필요 목록 추가)
  tsconfig: "tsconfig.build.json",
});
