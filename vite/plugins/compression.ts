import compression from 'vite-plugin-compression'
import type { Plugin } from 'vite'

interface EnvConfig {
  VITE_BUILD_COMPRESS?: string
}

interface CompressionOptions {
  ext: string
  deleteOriginFile: boolean
  algorithm?: string
}

export default function createCompression(env: EnvConfig): Plugin[] {
  const { VITE_BUILD_COMPRESS } = env
  const plugin: Plugin[] = []

  if (VITE_BUILD_COMPRESS) {
    const compressList: string[] = VITE_BUILD_COMPRESS.split(',')

    if (compressList.includes('gzip')) {
      const gzipOptions: CompressionOptions = {
        ext: '.gz',
        deleteOriginFile: false,
      }
      plugin.push(compression(gzipOptions))
    }

    if (compressList.includes('brotli')) {
      const brotliOptions: CompressionOptions = {
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: false,
      }
      plugin.push(compression(brotliOptions))
    }
  }

  return plugin
}
