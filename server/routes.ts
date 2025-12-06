import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Proxy endpoint to avoid CORS preflight issues with external API
  app.post("/api/calcular-gas", async (req, res) => {
    try {
      const response = await fetch("https://api-gases-nobles.onrender.com/api/calcular-gas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("API proxy error:", error);
      res.status(500).json({ error: "Error de conexión con el servidor de cálculo." });
    }
  });

  return httpServer;
}
