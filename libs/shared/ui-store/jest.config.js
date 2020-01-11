module.exports = {
  name: 'shared-ui-store',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/ui-store',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js']
};
