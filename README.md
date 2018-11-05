# house-delivery
```
npm run dev // 开发环境启动
npm run build // 打包生产环境代码
```

移动端兼容方案采用 lib-flexible + px2rem, 按照设计稿750标准开发， 详细说明：https://github.com/amfe/article/issues/17
- 直接写px，编译后会直接转化成rem —- 除开下面两种情况，其他长度用这个
- 在px后面添加/*no*/，不会转化px，会原样输出，一般border需用这个
- 在px后面添加/*px*/,会根据dpr的不同，生成三套代码，一般字体需用这个