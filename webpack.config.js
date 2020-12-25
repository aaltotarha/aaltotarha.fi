require('@babel/register')

const LoadablePlugin = require('@loadable/webpack-plugin')
const HtmlRendererWebpackPlugin = require('html-renderer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isProduction = process.env.NODE_ENV === 'production'

const mode = isProduction ? 'production' : 'development'

const config = {
    devServer: {
        contentBase: path.resolve('./static'),
        historyApiFallback: {
            disableDotRule: true,
        },
        hotOnly: true,
        overlay: true,
        port: 3000,
        transportMode: 'ws',
    },

    mode,

    devtool: isProduction ? 'source-map' : 'eval-source-map',

    entry: {
        client: path.resolve('./src/client.jsx'),
    },

    output: {
        chunkFilename: isProduction ? 'build/[name].[chunkhash:8].js' : 'build/[name].js',
        filename: isProduction ? 'build/[name].[chunkhash:8].js' : 'build/[name].js',
        path: path.resolve('./dist'),
        publicPath: '/',
    },

    resolve: {
        extensions: ['.css', '.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            envName: isProduction ? 'webpack_production' : 'webpack_development',
                        },
                    },
                    'linaria/loader',
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            chunkFilename: isProduction ? 'build/[name].[chunkhash:8].css' : 'build/[name].css',
            filename: isProduction ? 'build/[name].[chunkhash:8].css' : 'build/[name].css',
        }),
        new LoadablePlugin({ outputAsset: false }),
        new HtmlRendererWebpackPlugin({
            paths: '/',
            renderer: path.resolve('./src/renderer.jsx'),
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    enforce: true,
                    name: 'vendor',
                    priority: 10,
                    test: /node_modules/,
                },
            },
        },
    },
}

if (isProduction) {
    config.optimization.minimizer = [
        new TerserJSPlugin({
            extractComments: false,
            sourceMap: true,
            terserOptions: {
                compress: {
                    arguments: true,
                    ecma: 2017,
                    module: true,
                    passes: 2,
                    unsafe_arrows: true,
                },
                output: {
                    comments: false,
                    ecma: 2017,
                },
                ecma: 2017,
                module: true,
            },
        }),
        new OptimizeCSSAssetsPlugin({}),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            openAnalyzer: false,
        }),
    ]
}

module.exports = config
