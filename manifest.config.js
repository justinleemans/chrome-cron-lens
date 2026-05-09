import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
	manifest_version: 3,
	name: "Cron Lens",
	version: pkg.version,
	description: "",
	icons: {
		"16": "public/icon-16.png",
        "32": "public/icon-32.png",
        "48": "public/icon-48.png",
        "128": "public/icon-128.png"
	},
	permissions: [
		"storage",
        "activeTab",
        "scripting"
	],
	action: {
		default_popup: 'src/popup/index.html',
		default_icon: {
            "16": "public/icon-16.png",
            "32": "public/icon-32.png",
            "48": "public/icon-48.png",
            "128": "public/icon-128.png"
        }
	},
	content_scripts: [{
		matches: ["<all_urls>"],
		js: ["src/content/content.js"],
		run_at: "document_idle"
	}]
})
