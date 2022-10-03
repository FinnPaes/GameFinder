// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,

    nitro: {
        preset: "node-server"
    },

    runtimeConfig: {
        TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
        TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET
    },

    app: {
        head: {
            htmlAttrs: {
            	lang: "nl"
			},
            link: [
                { rel: "stylesheet", href: "/css/app.css" }
			]
        }
    }
})
