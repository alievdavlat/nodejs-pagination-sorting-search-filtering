import slowDown from 'express-slow-down';

export const throttle = slowDown({
  windowMs: 60 * 1000, // 1 minute
  delayAfter: 10, // Allow 10 requests per minute per IP, then start slowing down
  delayMs: 500 // Add 500ms of delay per request above 10 per minute
});
