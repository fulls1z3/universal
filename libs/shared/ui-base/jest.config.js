module.exports = {
  name: 'shared-ui-base',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/ui-base',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
