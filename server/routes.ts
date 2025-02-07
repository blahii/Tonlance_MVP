import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertUserSchema, insertTaskSchema, insertProposalSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  
  // WebSocket setup for chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        if (message.type === 'chat') {
          const validatedMessage = insertMessageSchema.parse(message.data);
          const savedMessage = await storage.createMessage(validatedMessage);
          
          // Broadcast to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'chat', data: savedMessage }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
  });

  // User routes
  app.post('/api/auth', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByTelegramId(userData.telegramId);
      
      if (existingUser) {
        res.json(existingUser);
      } else {
        const newUser = await storage.createUser(userData);
        res.json(newUser);
      }
    } catch (error) {
      res.status(400).json({ error: 'Invalid request data' });
    }
  });

  // Task routes
  app.get('/api/tasks', async (req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.get('/api/tasks/:id', async (req, res) => {
    const task = await storage.getTask(parseInt(req.params.id));
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  });

  app.post('/api/tasks', async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: 'Invalid request data' });
    }
  });

  // Proposal routes
  app.get('/api/tasks/:taskId/proposals', async (req, res) => {
    const proposals = await storage.getProposals(parseInt(req.params.taskId));
    res.json(proposals);
  });

  app.post('/api/tasks/:taskId/proposals', async (req, res) => {
    try {
      const proposalData = insertProposalSchema.parse({
        ...req.body,
        taskId: parseInt(req.params.taskId)
      });
      const proposal = await storage.createProposal(proposalData);
      res.json(proposal);
    } catch (error) {
      res.status(400).json({ error: 'Invalid request data' });
    }
  });

  // Chat messages routes
  app.get('/api/tasks/:taskId/messages', async (req, res) => {
    const messages = await storage.getMessages(parseInt(req.params.taskId));
    res.json(messages);
  });

  return httpServer;
}
