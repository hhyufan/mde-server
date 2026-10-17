# MDE Server · 云同步服务端

MDE 的云同步服务端，基于 NestJS 10 + MongoDB 8，提供账号体系与增量文档同步。**同步是可选的**：桌面端默认只写本地文件，登录并绑定后文档与设置才进入云端。

配套项目：[hhyufan/mde-tauri](https://github.com/hhyufan/mde-tauri)（桌面端） · 官网：[miaogu.xyz](https://www.miaogu.xyz/)（本服务的首页即官网，见 [src/site](src/site)）

## 功能

- **账号体系**：邮箱注册 / 登录、bcrypt 密码散列、JWT 访问令牌 + 一次性旋转 refresh token、限流（@nestjs/throttler）与 helmet 安全头
- **增量同步协议**：`fileId + rev/baseRev + mutation queue`，单文件 PUT 拉取/推送、游标增量变更、墓碑删除、SHA-256 完整性校验
- **绑定与冲突**：设备路径绑定、按版本号冲突检测（冲突由客户端双栏展示，服务端不在后台替你覆盖）
- **设置同步**：编辑器配置快照的云端读取 / 更新
- **部署形态**：本地 Node、Vercel Serverless 单函数、Docker 三种方式；健康检查端点 `GET /health`
- **官网首页**：`GET /` 返回交互式编辑器演示站点（中英双语、深浅主题）

## 快速开始

### 本地开发

```bash
npm install
cp .env.example .env   # 配置 MONGODB_URI 与 JWT_SECRET
npm run start:dev      # 默认端口 3200
```

### Docker

```bash
docker build -t mde-server .
docker run -p 3200:3200 --env-file .env mde-server
```

### Vercel

仓库已内置单 Serverless 函数部署（`src/main.ts` 同时导出 `handler`），数据库使用 MongoDB Atlas。详见 [VERCEL.md](VERCEL.md)。

## 环境变量

| 变量 | 必填 | 说明 |
| --- | --- | --- |
| `MONGODB_URI` | ✅ | MongoDB 连接串（Vercel 部署需 Atlas 等公网可达集群） |
| `JWT_SECRET` | ✅ | JWT 签名密钥，使用足够长的随机串 |
| `JWT_EXPIRES_IN` | 可选 | 访问令牌有效期，默认 `15m` |
| `CORS_ORIGINS` | 可选 | 允许的跨域来源，默认官网域名 |
| `PORT` | 可选 | 本地监听端口，默认 `3200`（Vercel 忽略） |
| `MDE_SERVER_VERSION` | 可选 | 健康检查返回的版本号 |

## API 概览

所有 `/sync` 路由均要求 JWT 鉴权，并按路由限流。

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `POST` | `/auth/register` | 注册并返回访问令牌 |
| `POST` | `/auth/login` | 邮箱密码登录 |
| `POST` | `/auth/refresh` | 旋转 refresh token 换取新令牌 |
| `POST` | `/auth/logout` | 注销 refresh token |
| `GET` | `/auth/profile` | 当前用户信息 |
| `GET` | `/sync/manifest` | 云端文件清单（不含正文） |
| `GET` | `/sync/changes` | 按游标增量拉取变更 |
| `PUT` | `/sync/file/:fileId` | 单文件推送（按版本号） |
| `GET` | `/sync/file/:fileId` | 单文件拉取 |
| `DELETE` | `/sync/file/:fileId` | 墓碑删除 |
| `POST` | `/sync/bindings/:fileId` | 设备与本地路径绑定 |
| `GET` | `/sync/config` | 读取设置同步快照 |
| `PUT` | `/sync/config` | 更新设置同步快照 |
| `GET` | `/health` | 健康检查（含数据库状态） |

## 测试与 CI

```bash
npm test          # Jest + supertest
npm run build
```

推送与 PR 会触发 [ci.yml](.github/workflows/ci.yml)（test + build）。

## 许可证

[MIT](LICENSE) © 2026 hhyufan
