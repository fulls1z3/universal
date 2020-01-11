module.exports = {
  name: 'shared-ui-material',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/ui-material',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js']
};
