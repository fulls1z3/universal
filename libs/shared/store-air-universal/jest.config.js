module.exports = {
  name: 'shared-store-air-universal',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/store-air-universal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
