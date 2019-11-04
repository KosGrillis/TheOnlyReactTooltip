module.exports = {
  context: __dirname,
  entry: './index.tsx',
  output: {
    path: __dirname + '/build',
    filename: 'example.js'
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        options: {
          declaration: false,
          exclude: [
            "node_modules",
            "dist",
          ]
        }
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    writeToDisk: true,
    compress: true,
    port: 9000
  }
};
