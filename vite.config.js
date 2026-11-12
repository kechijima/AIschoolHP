import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const budouxDir = fileURLToPath(new URL('./node_modules/budoux/module', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      // BudouX の日本語辞書だけを読み込むため、パッケージ内部のモジュールを直接参照する
      // （通常の import だと中国語・タイ語の辞書まで同梱される）
      '@budoux': budouxDir,
    },
  },
  plugins: [
    {
      // BudouX の dom.js はサーバー用 DOM（linkedom）を読み込むため、
      // ブラウザ用の dom-browser.js に差し替える（JS が約400KB → 数十KB）
      name: 'budoux-browser-dom',
      enforce: 'pre',
      resolveId(source, importer) {
        if (source === './dom.js' && importer && importer.replace(/\\/g, '/').includes('/budoux/module/')) {
          return `${budouxDir}/dom-browser.js`
        }
        return null
      },
    },
  ],
})
