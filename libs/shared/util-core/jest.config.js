module.exports = {
  name: 'shared-util-core',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-core',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
