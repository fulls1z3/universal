module.exports = {
  name: 'shared-util-http-interceptor',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/util-http-interceptor',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
