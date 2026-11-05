import { defineConfig, loadEnv, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** Adds canonical and share-image tags; absolute once VITE_SITE_URL is set. */
function siteMeta(site: string): Plugin {
  const origin = site.replace(/\/$/, '')
  return {
    name: 'site-meta',
    transformIndexHtml() {
      const image = `${origin}/og-image.jpg`
      const tags: HtmlTagDescriptor[] = [
        { tag: 'meta', attrs: { property: 'og:image', content: image }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: image }, injectTo: 'head' },
      ]
      if (origin) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` }, injectTo: 'head' },
        )
      }
      return tags
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), siteMeta(env.VITE_SITE_URL ?? '')],
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/three') || id.includes('@react-three')) return 'three'
            if (id.includes('framer-motion') || id.includes('node_modules/lenis')) return 'motion'
            return undefined
          },
        },
      },
    },
  }
})
