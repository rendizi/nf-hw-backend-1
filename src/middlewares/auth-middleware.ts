import { NextFunction, Request, Response } from 'express';
import AuthService from '../auth/auth-service';
import authRouter from "../auth/auth-router";

const authService = new AuthService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    (req as any).location = null
  }else{
  const token = authHeader.split(' ')[0];
  const payload = authService.verifyJwt(token);

  if (!payload) {
    (req as any).location = null
  }else {
    (req as any).location = payload.location;
  }}
  next();
};
