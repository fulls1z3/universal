const path = require('path');

module.exports = {
  '*.{html,js,ts,json,md,css,scss}': files => {
    if (files.length > 0 && files[0] !== '[filename]' && files[0] !== '[file]') {
      const cwd = process.cwd();
      const relativePaths = files.map(f => path.relative(cwd, f));
      return [`prettier-eslint --write ${relativePaths.join(' ')}`, `git add ${relativePaths.join(' ')}`];
    } else {
      return [];
    }
  }
};
