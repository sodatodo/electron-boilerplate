import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import pkg from './package.json';
const { devServerPort } = pkg;

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}
const config: Configuration = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist/lib'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '~': path.resolve(__dirname, 'src')
        },
    },
    module: {
        rules: [
          {
            test: /\.(|ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /^(?!.*\.module\.less$).*\.less$/,
            exclude: /node_modules/,
            use: [{
              loader: 'style-loader',
            }, {
              loader: 'css-loader',
            }, {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            }],
          },
          {
            test: /\.module.less$/,
            exclude: /node_modules/,
            use: [{
              loader: 'style-loader',
            }, {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            }, {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            }],
          },
        ],
      },
      devServer: {
        port: Number(devServerPort),
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'assets/index.html'
        }),
      ],
      optimization: {
          usedExports: true,
      }
}

export default config;
