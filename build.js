import { build } from "esbuild";
import { readFile, copyFile } from "fs/promises";
import path from "path";

const pkg = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);

const externals = pkg.dependencies ? Object.keys(pkg.dependencies) : [];

  await build({
    entryPoints: [`lambda/handler.ts`],
    outfile: `dist/handler.js`,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node18",
    sourcemap: false,
    minify: false,
    external: externals
  }).catch(() => process.exit(1));

  await copyFile(`package.json`, `dist/package.json`);
