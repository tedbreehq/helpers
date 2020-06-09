import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'src/main.js',
		output: [
			{
				name: 'tedbree-helpers',
				file: pkg.browser,
				format: 'umd'
			},
			{
				name: 'tedbree-helpers',
				file: pkg.minify.browser,
				format: 'umd',
				plugins: [terser()]
			}
		],
		plugins: [
			resolve({browser: true,}), // so Rollup can find node packages
			commonjs(), // so Rollup can convert `ms` to an ES module			
			babel({exclude: 'node_modules/**',}),
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
        input: 'src/main.js',
        plugins: [resolve(), commonjs()],
		external: ['@vue/composition-api', 'date-fns', 'vue'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.minify.main, format: "cjs", plugins: [terser()] },
			{ file: pkg.module, format: 'es' },
			{ file: pkg.minify.module, format: 'es', plugins: [terser()]  }
		]
	}
];