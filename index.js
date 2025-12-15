const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const core = require("./core");
const middlewares = require("./middlewares");
const router = require("./router");
const { home } = require("./controller");


app.set("trust proxy", true);

// Global middlewares
app.use(middlewares);

// API routes first
app.use("/api", router);

// SPA fallback — catch all remaining routes
app.use((req, res, next) => {
  home(req, res, next);
});

const PORT = process.env.PORT || 3000;

// WebSocket connection
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg);
    ws.send(`Echo: ${msg}`);
  });

  ws.on("close", () => console.log("Client disconnected"));
});


(async () => {
  await core.init();
  server.listen(PORT, () => console.log("Clara Core Running on port " + PORT));
})();

