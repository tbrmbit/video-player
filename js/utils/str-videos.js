export function getVideoType(src) {
  return `video/${getVideoFormat(src)}`;
}

export function getVideoFormat(src) {
  const str_total = src.length;
  const start = str_total - 3;
  return src.slice(start, str_total);
}