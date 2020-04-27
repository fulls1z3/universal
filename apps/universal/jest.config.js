module.exports = {
  name: 'universal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/universal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
