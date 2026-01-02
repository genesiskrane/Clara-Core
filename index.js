const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server, path: "/data" });

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
wss.on("connection", (ws, req) => {
  console.log("WS client connected:", req.socket.remoteAddress);

  ws.on("message", async (raw) => {
    try {
      const { action, payload } = JSON.parse(raw.toString());

      if (action === "getGlobalFiles") {
        const files = await core.getGlobalFiles(payload.type);

        ws.send(
          JSON.stringify({
            action,
            data: files,
          })
        );
      } else if (action === "getProjectFiles") {
        const files = await core.getProjectFiles(payload.project, payload.type);

        ws.send(
          JSON.stringify({
            action,
            data: files,
          })
        );
      } else {
        ws.send(
          JSON.stringify({
            error: "Unknown action",
          })
        );
      }
    } catch (err) {
      ws.send(
        JSON.stringify({
          error: err.message,
        })
      );
    }
  });

  ws.on("close", () => {
    console.log("WS client disconnected");
  });
});

(async () => {
  await core.init();
  server.listen(PORT, () => console.log("Clara Core Running on port " + PORT));
})();
