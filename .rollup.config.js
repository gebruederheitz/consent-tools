import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import svelte from 'rollup-plugin-svelte';
import preprocess, { scss } from 'svelte-preprocess';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;
    function toExit() {
        if (server) server.kill(0);
    }
    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn(
                'npm',
                ['run', `start`, '--', '--dev'],
                {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true,
                }
            );

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        },
    };
}

const babelConfig = (bundledHelpers = false, typescript = true) => {
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
            },
        ],
    ];

    let extensions = ['js', 'mjs'];

    if (typescript) {
        presets.push('@babel/preset-typescript');
        extensions.push('ts', 'mts');
    }

    return {
        babelrc: false,
        exclude: [/\/core-js\//, 'node_modules/**'],
        sourceMaps: true,
        inputSourceMap: true,
        babelHelpers: bundledHelpers ? 'bundled' : 'runtime',
        presets,
        plugins: bundledHelpers ? [] : ['@babel/plugin-transform-runtime'],
        extensions,
    };
};

const esBuildCommonOutputOptions = {
    format: 'esm',
    sourcemap: true,
    inlineDynamicImports: true,
};

const esBuildCommonOptions = {
    external: [/@babel\/runtime/],
    plugins: [
        resolve({
            extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.mts'],
        }),
        babel(babelConfig(false, true)),
        commonjs(),
    ],
};

const umdBuildCommonOptions = {
    plugins: [
        resolve({
            browser: true,
            extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.mts'],
        }),
        babel(babelConfig(true, true)),
        commonjs(),

        // Minify production builds
        production &&
            terser({
                mangle: true,
                compress: true,
                output: {
                    comments: function (node, comment) {
                        var text = comment.value;
                        var type = comment.type;
                        if (type == 'comment2') {
                            // multiline comment
                            return (
                                /@preserve|@license|@cc_on/i.test(text) ||
                                /^!/.test(text)
                            );
                        }
                    },
                },
            }),
    ],
};

const umdBuildCommonOutputOptions = {
    format: 'umd',
    inlineDynamicImports: true,
    name: 'ghconsent',
    sourcemap: true,
};

const builds = [
    // Library main ES module build – Toolkit & Generic components
    {
        input: './src/index.ts',
        output: {
            file: './dist/index.mjs',
            ...esBuildCommonOutputOptions,
        },
        ...esBuildCommonOptions,
    },
    // Toolkit ES module build
    {
        input: './src/bundle/toolkit.ts',
        output: {
            file: './dist/toolkit.mjs',
            ...esBuildCommonOutputOptions,
        },
        ...esBuildCommonOptions,
    },
    // UMD / CommonJS distribution bundle – Toolkit only
    {
        input: 'src/bundle/toolkit.ts',
        output: {
            file: 'dist/toolkit.umd.js',
            ...umdBuildCommonOutputOptions,
        },
        ...umdBuildCommonOptions,
    },
    // UMD / CommonJS distribution bundle – Autoinitializer
    {
        input: 'src/bundle/ct-autoinit.ts',
        output: {
            file: 'dist/autoinit.umd.js',
            ...umdBuildCommonOutputOptions,
        },
        ...umdBuildCommonOptions,
    },
    // UMD / CommonJS distribution Usercentrics bundle
    {
        input: 'src/bundle/provider-usercentrics.ts',
        output: {
            file: 'dist/usercentrics.umd.js',
            ...umdBuildCommonOutputOptions,
        },
        ...umdBuildCommonOptions,
    },
    // UMD / CommonJS distribution OneTrust bundle
    {
        input: 'src/bundle/provider-onetrust.ts',
        output: {
            file: 'dist/onetrust.umd.js',
            ...umdBuildCommonOutputOptions,
        },
        ...umdBuildCommonOptions,
    },
    // UMD / CommonJS distribution ConsentTools bundle
    {
        input: 'src/bundle/provider-consent-tools.ts',
        output: {
            file: 'dist/consent-tools.umd.js',
            ...umdBuildCommonOutputOptions,
        },
        ...umdBuildCommonOptions,
    },
];

// Provider ES module builds
const providers = {
    onetrust: './src/cmp/provider/onetrust-provider.ts',
    usercentrics: './src/cmp/provider/usercentrics-provider.ts',
    'consent-tools': './src/cmp/provider/consent-tools/consent-tools-provider.ts',
};

Object.keys(providers).forEach((name) => {
    builds.push({
        input: providers[name],
        output: {
            file: `./dist/provider/${name}.mjs`,
            ...esBuildCommonOutputOptions,
        },
        ...esBuildCommonOptions,
    });
});

// Default modal ES module build
builds.push({
    input: './src/cmp/provider/consent-tools/Modal.svelte',
    output: {
        file: './dist/modal.mjs',
        ...esBuildCommonOutputOptions,
    },
    external: [/@babel\/runtime/],
    plugins: [
        svelte({
            preprocess: preprocess({
                babel: {
                    targets: {
                        esmodules: true,
                    },
                    presets: ['@babel/preset-typescript'],
                    sourceMaps: true,
                    inputSourceMap: true,
                },
                scss: scss(),
            }),
        }),
        css({ output: 'consent-tools-modal.css' }),
        resolve({
            extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.mts'],
        }),
        babel(babelConfig(false, true)),
        commonjs(),
    ],
});

if (!production) {
    // builds.push({
    //         input: 'test/test-implementation-with-lightbox.js',
    //         output: {
    //             file: 'demo/lightbox/demo-bundle.js',
    //             format: 'iife',
    //             inlineDynamicImports: true,
    //             name: 'ghconsentdemo',
    //             sourcemap: true,
    //         },
    //         plugins: [
    //             resolve({
    //                 browser: true,
    //             }),
    //             babel(babelConfig(true, false)),
    //             commonjs(),
    //         ],
    //     });
    //     builds.push({
    //         input: 'test/test-implementation-onetrust.js',
    //         output: {
    //             file: 'demo/onetrust/demo-bundle.js',
    //             format: 'iife',
    //             inlineDynamicImports: true,
    //             name: 'ghconsentdemo',
    //             sourcemap: true,
    //         },
    //         plugins: [
    //             resolve({
    //                 browser: true,
    //             }),
    //             babel(babelConfig(true, false)),
    //             commonjs(),
    //         ],
    //     });
    builds.push({
        input: 'test/test-implementation.js',
        output: {
            file: 'demo-legacy/demo-bundle.js',
            format: 'iife',
            inlineDynamicImports: true,
            name: 'ghconsentdemo',
            sourcemap: true,
        },
        plugins: [
            css({ output: 'consent-tools-modal.css' }),
            resolve({
                browser: true,
            }),
            babel(babelConfig(true, false)),
            commonjs(),

            // In dev mode, call `npm run start` once
            // the bundle has been generated
            serve(),

            // Watch the `demo` directory and refresh the
            // browser on changes when not in production
            // !production && livereload(['./demo/', './dist/']),
            livereload({
                watch: './demo-legacy/',
                exclusions: ['./demo-legacy/build/'],
            }),
        ],
        context: 'window',
        watch: {
            clearScreen: false,
        },
    });
}

export default builds;
