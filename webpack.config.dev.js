const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
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

      new MiniCssExtractPlugin(),
   ],

   devServer: {
      https: true,
      port: 3000,
      // open: true,
      hot: false,
      liveReload: true,
   },


}
