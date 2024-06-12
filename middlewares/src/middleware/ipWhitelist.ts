import { Request, Response, NextFunction } from 'express';

const WHITELISTED_IPS = ['123.456.789.0', '987.654.321.0']; // Replace with your IP addresses

export function ipWhitelist(req: Request, res: Response, next: NextFunction): void {
  const clientIp = req.ip;
  if (WHITELISTED_IPS.includes(clientIp)) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: IP not allowed' });
  }
}
