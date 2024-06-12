import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

export function cacheMiddleware(req: Request, res: Response, next: NextFunction): void {
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.json(cachedResponse);
  } else {
    res.sendResponse = res.json;
    res.json = (body: any) => {
      cache.set(key, body);
      res.sendResponse(body);
    };
    next();
  }
}



// const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const key = req.originalUrl;
//   const cachedResponse = cache.get(key);

//   if (cachedResponse) {
//     res.send(cachedResponse);
//   } else {
//     res.sendResponse = res.send;
//     res.send = (body) => {
//       cache.set(key, body);
//       res.sendResponse(body);
//     };
//     next();
//   }
// };
