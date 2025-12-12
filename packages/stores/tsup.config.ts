import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true, // .d.ts 생성
  format: ["esm", "cjs"], // ESM + CJS 동시 빌드
  outDir: "dist",
  clean: true,
  sourcemap: true,
  target: "es2020",
  treeshake: true,
  splitting: false, // 라이브러리 배포 시 권장
  skipNodeModulesBundle: true,
  // external: ["react", "react-dom"], // 리액트는 peer로 두고 external 처리
  tsconfig: "tsconfig.json",
});
