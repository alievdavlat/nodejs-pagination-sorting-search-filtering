import crypto from 'crypto';

export const generateRandomString = (length: number): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
