module.exports = {
  name: 'shared-store',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/store',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js']
};
