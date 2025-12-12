// scripts/codegen/icons.ts
import { promises as fs } from "fs";
import path from "path";
import { toPascalCase } from "../utils/toPascalCase";
import { dedupe } from "../utils/dedupe";
import { stripPrefix } from "../utils/stripPrefix";

type GenOptions = {
  /** 아이콘 소스 디렉토리(실제 파일 위치) */
  iconsSrcDir: string; // e.g. ../../packages/assets/src/icons
  /** 생성될 Icon.index.ts 파일 경로 */
  outFile: string; // e.g. ../../packages/ui/src/atoms/Icon.index.ts
  /** import 경로 베이스 (exports 경로 쓰는 걸 권장) */
  importBase?: string; // e.g. @learninboard/assets/icons
  /** withIconStyle 기본 baseClass */
  defaultBaseClass?: string; // e.g. "w-4 h-4"
  /** 헤더 주석 on/off */
  banner?: boolean;
};

/**
 * assets icons를 읽어 Icon.index.ts 생성
 * import { withIconStyle } from "./Icon.web";
 * import Add from "@learninboard/assets/icons/icon_add.svg";
 * export const Icon = { Add: withIconStyle(Add, { baseClass: "w-4 h-4" }) } as const;
 */
export async function genIconsEntity(opts: GenOptions) {
  const {
    iconsSrcDir,
    outFile,
    importBase = "@luna/assets/icons",
    banner = true,
  } = opts;

  // 1) 아이콘 파일 스캔
  const files = (await fs.readdir(iconsSrcDir))
    .filter((f) => f.toLowerCase().endsWith(".svg"))
    .sort();

  // 2) 컴포넌트 이름 계산
  const rawNames = files.map((f) => toPascalCase(f));
  const names = dedupe(rawNames).map((n) => stripPrefix(n));

  // 3) 코드 조립
  const lines: string[] = [];
  // lines.push(`"use client";`);
  if (banner) {
    lines.push(`// AUTO-GENERATED FILE. DO NOT EDIT.`);
    lines.push(`// Run your codegen script to refresh this file.`);
  }
  lines.push(``);
  lines.push(`import { withIconStyle } from "./Icon.web";`);
  files.forEach((file, i) => {
    // exports 경로 사용 권장: @learninboard/assets/icons/<file>
    lines.push(`import ${names[i]} from "${importBase}/${file}";`);
  });
  lines.push(``);
  lines.push(`export const Icon = {`);
  files.forEach((_, i) => {
    lines.push(
      // `  ${names[i]}: withIconStyle(${names[i]}, { baseClass: "${defaultBaseClass}" }),`,
      `  ${names[i]}: withIconStyle(${names[i]}),`
    );
  });
  lines.push(`} as const;`);
  lines.push(``);

  const content = lines.join("\n");

  // 4) 디렉토리 보장 & 쓰기
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, content, "utf8");

  return { count: files.length, outFile };
}
