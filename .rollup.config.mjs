import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;
    function toExit() {
        if (server) server.kill(0);
    }
    return {
        async writeBundle() {
            if (server) return;
            const cp = await import('child_process');
            server = cp.spawn('npm', ['run', `start`, '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            });

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
            },
        ],
    ],
    plugins: bundledHelpers ? [] : ['@babel/plugin-transform-runtime'],
});

const builds = [
    {
        external: [/@babel\/runtime/],
        input: './src/index.mjs',
        output: {
            file: './dist/index.mjs',
            format: 'esm',
            sourcemap: true,
        },
        plugins: [resolve(), babel(babelConfig()), commonjs()],
    },
    {
        input: 'src/index.mjs',
        output: {
            file: 'dist/bundle.js',
            format: 'umd',
            inlineDynamicImports: true,
            name: 'ghconsent',
            sourcemap: true,
        },
        plugins: [
            resolve({
                browser: true,
            }),
            babel(babelConfig(true)),
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
    },
];

if (!production) {
    builds.push({
        input: 'test/test-implementation-with-lightbox.js',
        output: {
            file: 'demo/lightbox/demo-bundle.js',
            format: 'iife',
            inlineDynamicImports: true,
            name: 'ghconsentdemo',
            sourcemap: true,
        },
        plugins: [
            resolve({
                browser: true,
            }),
            babel(babelConfig(true)),
            commonjs(),
        ],
    });
    builds.push({
        input: 'test/test-implementation-onetrust.js',
        output: {
            file: 'demo/onetrust/demo-bundle.js',
            format: 'iife',
            inlineDynamicImports: true,
            name: 'ghconsentdemo',
            sourcemap: true,
        },
        plugins: [
            resolve({
                browser: true,
            }),
            babel(babelConfig(true)),
            commonjs(),
        ],
    });
    builds.push({
        input: 'test/test-implementation.js',
        output: {
            file: 'demo/demo-bundle.js',
            format: 'iife',
            inlineDynamicImports: true,
            name: 'ghconsentdemo',
            sourcemap: true,
        },
        plugins: [
            resolve({
                browser: true,
            }),
            babel(babelConfig(true)),
            commonjs(),

            // In dev mode, call `npm run start` once
            // the bundle has been generated
            serve(),

            // Watch the `demo` directory and refresh the
            // browser on changes when not in production
            // !production && livereload(['./demo/', './dist/']),
            livereload({
                watch: './demo/',
                exclusions: ['build/'],
            }),
        ],
        context: 'window',
        watch: {
            clearScreen: false,
        },
    });
}

export default builds;
