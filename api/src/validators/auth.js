import { z } from 'zod';

export const createUser = z.object({
  email: z.string().email().min(1),
  username: z.string().min(3).max(50),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(8).max(50),
  phoneNumber: z.string().min(10).max(15),
}).strict();

export const loginUser = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(1),
}).strict();
