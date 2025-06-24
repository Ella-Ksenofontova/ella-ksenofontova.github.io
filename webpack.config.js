const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { htmlWebpackPluginTemplateCustomizer } = require('template-ejs-loader');
const path = require("path");

module.exports = {
  entry: "./index.js",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: htmlWebpackPluginTemplateCustomizer({

        templatePath: 'templates/index.ejs',

        templateEjsLoaderOption: {
          data: {
            lang: "ru"
          }
        }
      })
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "en-version.html",
      template: htmlWebpackPluginTemplateCustomizer({

        templatePath: 'templates/index.ejs',

        templateEjsLoaderOption: {
          data: {
            lang: "en"
          }
        }
      })
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "old-web.html",
      template: htmlWebpackPluginTemplateCustomizer({

        templatePath: 'templates/old-web.ejs',

        templateEjsLoaderOption: {
          data: {
            lang: "ru"
          }
        }
      })
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "old-web-en.html",
      template: htmlWebpackPluginTemplateCustomizer({

        templatePath: 'templates/old-web.ejs',

        templateEjsLoaderOption: {
          data: {
            lang: "en"
          }
        }
      })
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "cute.html",
      template: htmlWebpackPluginTemplateCustomizer({

        templatePath: 'templates/cute.ejs',

        templateEjsLoaderOption: {
          data: {
            lang: "ru"
          }
        }
      })
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "cute-en.html",
      template: htmlWebpackPluginTemplateCustomizer({

        templatePath: 'templates/cute.ejs',

        templateEjsLoaderOption: {
          data: {
            lang: "en"
          }
        }
      })
    }),
    new HtmlWebpackPlugin({
      filename: "404.html",
      template: "./404.html"
    }),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  stats: {
    children: true,
  },
  devServer: {
    port: "8000"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      }
    ],
  },
}