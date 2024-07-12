import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { EnvironmentEnum, IS_PRODUCTION, ROOT_DIRECTORY } from './config.js';
import CopyPlugin from 'copy-webpack-plugin';

export default {
  entry: './index.tsx',
  mode: IS_PRODUCTION
    ? EnvironmentEnum.PRODUCTION
    : EnvironmentEnum.DEVELOPMENT,
  devtool: IS_PRODUCTION ? 'none' : 'source-map',
  output: {
    path: path.resolve(ROOT_DIRECTORY, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
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
    new HtmlPlugin({ template: './index.html' }),
  ],
};
