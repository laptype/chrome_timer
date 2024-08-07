# 网站计时器 Chrome 扩展
## 简介
网站计时器是一个 Chrome 扩展，用于帮助您跟踪在特定网站上花费的时间。您可以设置要监控的域名和指定的时间阈值。如果在指定网站上花费的时间超过阈值，扩展将每5秒通知您一次。

## 功能
- 跟踪在指定网站上花费的时间。
- 设置要监控的自定义域名。
- 设置通知时间阈值。
- 超过时间阈值后每5秒接收一次通知。

## 安装
1. 下载或克隆此仓库到您的本地计算机。

2. 打开 Chrome 并导航到 chrome://extensions/。

3. 通过点击右上角的开关启用“开发者模式”。

4. 点击“加载已解压的扩展程序”按钮。

5. 选择下载或克隆此仓库的目录。

## 使用方法
1. 设置域名和时间阈值：

- 点击 Chrome 工具栏中的扩展图标。
- 点击“设置”按钮打开选项页面。
- 输入您要跟踪的域名（例如，bilibili.com）。
- 输入时间阈值（秒），默认为30秒。
- 点击“保存”按钮保存设置。

2. 监控时间：

- 设置域名和时间阈值后，扩展将开始跟踪您在指定网站上花费的时间。
- 如果超过指定的时间阈值，扩展将每5秒通知您一次。

## 文件
- manifest.json: 定义扩展配置和权限的清单文件。
- background.js: 跟踪时间和处理通知的后台脚本。
- popup.html: 弹出窗口的 HTML 文件。
- popup.js: 弹出窗口功能的 JavaScript 文件。
- options.html: 选项页面的 HTML 文件。
- options.js: 选项页面功能的 JavaScript 文件。
- icon.png: 扩展的图标文件。

## 代码概述

- manifest.json
定义扩展的配置、权限、后台脚本和选项页面。

- background.js

跟踪在指定域名上花费的时间，并在超过时间阈值时处理通知。

- popup.html & popup.js

显示在指定域名上花费的当前时间，并提供打开选项页面的按钮。

- options.html & options.js

允许用户设置跟踪和通知的域名和时间阈值。

## 示例
1. 将域名设置为 bilibili.com。
2. 将时间阈值设置为30秒。
3. 当您访问 bilibili.com 时，扩展将开始跟踪时间。
4. 如果您在 bilibili.com 上花费超过30秒，扩展将每5秒通知您一次。

License
This project is licensed under the MIT License. See the LICENSE file for details.

