import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "path";

const pathSrc = resolve(__dirname, "./src");

export default defineConfig({
    plugins: [react()],
    base: "/Task-Manager-T1-lager/",
    resolve: {
        alias: {
            "@": pathSrc,
            "@pages": resolve(__dirname, "./src/pages"),
            "@entities": resolve(__dirname, "./src/entities"),
            "@features": resolve(__dirname, "./src/features"),
            "@widgets": resolve(__dirname, "./src/widgets"),
            "@shared": resolve(__dirname, "./src/shared"),
        },
    },
});
