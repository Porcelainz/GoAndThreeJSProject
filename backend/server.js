const express = require("express");
const { PrismaClient } = require("@prisma/client");
const WebSocket = require("ws");

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

// 解析 JSON
app.use(express.json());

// 取得所有 3D 物件
app.get("/api/objects", async (req, res) => {
  const objects = await prisma.object.findMany();
  res.json(objects);
});

// 取得所有 Person
app.get("/api/persons", async (req, res) => {
  const persons = await prisma.person.findMany();
  res.json(persons);
});

// WebSocket 伺服器
const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("WebSocket connected");
  ws.on("message", (message) => {
    console.log("Received:", message.toString());
  });
  ws.on("close", () => console.log("WebSocket disconnected"));
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
