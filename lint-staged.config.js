module.exports = {
  '**/*.js': 'eslint --config .eslintrc.json --fix',
  '**/*.json': 'prettier --write',
  '**/*.md': 'prettier --write',
  '**/*.ts?(x)': [
    () => 'tsc -p tsconfig.json --noEmit',
    'eslint --config .eslintrc.json --fix',
  ],
}
