# cssformatcompact README
css样式格式化，单行和多行：
按样式名单行和多行模式

CSS style formatting, single line and multi line:
List rows and multiline patterns by style

![Features](https://raw.githubusercontent.com/zhidong10/cssformatcompact/master/img/icon.jpg)

## Features

可以实现css的两种格式化，一种是每个样式名的名称和属性格式化到一行，另外一种是每个样式名和属性单独格式化到一行，并且保留注释
Two formats of CSS can be implemented, one is to format the name and attribute of each style name to one line, the other is to format each style name and attribute to one line separately.And keep comments.
### 合并型风格  Combined style
```css
.tabs { position: absolute; top: 500px; left: 0; width: 640px; height: 303px; background: url(../img/p1_02.png); z-index: 10; }
.tabs .num { display: block; position: absolute; top: 10px; left: 10px; width: 100px; height: 112px; }
.tabs .num1 { top: 178px; left: 88px; }
.tabs .num2 { top: 64px; left: 144px; }
.tabs .num3 { top: 6px; left: 274px; }
.tabs .num4 { top: 67px; left: 404px; }
.tabs .num5 { top: 179px; left: 467px; }
.tabs .active { background: url(../img/p1_02.png); }
.tabs .active.num1 { background-position: -88px -481px; }
.tabs .active.num2 { background-position: -144px -367px; }
.tabs .active.num3 { background-position: -274px -309px; }
.tabs .active.num4 { background-position: -404px -370px; }
.tabs .active.num5 { background-position: -467px -482px; }
.swbox { position: absolute; top: 90px; left: 0px; width: 640px; height: 561px; }
```
### 展开型风格 Unfolding style
```css
.tabs {
    position: absolute;
    top: 500px;
    left: 0;
    width: 640px;
    height: 303px;
    background: url(../img/p1_02.png);
    z-index: 10;
}

.tabs .num {
	display: block;
	position: absolute;
	top: 10px;
	left: 10px;
	width: 100px;
	height: 112px;
}

.tabs .num1 {
	top: 178px;
	left: 88px;
}

.tabs .num2 {
	top: 64px;
	left: 144px;
}

.tabs .num3 {
	top: 6px;
	left: 274px;
}

.tabs .num4 {
	top: 67px;
	left: 404px;
}

.tabs .num5 {
	top: 179px;
	left: 467px;
}

.tabs .active {
	background: url(../img/p1_02.png);
}

.tabs .active.num1 {
	background-position: -88px -481px;
}

.tabs .active.num2 {
	background-position: -144px -367px;
}

.tabs .active.num3 {
	background-position: -274px -309px;
}

.tabs .active.num4 {
	background-position: -404px -370px;
}

.tabs .active.num5 {
	background-position: -467px -482px;
}

.swbox {
	position: absolute;
	top: 90px;
	left: 0px;
	width: 640px;
	height: 561px;
}
```

### 右键菜单 Right click menu
![Features](https://raw.githubusercontent.com/zhidong10/cssformatcompact/master/img/exp3.png)
> Tip: 支持选中后再格式化哦 Support formatting after selecting




## Release Notes 发行说明
头一次做vscode插件，欢迎反馈
Do vscode plug-in for the first time, welcome to feedback
项目地址：
[https://github.com/zhidong10/cssformatcompact](https://github.com/zhidong10/cssformatcompact)

## 项目版本
### 0.0.1
第一版

### 0.0.2
冒号属性后面增加空格

### 0.0.3
修改描述信息

### 0.0.4
修改描述信息和标题

-----------------------------------------------------------------------------------------------------------

## 其他 Ohter
没有做快捷键的设置，容易跟其他快捷键搞冲突，
想使用快捷键，可以使用vscode自带的`Ctrl+Shift+p`，搜索css一般可以看到提示命令

There is no shortcut key setting, which is easy to conflict with other shortcut keys,
If you want to use shortcut keys, you can use the 'Ctrl + Shift + p' provided by vscode. You can usually see prompt commands when searching CSS

### For more information
my github:
[https://github.com/zhidong10](https://github.com/zhidong10)
