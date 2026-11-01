import tsParser from '@typescript-eslint/parser';
export default [{ignores:['dist/**','node_modules/**','design/references/**']},{files:['**/*.{ts,tsx}'],languageOptions:{ecmaVersion:'latest',sourceType:'module',parser:tsParser},rules:{'no-debugger':'error'}}];
