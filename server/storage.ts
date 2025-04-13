import { 
  User, InsertUser, 
  Project, InsertProject, 
  ProjectFile, InsertProjectFile,
  Message, InsertMessage,
  OnboardingData, InsertOnboardingData
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByClientId(clientId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<Project>): Promise<Project | undefined>;
  
  // Project file methods
  getProjectFile(id: number): Promise<ProjectFile | undefined>;
  getProjectFiles(projectId: number): Promise<ProjectFile[]>;
  createProjectFile(file: InsertProjectFile): Promise<ProjectFile>;
  
  // Message methods
  getMessage(id: number): Promise<Message | undefined>;
  getProjectMessages(projectId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  
  // Onboarding data methods
  getOnboardingData(clientId: number): Promise<OnboardingData | undefined>;
  createOnboardingData(data: InsertOnboardingData): Promise<OnboardingData>;
  updateOnboardingData(clientId: number, data: Partial<OnboardingData>): Promise<OnboardingData | undefined>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private projectFiles: Map<number, ProjectFile>;
  private messages: Map<number, Message>;
  private onboardingData: Map<number, OnboardingData>;
  sessionStore: session.SessionStore;
  
  private userIdCounter: number;
  private projectIdCounter: number;
  private fileIdCounter: number;
  private messageIdCounter: number;
  private onboardingIdCounter: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.projectFiles = new Map();
    this.messages = new Map();
    this.onboardingData = new Map();
    
    this.userIdCounter = 1;
    this.projectIdCounter = 1;
    this.fileIdCounter = 1;
    this.messageIdCounter = 1;
    this.onboardingIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // 24 hours
    });
    
    // Create admin user with already hashed password
    // The password "admin123" was hashed with the same algorithm in auth.ts
    const id = this.userIdCounter++;
    const adminUser: User = {
      id,
      username: "admin",
      password: "c67fd61e6c3d725bb48035c0f43b65525f9e3a953a91a41a64fd83b6d090f7bfa96ce993f9cce7acedd3ca1a5759ca3c0e6ccda1ddaef36dd427c5ea34323ee2.59146f5bb17f1f7c", // hashed "admin123"
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      companyName: "Studio Platform",
      role: "admin"
    };
    this.users.set(id, adminUser);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const role = (insertUser as any).role || "client";
    const user: User = { ...insertUser, id, role };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByClientId(clientId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.clientId === clientId,
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const now = new Date();
    const project: Project = {
      ...insertProject,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = {
      ...project,
      ...projectUpdate,
      updatedAt: new Date()
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  // Project file methods
  async getProjectFile(id: number): Promise<ProjectFile | undefined> {
    return this.projectFiles.get(id);
  }

  async getProjectFiles(projectId: number): Promise<ProjectFile[]> {
    return Array.from(this.projectFiles.values()).filter(
      (file) => file.projectId === projectId,
    );
  }

  async createProjectFile(insertFile: InsertProjectFile): Promise<ProjectFile> {
    const id = this.fileIdCounter++;
    const now = new Date();
    const file: ProjectFile = {
      ...insertFile,
      id,
      uploadedAt: now
    };
    this.projectFiles.set(id, file);
    return file;
  }

  // Message methods
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getProjectMessages(projectId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((message) => message.projectId === projectId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const now = new Date();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: now,
      isRead: false
    };
    this.messages.set(id, message);
    return message;
  }

  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = {
      ...message,
      isRead: true
    };
    
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }

  // Onboarding data methods
  async getOnboardingData(clientId: number): Promise<OnboardingData | undefined> {
    return Array.from(this.onboardingData.values()).find(
      (data) => data.clientId === clientId,
    );
  }

  async createOnboardingData(insertData: InsertOnboardingData): Promise<OnboardingData> {
    const id = this.onboardingIdCounter++;
    const now = new Date();
    const data: OnboardingData = {
      ...insertData,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.onboardingData.set(id, data);
    return data;
  }

  async updateOnboardingData(clientId: number, dataUpdate: Partial<OnboardingData>): Promise<OnboardingData | undefined> {
    const data = Array.from(this.onboardingData.values()).find(
      (d) => d.clientId === clientId,
    );
    
    if (!data) return undefined;
    
    const updatedData = {
      ...data,
      ...dataUpdate,
      updatedAt: new Date()
    };
    
    this.onboardingData.set(data.id, updatedData);
    return updatedData;
  }
}

export const storage = new MemStorage();
