module.exports = function (api) {
    const env = api.env()
    let plugins = []
    plugins.push(
        [
            'module-resolver',
            {
                root: [ './src' ],
                extensions: [ '.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json' ],
                alias: {
                    tests: [ './tests/' ],
                    '~': [ './src' ],
                    '@components': './src/components',
                    '@screens': './src/screens',
                },
            },
        ],
    )
    if (env !== "development") {
        plugins.push([ 'transform-remove-console' ])
    }
    return {
        presets: [ 'module:@react-native/babel-preset' ],
        plugins,
    }
}
