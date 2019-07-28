module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['common', 'universal', 'package', 'npm', 'circle', 'lint', 'packaging', 'changelog']]
  }
};
