import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "static-dist");

await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, "app"), { recursive: true });
await cp(resolve(root, "public"), resolve(output, "public"), { recursive: true });
await cp(resolve(root, "app/globals.css"), resolve(output, "app/globals.css"));

const html = await readFile(resolve(root, "index.html"), "utf8");
await writeFile(resolve(output, "index.html"), html);

console.log("Static portfolio prepared in static-dist");
