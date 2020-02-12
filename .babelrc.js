module.exports = {
  presets: [
    '@babel/typescript',
    [
      '@babel/env',
      {
        targets: {
          node: '10.16.3'
        },
        modules: false,
        loose: true
      }
    ]
  ]
}
