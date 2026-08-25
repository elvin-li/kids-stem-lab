# 这个库现在在外置硬盘上

站点正文已经挪到：

`/Volumes/PhotoVault/早教`

本机原来的路径还在，但是符号链接：

`/Users/a0000/Services/早教` → `/Volumes/PhotoVault/早教`

用访达、浏览器或 `file://` 打开时，继续走原来的地址即可。

搬迁当天在本机留了一份备份：`/Users/a0000/Services/早教.local-backup`。确认外置盘这份能打开、门禁能跑之后，可以删掉备份省空间。

外置盘拔掉后，这个符号链接会暂时失效。把 PhotoVault 再插上就会恢复。
