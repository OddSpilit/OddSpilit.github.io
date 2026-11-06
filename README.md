# 温乔丰 · 后端工程笔记

Hugo + PaperMod，GitHub Actions 自动部署到 GitHub Pages。

```bash
hugo server -D          # 本地预览 http://localhost:1313
hugo new posts/xxx.md   # 新文章
```

推 `main` 即自动构建部署。首次需在仓库 Settings → Pages → Source 选 **GitHub Actions**。
