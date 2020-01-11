module.exports = {
  name: 'shared-ui-base',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/ui-base',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js']
};
