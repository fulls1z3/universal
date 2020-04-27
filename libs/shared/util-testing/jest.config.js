module.exports = {
  name: 'shared-util-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-testing',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
