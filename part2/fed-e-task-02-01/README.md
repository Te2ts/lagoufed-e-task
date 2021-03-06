## 简答题

**1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。**

答:
```
对前端来说，工程化使其在项目构建过程更便利，减少繁琐的重复操作，提高效率。

项目上线前，为了减少文件大小或对相关文件进行必要的编译或处理，需要对js、css、html、图片、字体等文件进行压缩和处理。
手动的进行这些操作处理非常耗时，且可能遗漏。可以利用工程化工具，例如gulp的src('**/*.scss').pipe(sass())进行sass编译、
pipe(imagemin())进行图片无损压缩、使用del模块进行文件整理和清除等等，利用相关gulp模块来自动化完成这些操作。

在开发过程中，为了能够使用es6最新特性或sass等有利于开发效率的功能，
可以使用例如gulp的watch功能，进行文件监听，自动触发对应的任务来自动编译，以此达到在开发过程也能使用这些便利的特性。
```

　

**2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？**

答:
```
脚手架可以根据架构设计，生成逻辑清晰，易于管理的项目基础目录和文件。
初学者开箱即用，熟练的开发者还可以往上拓展项目结构和功能，提升项目完整性。
多人开发更便捷，因为都约束同一个项目规范，开发协作者上手更快。
```

　

## 编程题

**1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具**

答：
```js
首先npm init初始化项目，在package.json中添加「bin」地址，指向脚手架入口文件，npm link软连接，以便全局使用改脚手架命令
入口文件开头需要添加「#!/usr/bin/env node」用于linux系统识别使用node来运行该文件，然后就可以进行脚手架程序的开发了

脚手架&命令行开发相关库
inquirer：命令行交互
chalk：彩色打印输出
ora：加载图标展示
commander：处理命令行参数
```

```js
我完成的一个目前支持用于linux或windows的处理和查找对应端口占用程序的命令行工具
目录：part2/fed-e-task-02-01/my-cli

使用方法：
cd my-cli
npm i // 装对应包
npm link // 软链接至全局
my-cli -h // 查看相关命令使用方法
my-cli <port> | my-cli -k <port> // 查找并杀死对应端口占用的程序
my-cli -s <port> // 查找并返回相关端口占用的程序信息
```

　

**2、尝试使用 Gulp 完成项目的自动化构建**  ( **[先要作的事情](https://gitee.com/lagoufed/fed-e-questions/blob/master/part2/%E4%B8%8B%E8%BD%BD%E5%8C%85%E6%98%AF%E5%87%BA%E9%94%99%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E5%BC%8F.md)** )

(html,css,等素材已经放到code/pages-boilerplate目录)

　

　

## 说明：

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 说明文档和代码统一提交至作业仓库。