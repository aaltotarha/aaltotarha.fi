const presets = ['@babel/preset-env', '@babel/preset-react', 'linaria/babel']

const plugins = ['@babel/plugin-syntax-dynamic-import', '@loadable/babel-plugin']

module.exports = (api) => {
    const env = api.env()

    if (env.startsWith('node')) {
        plugins.push('babel-plugin-dynamic-import-node')
    }

    return { presets, plugins }
}
