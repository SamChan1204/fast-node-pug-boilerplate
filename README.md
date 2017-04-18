# fast-node-pug-boilerplate
用于快速搭建静态网站的脚手架

#### 安装依赖
```
npm install
```

#### 编译
```
gulp
```

#### 启动
```
npm start
```

#### 目录结构
```
- common
  - helpers
    request.js // 统一发送请求
    response.js // 各种情况的返回体
  tool.js // 一些便捷的方法

- config // 服务器配置

- middlewares // 中间件

- public // 静态文件，如 js/css/img

- routes
  - apis // 异步请求接口路由
  - pages // 站内网页访问路由
  index.js

- views
	- components // 页面公共组件，如 header/footer
	- pages // 各个页面
	layout.pug 根页面

app.js // 后台启动入口
```

