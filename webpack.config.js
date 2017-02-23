module.exports = {
  entry: './app.js',
  output: {
      
      path:"/home/stas/server/www/priem/react",
      filename: 'build.js' },
  resolve:{
    extensions:["",".js",".jsx"]
  },

  module: {
    loaders: [
      {
        test: [/.jsx?$/,/.js?$/],
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      
    ]
  },
  watch:true
};