import { viteMockServe } from "vite-plugin-mock";

export default function createMockServer() {
  return viteMockServe({
    mockPath: "mock", // mock 文件目录
    watchFiles: true,
    enable: true,
  })
}