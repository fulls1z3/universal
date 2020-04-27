module.exports = {
  name: 'shared-util-auth',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-auth',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
