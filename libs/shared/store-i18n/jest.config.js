module.exports = {
  name: 'shared-store-i18n',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/store-i18n',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
