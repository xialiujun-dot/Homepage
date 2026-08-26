import path from 'path'
import { defineConfig } from '@lark-apaas/coding-preset-vite-react'

const APP_TITLE = '夏刘军的个人主页'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  server: {
    proxy: {
      // 本地 Ollama 代理，避免浏览器 CORS 问题
      '/ollama': {
        target: 'http://localhost:11434',
        changeOrigin: true,
        rewrite: (p: string) => p.replace(/^\/ollama/, ''),
      },
    },
  },
  plugins: [
    // 本地 dev 修复：平台 ogMetaPlugin 会把 title 替换成 {{appName}} 占位符，
    // 部署时由平台运行时替换，但本地 dev 会显示字面量。此插件在其后执行，把标题改回正确值。
    {
      name: 'fix-local-title',
      transformIndexHtml(html: string) {
        return html
          .replace(/<title>\{\{appName\}\}<\/title>/gi, `<title>${APP_TITLE}</title>`)
          .replace(/(<meta\s+[^>]*property=["']?og:title["']?[^>]*content=)["']\{\{appName\}\}["']/gi, `$1"${APP_TITLE}"`)
      },
    },
  ],
})
