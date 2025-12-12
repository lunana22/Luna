export function stripPrefix(name: string, prefix = "Icon") {
  return name.startsWith(prefix) ? name.slice(prefix.length) : name;
}
