module.exports = {
  name: 'shared-util-store',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-store',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
