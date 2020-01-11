module.exports = {
  name: 'shared-util-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-testing',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js']
};
