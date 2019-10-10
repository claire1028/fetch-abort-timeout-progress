const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.get('/abort', function (req, res) {
  res.send('hello abort');
});

app.get('/timeout', function(req, res){
  setTimeout(() => {
    res.send('hello, timeout!!');
  }, 3000);
});

app.get('/progress', (req, res) => {
  res.sendFile(__dirname + '/mockFile.js');
})

app.listen(3000, function () {
  console.log('listening on port 3000!\n');
});