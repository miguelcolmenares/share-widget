import cleaner from "rollup-plugin-cleaner";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import cleanup from "rollup-plugin-cleanup";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import { name, version } from "./package.json";

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
    input: {
        "share-widget": "./src/js/index.js"
    },
    output: [{
        banner: `/*! ${name} - release: ${version} */`,
        dir: "dist/js/",
        chunkFileNames: "[name]-[hash].js",
        format: "cjs"
    }],
    plugins: [
        cleaner({
            targets: [
                "./dist/js/"
            ]
        }),
        resolve(),
        commonjs(),
        minifyHTML(),
        cleanup({
            comments: "none"
        }),
        babel({
            exclude: "node_modules/**" // only transpile our source code
        })
    ],
    preserveEntrySignatures: false
};

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "development") {
    config.plugins.push(terser({
        module: true,
        warnings: true
    }));
}

export default config;