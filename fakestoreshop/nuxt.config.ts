// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            apiAuthUrl: process.env.API_AUTH_URL
        },
    },
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/tailwindcss",
        "nuxt-icon"
    ],
    plugins: [
        "~/plugins/apiFakeStore"
    ]

})