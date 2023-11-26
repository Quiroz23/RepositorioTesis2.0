module: {
  rules: [
    // Otras reglas aquí...
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' },
    },
  ],
}
