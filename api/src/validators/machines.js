import { z } from 'zod';

export const findMachine = z.object({
  q: z.string().min(1),
  pgt: z.coerce.number().int().gt(0).lt(100),
  plt: z.coerce.number().int().gt(0).lt(100),
  type: z.coerce.number().int().gte(0).lt(3), // 0: washer, 1: dryer, 2: both
  capacity: z.coerce.number().gt(0).lt(100),
  before: z.coerce.date(),
  after: z.coerce.date(),
}).partial().strict();

export const createMachine = z.object({
  adTitle: z.string().min(1).max(255),
  adDescription: z.string().min(1).max(1000),
  priceWashing: z.coerce.number().gt(0).lt(100),
  priceDrying: z.coerce.number().gt(0).lt(100),
  priceWashingDrying: z.coerce.number().gt(0).lt(100),
  detergentIncluded: z.coerce.boolean(),
  maxCapacity: z.coerce.number().gt(0).lt(100),
  washDuration: z.coerce.number().gt(0).lt(300),
  dryDuration: z.coerce.number().gt(0).lt(300),
  hasWasher: z.coerce.boolean(),
  hasDryer: z.coerce.boolean(),
  addressId: z.coerce.number().int().gt(0),
}).strict();
