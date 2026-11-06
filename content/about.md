---
title: "关于"
url: "/about/"
summary: "关于我"
ShowToc: false
ShowReadingTime: false
---

后端工程师，Go。

主要在做 IM / 社交方向的微服务：CloudWeGo Kitex + Hertz，十几个服务放在一个 Go module 里，
Postgres + Redis + Kafka，跑在 K8s 上。日常打交道的是高并发消息链路、跨服务一致性、
多副本下的正确性，以及一个四十多人共用的仓库怎么不互相把代码合丢。

**我关心的问题偏一类**：那些编译过、单测过、`-race` 全绿、code review 也看不出来，
只有跑到线上才炸的东西。比如——

- `-race` 只测单进程内，对「同时有 N 个 pod 在跑」零覆盖；
- cron 的 `SkipIfStillRunning` 只防同进程重叠，两个 pod 各自 skip，照样各跑一遍；
- 后台页面上一句很确定的文案，投递侧 grep 下去零调用方；
- 配置 key 拼错，服务照常 `1/1 Running`，功能静默关闭。

这些抓不住的共同点是：**没有一个自动判据会变红**。所以我的应对是把判据本身做出来——
写成脚本、写成检查清单、写成 Claude Code 的 Skill，让下一次不依赖我还记得。

到目前为止自用的 Skill 有 18 个，连同配套 CLI 约 3.2 万行。涉及公司环境的那部分不能公开，
通用的三个脱敏后开源了：[作品 · Skills](/skills/)。

联系：GitHub [@OddSpilit](https://github.com/OddSpilit)
