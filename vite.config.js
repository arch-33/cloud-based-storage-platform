import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import unplugin from "@beqa/unplugin-transform-react-slots";

export default defineConfig({
	plugins: [
		laravel({
			input: "resources/js/app.tsx",
			ssr: "resources/js/ssr.tsx",
			refresh: true,
		}),
		unplugin.vite(),
		react(),
	],
});
