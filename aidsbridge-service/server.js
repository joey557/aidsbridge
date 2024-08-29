// import express from "express";
// import dotenv from "dotenv";
// import initialize from "./app/app.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT;
// initialize(app);

// app.listen(port, () => console.log(`Server running on port ${port}`));

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import initialize from "./app/app.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// 初始化应用的其他中间件和路由
initialize(app);

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 提供前端静态资源
app.use(express.static(path.join(__dirname, "../aidsbridge-app/dev-dist"))); // 根据实际情况修改路径

// 如果访问的路由不匹配任何静态文件，则返回 index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../aidsbridge-app/index.html")); // 指向 aidsbridge-app 文件夹中的 index.html
});

// 启动服务器
app.listen(port, () => console.log(`Server running on port ${port}`));
