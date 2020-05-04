module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            plugins: [
              "transform-class-properties",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|gif|png|eot|svg|woff2|ttf|woff)$/,
        loader: 'file-loader'
      }
    ]
  },
  output: {
    // path: path.resolve(__dirname, 'my_django_react_app/frontend/static/frontend'),
    publicPath: 'static/frontend/build/'
  },
  performance: {hints: false},
  optimization: {
    namedModules: true,
    namedChunks: true
  },
  // resolve: {alias: {moment$: path.resolve("./node_modules/moment/moment.js")}}

}
