import { defineConfig } from "tsup";
import svgr from "esbuild-plugin-svgr";

export default defineConfig({
  entry: ["src/common/client.ts", "src/core/client.ts", "src/layout/client.ts"],
  format: ["esm", "cjs"],
  dts: true, // tsup이 d.ts 생성
  sourcemap: true,
  clean: true,
  tsconfig: "tsconfig.build.json",

  noExternal: ["@luna/assets"],

  esbuildPlugins: [
    // tsup/esbuild svgr 플러그인 옵션
    svgr({
      exportType: "default",
      jsxRuntime: "automatic",
      svgo: true,
      // 모든 fill/stroke 제거 후 currentColor로 통일하고 싶으면:
      svgoConfig: {
        plugins: [{ name: "removeAttrs", params: { attrs: "(fill|stroke)" } }],
      },
      // 혹은 속성 주입
      svgProps: { fill: "currentColor" }, // 실루엣 계열
      // 선 아이콘 위주라면 stroke를 넣어도 됨: svgProps: { stroke: "currentColor" }
    }),
  ],

  external: [
    "react",
    "react-dom",
    "next",
    "@luna/design-system",
    "@luna/stores",
    "@luna/utils",
    "tailwindcss",
    "date-fns",
    "react-youtube",
  ],
});
