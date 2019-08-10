/*
  webpack的配置文件。 运行配置文件的指令： webpack
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 模式
  // entry: './src/js/app.js', // 入口
  /*entry: {
    main: './src/js/app.js',
    index: './src/index.html' // 解决HMR不能热更新HTML文件
  },*/
  entry: ['./src/js/app.js', './src/index.html'],
  output: {
    path: resolve(__dirname, 'build'), // 文件输出目录
    filename: './js/built.js' // 文件输出名称
  },
  module: {
    rules: [ // 里面写loader的配置,一个东西用对象，多个东西用数组
      // 最后又进行了优化处理，加了oneof，又把enforce这块代码已到了上面
      {
        // npm i eslint eslint-loader -D
        // 在package.json添加eslintConfig配置项
        test: /\.js$/,  // 排除node_modules。 node_modules不进行语法检查
        enforce: 'pre', // 优先执行
        // include: [],
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        oneOf: [  // 以下loader只匹配一个
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader'
            ]
          },
          {
            test: /\.(png|jpg|gif)$/,
            use:
              {
                loader: 'url-loader',
                options: { //当有options时候就要写成对象
                  limit: 8192, // 8kb --> 8kb以下的图片会base64处理
                  outputPath: 'images', // 决定文件本地输出路径
                  publicPath: '../build/images',  // 决定图片的url路径
                  name: '[hash:8].[ext]' // 修改文件名称 [hash:8] hash值取8位  [ext] 文件扩展名
                }
              }
          },
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    { // 这些是做的js的兼容性处理的代码，这下js才配置完
                      useBuiltIns: 'usage',   // 按需引入需要使用polyfill,只引入了我们需要的promise的东西，其他的没有引入，这样不会占内存
                      corejs: { version: 3}, // 这个不写，功能也会实现，只是为了解决warn（警告），不然每次运行的时候都会出现警告
                      "targets": { // 指定兼容性处理哪些浏览器,里面可以自己去写
                        "chrome": "58",
                        "ie": "9"
                      }
                    }
                  ]
                ],
                cacheDirectory: true, // 开启babel缓存
              }
            }
          },
          { // 这个是处理html图片的
            test: /\.(html)$/,
            loader: 'html-loader',
          },
          {
            test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
            loader: 'file-loader', // 它做的事相当于复制，粘贴操作，里面的内容不会改，只改了media里面文件的名字
            options: { // 要输出到哪里去
              outputPath: 'media',
              name: '[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 这个是处理html文件的
    // 构造函数都要new创建实例，这个插件能够创建html文件，自动引入打包生产js资源
    // 但是没有html结构，所以要写配置
    new HtmlWebpackPlugin({
      template: './src/index.html' // 以当前文件为模板创建新的HtML(特点：1. 结构和原来一样 2. 会自动引入打包的资源)
    }),
    // new CleanWebpackPlugin()  // 清除指定目录的所有文件,里面不需要传配置，就是会把文件覆盖掉，不会重复出现，就不用手动去删除多余的文件了
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-eval-source-map', // 开发环境的错误提示
  // devtool: 'cheap-module-source-map' // 生产环境的错误提示
  devServer: { // 启动devServer指令：webpack-dev-server   npm i webpack-dev-server -D
    contentBase: resolve(__dirname, 'build'), // 运行项目的目录
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
    port: 3000,
    hot: true  // 开启热模替换功能 HMR
  }
};