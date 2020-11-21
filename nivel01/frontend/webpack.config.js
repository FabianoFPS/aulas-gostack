const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: { contentBase: path.resolve(__dirname, 'public') },
  module: {
    rules: [
      {
        test: /\.js$/, // caractere \ escape, caratere . qualquer caractere, \. significa o ponto, caractere $ a expressão termina com .js
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test:/\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test:/.*\.(gif|png|jpe?g)$/i,
        use: {loader: "file-loader"}
      }
    ]
  }
}