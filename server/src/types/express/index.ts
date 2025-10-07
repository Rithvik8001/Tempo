import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        userName: string;
        email: string;
      };
    }
  }
}

export {};
