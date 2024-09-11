import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue"; // add the vue plugin
import { fileURLToPath, URL } from "node:url"; // add the fileURLToPath and URL

export default defineConfig({
    plugins: [
        vue(), // use the vue plugin
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
    ],
    // add the resolve object
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
        },
    },
});