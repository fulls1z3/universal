module.exports = {
  name: 'shared-util-i18n',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-i18n',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
