module.exports = {
  name: 'shared-store-account',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/store-account',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
