# 双锋对决项目结构说明

## 项目概述
"双锋对决" (Crumble) 是一款使用HTML5+JavaScript编写的2D横版双人格斗类本地网页游戏。

## 项目目录结构

```
双锋对决/
├── index.html                 # 项目主入口页面
├── assets/                    # 静态资源目录
│   ├── images/                # 图片资源
│   │   ├── characters/        # 角色图片
│   │   ├── backgrounds/       # 背景图片
│   │   └── effects/           # 特效图片
│   └── sounds/                # 音频资源
│       ├── bgm/               # 背景音乐
│       ├── effects/           # 音效
│       └── characters/        # 角色音效
├── database/                  # 数据库相关文件
├── docs/                      # 项目文档
├── pages/                     # HTML页面
├── scripts/                   # JavaScript脚本
└── styles/                    # CSS样式文件
```

## 主要文件说明

### 入口文件
- `index.html`: 项目主入口页面，提供游戏各模块的导航

### HTML页面 (pages/)
- `index.html`: 游戏主界面
- `cover.html`: 游戏封面页/启动页
- `login.html`: 用户登录页面
- `leaderboard.html`: 排行榜页面
- `init-database.html`: 数据库初始化页面

### JavaScript脚本 (scripts/)
- `control.js`: 游戏核心逻辑和控制
- `cover.js`: 封面页脚本
- `jquery.min.js`: jQuery库
- `game-data-manager.js`: 游戏数据管理
- `game-integration.js`: 游戏数据集成
- `supabase.js`: Supabase数据库连接

### 样式文件 (styles/)
- `new.css`: 游戏主界面样式
- `cover.css`: 封面页样式

### 静态资源 (assets/)
- `images/`: 图片资源
  - `characters/`: 角色图片（法师、机械师等）
  - `backgrounds/`: 背景图片
  - `effects/`: 特效图片（火焰、护盾等）
- `sounds/`: 音频资源
  - `bgm/`: 背景音乐
  - `effects/`: 音效
  - `characters/`: 角色音效

### 数据库文件 (database/)
- `database_init.sql`: 数据库初始化脚本

### 文档 (docs/)
- `README.md`: 项目说明文档
- `项目文件功能说明.md`: 详细的文件功能说明
- `参考代码.md`: 参考代码文档
- `SUPABASE_SETUP.md`: Supabase数据库设置说明

## 使用说明
1. 直接打开 `index.html` 文件即可进入游戏主页面
2. 从主页面可以导航到各个游戏模块
3. 游戏需要用户登录后才能记录成绩和查看排行榜
4. 首次使用需要运行数据库初始化页面