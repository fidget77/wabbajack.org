// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotsPlugin = require('@tanepiper/robots-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash]-[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'src/assets/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Sections: path.resolve(__dirname, 'src/sections/'),
      Src: path.resolve(__dirname, 'src/'),
      Config: path.resolve(__dirname, 'wabbajack.config.js'),
      Utils: path.resolve(__dirname, 'src/utils/')
    }
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/assets/html/index.html',
      favicon: './src/assets/img/wabbajack.ico'
    }),
    new RobotsPlugin({
      userAgents: [
        {
          name: '*',
          disallow: ['/api/']
        }
      ]
    }),
    new ManifestPlugin({
      seed: {
        short_name: 'Wabbajack',
        name: 'Wabbajack',
        start_url: '.',
        dispaly: 'standalone',
        theme_color: '#121212',
        background_color: '#121212',
        author: 'The Wabbajack Team'
      }
    })
  ],

  devServer: {
    // https: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
