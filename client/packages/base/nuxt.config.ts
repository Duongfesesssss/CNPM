import Aura from '@primevue/themes/aura';
import { defaultOptions } from 'primevue/config';
import path from 'path';
export default defineNuxtConfig({
    build: {
      transpile: ['@nuxtjs/tailwindcss']
    },
    vite: {
      optimizeDeps: {
        include: ['@nuxtjs/tailwindcss']
      }
    },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { 'http-equiv': 'content-type', 'content': 'text/html;charset=UTF-8' },
      ],
      link: [
        {
          rel: 'shortcut icon',
          href: '/favicon/favicon.ico',
          type: 'image/vnd.microsoft.icon',
        },
        {
          rel: 'icon',
          href: '/favicon/favicon.ico',
          type: 'image/vnd.microsoft.icon',
        },
      ],
    },
  },
  css: [path.resolve(__dirname, 'assets/styles/global.css'), 'primeicons/primeicons.css'],
  modules: [
    '@primevue/nuxt-module',
    '@nuxt/eslint',
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
  ],
  colorMode: {
    preference: 'light',
    fallback: 'light',   
    classSuffix: ''     
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
      ripple: true,
      locale: {
        ...defaultOptions.locale,
      },
    },
    autoImport: true,
  },
  webpack: {
    extractCSS: true,
  },
  auth: {
    baseURL: process.env.BASE_URL,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'get' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/user', method: 'get' },
      },
      pages: {
        login: '/',
      },
      token: {
        signInResponseTokenPointer: '/data/access_token',
        maxAgeInSeconds: 60 * 24 * 30, // 5 min
        sameSiteAttribute: 'lax',
      },
    },
    globalAppMiddleware: {
      isEnabled: false,
    },
  },
  googleFonts: {
    families: {
      'Be Vietnam Pro': true,
    },
  },
  components: true,
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:8888/',
    },
  },
  routeRules: {
    '/api/**': {
      proxy: 'http://localhost:8888/api/**',
    },
  },
  
  typescript: {
    typeCheck: false,
  },
});
