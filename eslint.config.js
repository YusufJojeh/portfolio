import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Core no-unused-vars cannot see identifiers used as JSX tags (`<motion.div>`),
// so it reports them as unused. This marks them used, like
// eslint-plugin-react's jsx-uses-vars, without adding that dependency.
const jsx = {
  rules: {
    'uses-vars': {
      meta: { type: 'problem', schema: [] },
      create(context) {
        return {
          JSXOpeningElement(node) {
            let name = node.name
            while (name.type === 'JSXMemberExpression') name = name.object
            if (name.type === 'JSXIdentifier' && /^[a-z]/.test(name.name) && !name.name.includes('-')) {
              context.sourceCode.markVariableAsUsed(name.name, node)
            }
          },
        }
      },
    },
  },
}

export default defineConfig([
  globalIgnores(['dist', '.next', 'node_modules', 'test-results', 'playwright-report']),
  {
    files: ['**/*.{js,jsx,mjs}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: { jsx },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'jsx/uses-vars': 'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    // Next.js route files must export these alongside the component.
    files: ['src/app/**/*.{js,jsx}'],
    rules: {
      'react-refresh/only-export-components': [
        'error',
        {
          allowExportNames: [
            'metadata',
            'generateMetadata',
            'generateStaticParams',
            'viewport',
            'generateViewport',
            'dynamic',
            'dynamicParams',
            'revalidate',
          ],
        },
      ],
    },
  },
  {
    // Build scripts, tests and config files run in Node, not the browser.
    files: ['scripts/**', 'tests/**', 'src/app/api/**', '*.config.{js,mjs}', 'next-intl.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
])
