const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server, path: "/data" });

const core = require("./core");
const fn = require("./functions");
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
      const parsed = JSON.parse(raw.toString());
      const { action, payload } = parsed;

      // Validate that the action exists in fn
      if (!action || typeof fn[action] !== "function") {
        ws.send(
          JSON.stringify({
            error: "Unknown or invalid action",
          })
        );
        return;
      }

      // Call the function and send result
      const files = await fn[action](payload?.type);

      ws.send(
        JSON.stringify({
          action,
          data: files,
        })
      );
    } catch (err) {
      console.error("WS message error:", err);
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

// Initialize core and start server
(async () => {
  try {
    await core.init();
    server.listen(PORT, () =>
      console.log(`Clara Core Running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
