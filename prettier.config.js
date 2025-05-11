/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 */
export default {
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  printWidth: 80,
  arrowParens: 'always',
  proseWrap: 'always',
  endOfLine: 'lf',
  experimentalTernaries: false,
  tabWidth: 2,
  useTabs: false,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  // jsxBracketSameLine: false, // 已废弃，建议移除
  vueIndentScriptAndStyle: false,
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: 'css', // 添加：更好地处理 Vue 模板中的空白
  embeddedLanguageFormatting: 'auto', // 添加：自动格式化嵌入的代码块
}
