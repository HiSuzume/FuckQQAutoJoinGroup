### 去你大爷的自动同意入群

无法禁止好友邀请入群，对于很多人来说是很大的困扰。

因此我写了这个脚本，自动退群。

**脚本依赖 icqq 以及 Node.js ，且不能保证协议能永久使用**

#### 使用

安装 Node.js

安装 icqq(要cd到 fuck_qq_auto_group.js 所在目录)

```shell
npm install icqq
```

下载本仓库里的 fuck_qq_auto_group.js 文件，然后在你的终端执行下面的命令：

```shell
node fuck_qq_auto_group 你的QQ号 你的QQ账号密码
```

默认使用手表协议，若无法登录，请尝试更换协议(见 oicq 文档的 api 项，底部列出了常用协议，但大多被和谐了)

#### 已知问题

由于依赖于检测 入群事件 ，因此会导致建群/自主入群失败(表现：入群后自动退群)。

若介意者，请勿使用此脚本。
