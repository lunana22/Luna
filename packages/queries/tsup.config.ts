import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  target: "es2020",
  treeshake: false,
  splitting: false,
  external: [
    "react",
    "react-dom",
    "@tanstack/react-query",
    "@luna/types",
    "@luna/api",
    "@luna/utils",
  ],
  tsconfig: "tsconfig.build.json",
  banner: {
    js: '"use client";',
  },
});
