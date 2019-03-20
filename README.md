# 一个 VueUI 自用组件

[![Build Status](https://travis-ci.org/BrendanZhang/BrendanUICombination.svg?branch=master)](https://travis-ci.org/BrendanZhang/BrendanUICombination)

## 介绍

这是我在学习 vue 的过程中做的 UI 框架，希望能够帮到你

## 开始使用

### 添加 CSS 样式

使用本框架前，请在 CSS 中开启 border-box

IE 8 及以上浏览器都支持该样式

```css
*,
*::before,
*::after {
	box-sizing: border-box;
}
```

你还需要设置默认颜色等变量(后续将改为 Sass 变量)
IE 15 及以上浏览器都支持此样式

```css
html {
	--button-height: 32px;
	--font-size: 16px;
	--button-bg: white;
	--button-active-bg: #eee;
	--border-radius: 2px;
	--color: #333;
	--border-color: #999;
	--border-color-hover: #666;
}
```

### 安装

`npm i -S zealot-ui-primarydemo`

### 引入

```js
import { Button, ButtonGroup, Icon } from "zealot-ui-primarydemo"
import "zealot-ui-primarydemo/dist/index.css"

export default {
	name: "app",
	components: {
		HelloWorld,
		"g-button": Button,
		"g-icon": Icon
	}
}
```

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码
