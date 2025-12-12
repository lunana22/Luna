/** 파일명 → PascalCase (확장자 제거, 구분자 -, _, 공백 등 처리) */
export function toPascalCase(file: string) {
  const base = file.replace(/\.svg$/i, "");
  const parts = base.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const camel = parts
    .map((p, i) =>
      i === 0
        ? p.toLowerCase()
        : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase(),
    )
    .join("");
  const pascal = camel.charAt(0).toUpperCase() + camel.slice(1);
  // 숫자 시작 방지
  return /^[A-Za-z_$]/.test(pascal) ? pascal : `_${pascal}`;
}
