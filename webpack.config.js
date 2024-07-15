import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import process from 'process';

const ROOT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const EnvironmentEnum = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};
const IS_PRODUCTION = process.env.NODE_ENV === EnvironmentEnum.PRODUCTION

export default {
  entry: './index.tsx',
  mode: IS_PRODUCTION
    ? EnvironmentEnum.PRODUCTION
    : EnvironmentEnum.DEVELOPMENT,
  devtool: IS_PRODUCTION ? undefined : 'eval-source-map',
  output: {
    path: path.resolve(ROOT_DIRECTORY, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      src: path.resolve(ROOT_DIRECTORY, 'src'),
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
    new HtmlPlugin({ template: './index.html' }),
  ],
};
