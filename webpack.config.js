import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import zlib from 'zlib';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import process from 'process';

const ROOT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const EnvironmentEnum = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};
const IS_PRODUCTION =
  process.env.NODE_ENV?.trim() === EnvironmentEnum.PRODUCTION;

export default {
  entry: {
    main: { import: './index.tsx', dependOn: 'vendor' },
    preload: './src/preload/index.ts',
    vendor: './libs/index.ts',
  },
  // mode: EnvironmentEnum.PRODUCTION,
  mode: IS_PRODUCTION
    ? EnvironmentEnum.PRODUCTION
    : EnvironmentEnum.DEVELOPMENT,
  devtool: IS_PRODUCTION ? undefined : 'source-map',
  output: {
    path: path.resolve(ROOT_DIRECTORY, 'dist'),
    // filename: '[chunkhash].[name].js'
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: ['babel-loader', 'ts-loader'],
        // sideEffects: false,
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          !IS_PRODUCTION
            ? {
                loader: 'style-loader',
                options: {
                  // injectType: 'linkTag',
                },
              }
            : // : 'style-loader',
              MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: !IS_PRODUCTION } },
          { loader: 'sass-loader', options: { sourceMap: !IS_PRODUCTION } },
        ],
        // sideEffects: true
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      src: path.resolve(ROOT_DIRECTORY, 'src'),
    },
  },
  optimization: {
    runtimeChunk: 'single',
    usedExports: true, // tree shaking here
    innerGraph: true, // remove pure function call
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          // minSize: 50000,
          // maxSize: 200000,
          // enforceSizeThreshold: 2000,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(ROOT_DIRECTORY, 'src/assets'),
          to: path.resolve(ROOT_DIRECTORY, 'dist/assets'),
        },
      ],
    }),
    IS_PRODUCTION &&
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
    new HtmlPlugin({ template: './index.html' }),
    new CompressionPlugin({
    // work on production only
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
      },
      threshold: 10 * 1024,
      minRatio: 0.8,
      deleteOriginalAssets: false,
      exclude: /node_modules/
    }),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(ROOT_DIRECTORY, 'dist'),
    },
    compress: IS_PRODUCTION, // Enable gzip compression
    port: 9000,
    hot: !IS_PRODUCTION,
  },
};
