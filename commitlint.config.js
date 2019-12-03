module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['core', 'package', 'npm', 'circle', 'lint', 'packaging', 'changelog']]
  }
};
