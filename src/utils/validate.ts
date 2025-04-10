/**
 * 路径匹配器
 * @param {string} pattern
 * @param {string} path
 * @returns {Boolean}
 */
export function isPathMatch(pattern: string, path: string) {
  const regexPattern = pattern
    .replace(/\//g, "\\/")
    .replace(/\*\*/g, ".*")
    .replace(/\*/g, "[^\\/]*");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * 判断url是否是http或https
 * @param {string} url
 * @returns {Boolean}
 */
export function isHttp(url: string) {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
}
