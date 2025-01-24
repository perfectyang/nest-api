<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 在api路径下添加.env文件,里面填写mysql连接信息

```
// 这是mysql的配置 jgl此处是数据库名
DATABASE_URL="mysql://root:12345678@127.0.0.1:3306/jgl"
SECRET="12345678"

// 这是redis的配置
REDIS_URL="redis://127.0.0.1:6379"

要先启动mysql和redis服务

```
