#!/usr/bin/env node
import path from "node:path";
import { genIconsEntity } from "./codegen/icons";

type Task = "all" | "icons";

const task = (process.argv[2] as Task) ?? "all";

const outputMap = {
  iconsSrcDir: path.resolve(process.cwd(), "../../packages/assets/src/icons"),
  iconsOutFile: path.resolve(
    process.cwd(),
    "../../packages/ui/src/atoms/Icon.index.ts",
  ),
};

async function main() {
  console.log("✨ Codegen 시작...");
  //   import Add from "@learninboard/assets/src/icons/icon_add.svg";
  if (task === "all" || task === "icons") {
    const { count } = await genIconsEntity({
      iconsSrcDir: outputMap.iconsSrcDir,
      outFile: outputMap.iconsOutFile,
      // ⚠ exports 경로를 쓰는 걸 강력 권장 (src 경로 직접 쓰지 말기)
      importBase: "@learninboard/assets/src/icons",
      defaultBaseClass: "w-4 h-4",
      banner: true,
    });
    console.log(`🧩 Icons generated: ${count}`);
    console.log(`📄 Output: ${outputMap.iconsOutFile}`);
  }

  console.log("Codegen 완료");
}

main().catch((err) => {
  console.error("❌ Codegen 실패:", err);
  process.exit(1);
});
