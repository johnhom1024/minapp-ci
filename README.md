# wxmp-cli

> 基于`miniapp-cli`二次封装的CLI，可在命令行上传微信小程序代码到微信公众平台。

## 安装

进入在微信小程序的项目中，安装`wxmp-cli`：

```
npm install wxmp-cli
```

## 配置

在项目的根目录下新增`.env`文件，加上以下的key：

```
# 微信小程序的appid
appid=********
# 上传私钥文件，在项目中的相对路径
privateKeyPath=./privateKey/privateKey.wx*******.key
```

## 使用

通过这个命令可以查看帮助：

```shell
wxmp-cli
```

### upload

在我们打包了微信小程序之后，在项目的命令行中运行`wxmp-cli upload`：

```shell
wxmp-cli upload
```

`upload`命令会在根目录上找到`project.config.json`文件，然后上传`miniprogramRoot`字段里对应的相对目录文件到微信公众平台中。

例如，在`project.config.json`文件内：

```json
{
  "miniprogramRoot": "./dist/build/mp-weixin",
}
```

则该命令会上传项目中`./dist/build/mp-wexin`目录中的文件。


## 疑难解答

Q: 上传过程中抛出异常：`errCode: -10008, errMsg: invalid ip: 120.79.95.110, ...`

A: 需要检查微信公共平台的开发配置中，上传白名单的配置。

