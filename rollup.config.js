import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import jscc from 'rollup-plugin-jscc';

export default [
	// for wechat
	{
		input: 'lib/axios.js',
		output: {
			name: 'axiosAllInOne',
			file: pkg.wechat,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			jscc({
				values: {
					_WECHAT: 1
				},
			}),
		]
	},

	// for alipay
	{
		input: 'lib/axios.js',
		output: {
			name: 'axiosAllInOne',
			file: pkg.alipay,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			jscc({
				values: {
					_ALIPAY: 1
				},
			}),
		]
	},

	// for toutiao
	{
		input: 'lib/axios.js',
		output: {
			name: 'axiosAllInOne',
			file: pkg.tt,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			jscc({
				values: {
					_TT: 1
				},
			}),
		]
	},

	// for baidu
	{
		input: 'lib/axios.js',
		output: {
			name: 'axiosAllInOne',
			file: pkg.baidu,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			jscc({
				values: {
					_BAIDU: 1
				},
			}),
		]
	},

	// for weex
	{
		input: 'lib/axios.js',
		output: {
			name: 'axiosAllInOne',
			file: pkg.weex,
			format: 'umd'
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			jscc({
				values: {
					_WEEX: 1
				},
			}),
		]
	},

	// for quickapp
	{
		input: 'lib/axios.js',
		external: ['@system.fetch'],
		output: {
			name: 'axiosAllInOne',
			file: pkg.quickapp,
			format: 'umd',
			globals: {
				'@system.fetch': 'fetch'
			}
		},
		plugins: [
			resolve(),
			commonjs(),
			json(),
			jscc({
				values: {
					_QUICKAPP: 1
				},
			}),
		]
	}
];