import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

const SOURCES = [{ dir: "content/post/_assets", prefix: "assets" }];

const MIME_TYPES: Record<string, string> = {
	".gif": "image/gif",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".webp": "image/webp",
	".svg": "image/svg+xml",
	".pdf": "application/pdf",
	".json": "application/json",
	".txt": "text/plain; charset=utf-8",
	".log": "text/plain; charset=utf-8",
	".csv": "text/csv; charset=utf-8",
};

/**
 * Serves post attachments (logs, archives, ...) from `content/post/_assets/` at `/assets/*`.
 * Dev: middleware. Build: copied into the output directory.
 * Markdown only handles images via `_assets`, so anything else needs this.
 */
export function postFiles(): AstroIntegration {
	let root = "";
	let base = "/";

	return {
		name: "post-files",
		hooks: {
			"astro:config:setup": ({ config, updateConfig }) => {
				root = fileURLToPath(config.root);
				base = config.base.endsWith("/") ? config.base : `${config.base}/`;
				updateConfig({
					vite: {
						plugins: [
							{
								name: "post-files-dev",
								configureServer(server) {
									server.middlewares.use((req, res, next) => {
										const url = decodeURIComponent((req.url ?? "").split("?")[0]);
										for (const { dir, prefix } of SOURCES) {
											const urlPrefix = `${base}${prefix}/`;
											if (!url.startsWith(urlPrefix)) continue;
											const srcRoot = path.resolve(root, dir);
											const file = path.resolve(srcRoot, url.slice(urlPrefix.length));
											if (!file.startsWith(srcRoot + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
												continue;
											}
											res.setHeader("Content-Type", MIME_TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream");
											fs.createReadStream(file).pipe(res);
											return;
										}
										next();
									});
								},
							},
						],
					},
				});
			},
			"astro:build:done": ({ dir }) => {
				for (const { dir: srcDir, prefix } of SOURCES) {
					const src = path.resolve(root, srcDir);
					if (!fs.existsSync(src)) continue;
					fs.cpSync(src, path.join(fileURLToPath(dir), prefix), { recursive: true });
				}
			},
		},
	};
}
