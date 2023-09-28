import bnbConfig from "./bnb.config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  spaLoadingTemplate: "spa-loading-template.html",
  app: {
    baseURL: process.env.NODE_ENV === "production" ? bnbConfig.subroute : "/",
    buildAssetsDir: "/_bnb/",
    rootId: "__bnb",
    head: {
      title: "BNB - Gestor de Clientes",
      link: [{ rel: "icon", type: "image/x-icon", href: `${process.env.NODE_ENV === "production" ? bnbConfig.subroute : "/"}favicon.ico` }],
    }
  },
  generate: {
    exclude: [
      "/_demobnb/"
    ]
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/ui",
  ],
  colorMode: {
    preference: "light",
  },
  ui: {
    icons: "all",
    safelistColors: ["primary", "secondary", "red"],
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  tailwindcss: {
    configPath: "~/config/tailwind.ts"
  },
  googleFonts: {
    families: {
      "Work+Sans": ["100..900"], // eslint-disable-line
    }
  }
})
