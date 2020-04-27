module.exports = {
  name: 'shared-ui-material',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/ui-material',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
