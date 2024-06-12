import rateLimit from 'express-rate-limit';
import { Request } from 'express';


export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});



const rateLimitByUserRole = (req: Request) => {
  if (req.user.role === 'admin') {
    return 200; // Higher limit for admins
  } else if (req.user.role === 'user') {
    return 100; // Default limit for regular users
  }
  return 50; // Lower limit for other roles
};


export const advancedRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: (req: Request) => rateLimitByUserRole(req),
  message: 'Too many requests, please try again later',
});
