import { 
  type User, type InsertUser,
  type Task, type InsertTask,
  type Proposal, type InsertProposal,
  type Message, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByTelegramId(telegramId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tasks
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTaskStatus(id: number, status: string, assignedTo?: number): Promise<Task>;
  
  // Proposals
  getProposals(taskId: number): Promise<Proposal[]>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  updateProposalStatus(id: number, status: string): Promise<Proposal>;
  
  // Messages
  getMessages(taskId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tasks: Map<number, Task>;
  private proposals: Map<number, Proposal>;
  private messages: Map<number, Message>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.proposals = new Map();
    this.messages = new Map();
    this.currentIds = { users: 1, tasks: 1, proposals: 1, messages: 1 };
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByTelegramId(telegramId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.telegramId === telegramId);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const user: User = { ...insertUser, id, balance: 0, rating: 0 };
    this.users.set(id, user);
    return user;
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentIds.tasks++;
    const task: Task = { ...insertTask, id, status: "open", assignedTo: null };
    this.tasks.set(id, task);
    return task;
  }

  async updateTaskStatus(id: number, status: string, assignedTo?: number): Promise<Task> {
    const task = await this.getTask(id);
    if (!task) throw new Error("Task not found");
    
    const updatedTask: Task = { ...task, status, assignedTo: assignedTo ?? task.assignedTo };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  // Proposals
  async getProposals(taskId: number): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter(p => p.taskId === taskId);
  }

  async createProposal(insertProposal: InsertProposal): Promise<Proposal> {
    const id = this.currentIds.proposals++;
    const proposal: Proposal = { ...insertProposal, id, status: "pending" };
    this.proposals.set(id, proposal);
    return proposal;
  }

  async updateProposalStatus(id: number, status: string): Promise<Proposal> {
    const proposal = this.proposals.get(id);
    if (!proposal) throw new Error("Proposal not found");
    
    const updatedProposal: Proposal = { ...proposal, status };
    this.proposals.set(id, updatedProposal);
    return updatedProposal;
  }

  // Messages
  async getMessages(taskId: number): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(m => m.taskId === taskId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentIds.messages++;
    const message: Message = { ...insertMessage, id, timestamp: new Date() };
    this.messages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
