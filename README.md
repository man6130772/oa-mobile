## 1. 下载项目
> 首先下载oa-mobile和lg7两个项目文件，放在同一目录底下，文件名如下图

![](http://ojx5001x4.bkt.clouddn.com/oa_teach_01.png)

\* 注意：lg7文件名要与boot.js内的常量保持一致，因为lg7是公共静态资源，所以暂时带上版本号

---

## 2. 运行
> 点击oa-mobile内的start.cmd即可运行服务器，在浏览器输入对应文件地址，如 http://localhost/login/login.html 即可

\* 注意：先下载安装nodejs

---

## 3. 开发规范
> 1. `pages` 文件夹存放HTML页面，新建HTML页面分别存放在 `pages` 文件夹内的已命名文件夹中
> 2. `resource` 文件夹存放的是oa-mobile相关的静态资源，新建页面相关的静态资源以相同名字在js和css内相对应的文件夹中新建，并在app.js中注册。例如：新建页面 `/pages/login/login.html` ，新建js和css `/resource/js/login/login.js` 和 `/resource/js/login/login.css`
> 3. `common` 文件夹存放的是oa-mobile项目的公共js和css
> 4. `boot.js` 是唯一的HTML加载文件，里面配置了异步加载的流程和公共配置的常量
> 5. `app.js` 统一注册js和css，便于生产模式的压缩处理。注册方法参考app.js里面的注释说明
> 6. `router.js` 是模拟history的路由配置，绑定了 `pageInit` 和 `pageReinit` 事件，用于初始化页面对应的js文件

---

[demo](https://man6130772.github.io/oa-mobile/)
