import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    client: "src/client.ts",
    server: "src/server.ts",
  }, // hooks 엔트리
  dts: true, // .d.ts 생성
  format: ["esm", "cjs"], // ESM + CJS 동시 빌드
  outDir: "dist",
  clean: true,
  sourcemap: true,
  target: "es2020",
  treeshake: true,
  splitting: false, // 라이브러리 배포 시 권장
  skipNodeModulesBundle: true,
  external: ["react", "react-dom", "next", "react-hook-form"], // 리액트는 peer로 두고 external 처리
  tsconfig: "tsconfig.build.json",

  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".js",
    };
  },
});
