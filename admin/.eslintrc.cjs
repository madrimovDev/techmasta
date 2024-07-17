module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended' // Prettier qoidalarini qo'shadi
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true }
		],
		"@typescript-eslint/no-explicit-any": ["off"],
		'prettier/prettier': ['error']
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
}
