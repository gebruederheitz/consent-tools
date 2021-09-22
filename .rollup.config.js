import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';

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

const babelConfig = (bundledHelpers = false) => ({
    babelrc: false,
    exclude: [/\/core-js\//, 'node_modules/**'],
    sourceMaps: true,
    inputSourceMap: true,
    babelHelpers: bundledHelpers ? 'bundled' : 'runtime',
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
            }
        ],
    ],
    plugins: bundledHelpers ? [] : [
        '@babel/plugin-transform-runtime',
    ],
});


export default [
    {
        external: [
            /@babel\/runtime/,
        ],
        input: './src/index.js',
        output: {
            file: './dist/index.mjs',
            format: 'esm',
        },
        plugins: [
            resolve(),
            babel(babelConfig()),
            commonjs(),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            file: 'dist/bundle.js',
            format: 'iife',
            inlineDynamicImports: true,
            name: 'ghconsent',
        },
        plugins: [
            resolve({
                browser: true,
            }),
            babel(babelConfig(true)),
            commonjs(),

            // Minify production builds
            production && terser({
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
    },
    !production && {
        input: 'test/test-implementation.js',
        output: {
            file: 'demo/demo-bundle.js',
            format: 'iife',
            inlineDynamicImports: true,
            name: 'ghconsentdemo',
        },
        plugins: [
            resolve({
                browser: true,
            }),
            babel(babelConfig(true)),
            commonjs(),

            // In dev mode, call `npm run start` once
            // the bundle has been generated
            !production && serve(),

            // Watch the `demo` directory and refresh the
            // browser on changes when not in production
            !production && livereload(['./demo/', './dist/']),
        ],
        context: 'window',
        watch: {
            clearScreen: false,
        },
    },
];
