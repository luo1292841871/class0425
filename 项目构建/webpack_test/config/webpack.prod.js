/*
  webpack的配置文件。 运行配置文件的指令： webpack
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
  mode: 'production', // 模式
  // 入口
  entry: { // 有顺序。必须要lodash在前，因为使用了lodash的方法
    // lodash: './src/js/lodash.js',
    main: './src/js/app.js'
  },
  output: { // 输出
    path: resolve(__dirname, '../build'), // 文件输出目录
    filename: 'js/[name].[contenthash:8]js', // 文件输出名称
    publicPath: '/',  // 公共路径
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
              MiniCssExtractPlugin.loader, // 提取js中的css成单独文件
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [
                    require('autoprefixer')()
                  ]
                }
              },
              'less-loader'  // 将less文件解析成css文件

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
                  publicPath: '/images',  // 决定图片的url路径
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
                "plugins": ["@babel/plugin-syntax-dynamic-import"] // 解决动态import导入js,这时候还会报错，因为不认识eslint，所以在package.json里的"eslintConfig"里面加上"parser": "babel-eslint",太新的语法解析不了，所以用来帮助eslint解析它不知道的语法,还是要下载包，npm i babel-eslint -D
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
              name: '[contenthash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 这个是处理html文件的
    // 构造函数都要new创建实例，这个插件能够创建html文件，自动引入打包生产js/css资源
    // 但是没有html结构，所以要写配置
    new HtmlWebpackPlugin({
      template: './src/index.html', // 以当前文件为模板创建新的HtML(特点：1. 结构和原来一样 2. 会自动引入打包的资源)
      minify: { // 压缩HTML
        collapseWhitespace: true, // 去除空格
        removeComments: true, // 移除注释
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    // new CleanWebpackPlugin()  // 清除指定目录的所有文件,里面不需要传配置，就是会把文件覆盖掉，不会重复出现，就不用手动去删除多余的文件了
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 此插件将CSS提取到单独的文件中
      filename: 'css/[name].[contenthash:8].css', // [name]是占位符，这个name就是入口文件的main
      chunkFilename: 'css/[id].[contenthash:8].css', // 打包后输入的资源都叫chunk，media下面的资源都叫chunk,id就是Chunks下面的0
      ignoreOrder: false, // 忽略警告的，写不写都可以
    }),
    new OptimizeCSSAssetsPlugin({ // 压缩css
      cssProcessorOptions: { // 解决source-map问题
        map: {
          inline: false,
          annotation: true,
        }
      }
    }),
    // new BundleAnalyzerPlugin() // 分析webpack构建后资源的情况
    new webpack.ProvidePlugin({
      _: 'lodash' // 定义全局变量。 不易用太多
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  devtool: 'cheap-module-source-map', // 开发环境的错误提示
  performance: {
    hints: false // 关掉性能提示
  },
  optimization: {
    splitChunks: {
      chunks: 'all' // initial async all，在开发中不会在对下面这些进行设置了，但是参数一定要为all，代表所有代码都要进行处理
      /*minSize: 30000, // 提取成单独模块（单独模块最小为30kb）
     maxSize: 0,  // 提取成单独模块（单独模块最大为0，无限大）
     minChunks: 1, // 只要被引用1次，就会被提取成单独模块
     maxAsyncRequests: 5, // 最大并行加载数量
     maxInitialRequests: 3, // 入口模块最大加载数量
     automaticNameDelimiter: '~', // 打包后模块命名 [chunkname]~[name].js [chunkname]看的是cacheGroups的vendors/default，[name]看的是在哪个入口文件被引入的，所以是main
     automaticNameMaxLength: 30, // 命名最大长度
     name: true, // 允许修改名称
     cacheGroups: { // 对上面打包的chunk进行分组
       vendors: {
         test: /[\\/]node_modules[\\/]/, // 只有 node_modules中的模块会打包在vendors中
         priority: -10, // 优先级，它已经满足了，所以不看default了，也就不执行后面的了
         // filename: '[name].bundle.js'
       },
       default: {
         minChunks: 2, // 只要被引用2次，就会被提取成单独模块
         priority: -20,
         reuseExistingChunk: true // 看打包的文件，为true，如果一个包被打包了就不会再次打包，就会复用。为false，就是每次都会打包成一个新的文件，这样代码就会重复。所以一般都设置为true
       }
     }*/
    },
    runtimeChunk: {  // 将包的chunk信息单独提取出来,做为一个单独的文件存放
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
};