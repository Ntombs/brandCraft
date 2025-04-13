import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import {
  insertProjectSchema,
  insertProjectFileSchema,
  insertMessageSchema,
  insertOnboardingDataSchema
} from "@shared/schema";

function ensureAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Projects API
  app.get("/api/projects", ensureAuthenticated, async (req, res) => {
    try {
      const projects = await storage.getProjectsByClientId(req.user.id);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
    }
  });

  app.post("/api/projects", ensureAuthenticated, async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse({
        ...req.body,
        clientId: req.user.id
      });
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid project data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error creating project" });
      }
    }
  });

  app.get("/api/projects/:id", ensureAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      if (project.clientId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  });

  // Project Files API
  app.get("/api/projects/:id/files", ensureAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      if (project.clientId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const files = await storage.getProjectFiles(projectId);
      res.json(files);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project files" });
    }
  });

  app.post("/api/projects/:id/files", ensureAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Only admins can upload files
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const fileData = insertProjectFileSchema.parse({
        ...req.body,
        projectId,
        uploadedById: req.user.id
      });
      
      const file = await storage.createProjectFile(fileData);
      res.status(201).json(file);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid file data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error creating file" });
      }
    }
  });

  // Messages API
  app.get("/api/projects/:id/messages", ensureAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      if (project.clientId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const messages = await storage.getProjectMessages(projectId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages" });
    }
  });

  app.post("/api/projects/:id/messages", ensureAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      if (project.clientId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const messageData = insertMessageSchema.parse({
        ...req.body,
        projectId,
        senderId: req.user.id
      });
      
      const message = await storage.createMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error creating message" });
      }
    }
  });

  // Onboarding API
  app.get("/api/onboarding", ensureAuthenticated, async (req, res) => {
    try {
      const onboardingData = await storage.getOnboardingData(req.user.id);
      res.json(onboardingData || {});
    } catch (error) {
      res.status(500).json({ message: "Error fetching onboarding data" });
    }
  });

  app.post("/api/onboarding", ensureAuthenticated, async (req, res) => {
    try {
      const existingData = await storage.getOnboardingData(req.user.id);
      
      const onboardingData = insertOnboardingDataSchema.parse({
        ...req.body,
        clientId: req.user.id
      });
      
      let result;
      if (existingData) {
        result = await storage.updateOnboardingData(req.user.id, onboardingData);
      } else {
        result = await storage.createOnboardingData(onboardingData);
      }
      
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid onboarding data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Error saving onboarding data" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
