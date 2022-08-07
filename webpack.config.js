const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const terserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
   mode: 'production',
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js'
   },

   resolve: {
      extensions: ['.js'],
   },

   module: {
      rules: [
         {
            test: /\.svg/,
            type: "asset/resource",
            generator: {
               filename: "assets/icons/[hash][ext][query]"
            }
          },
         {
            test: /\.js/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'
            }
         },
         {
            test: /\.css|.sass/,
            use: [
               MiniCssExtractPlugin.loader, 
               {
                  loader: 'css-loader'
               }, 
               {
                  loader:'sass-loader',
               },
               
            ]

         }
      ]
   },

   plugins: [
      new HtmlWebpackPlugin({
         inject: true,
         template: './public/index.html',
         filename: './index.html'
      }),

      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css'
      }),

      new CleanWebpackPlugin(),
   ],

   optimization: {
      minimize: true,
      minimizer: [
         new cssMinimizerPlugin(),
         new terserPlugin()
      ]
   }

}
