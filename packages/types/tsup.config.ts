import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/models/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  tsconfig: "tsconfig.build.json",
});
