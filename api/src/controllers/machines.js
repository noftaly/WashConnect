import { ZodError } from 'zod';
import { db } from '../database.js';
import { createMachine, findMachine } from '../validators/machines.js';

export async function findAll(req, res, next) {
  const { success, data, error } = findMachine.safeParse(req.query);
  if (!success) {
    next(error);
    return;
  }

  const { around, pgt, plt, type, capacity, before, after } = data;

  if (plt && pgt && plt < pgt) {
    next(new ZodError({ message: 'plt must be greater than pgt' }));
    return;
  }

  if (before && after && before < after) {
    next(new ZodError({ message: 'before must be greater than after' }));
    return;
  }

  const queries = [];

  // Type queries
  if (type === 0)
    queries.push({ hasWasher: true });
  else if (type === 1)
    queries.push({ hasDryer: true });
  else if (type === 2)
    queries.push({ hasWasher: true, hasDryer: true });

  // Price queries (plt)
  if (plt && type === 0)
    queries.push({ priceWashing: { lte: plt } });
  else if (plt && type === 1)
    queries.push({ priceDrying: { lte: plt } });
  else if (plt && type === 2)
    queries.push({ OR: [
      { priceWashing: { lte: plt } },
      { priceDrying: { lte: plt } },
    ] });

  // Price queries (pgt)
  if (pgt && type === 0)
    queries.push({ priceWashing: { gte: pgt } });
  else if (pgt && type === 1)
    queries.push({ priceDrying: { gte: pgt } });
  else if (pgt && type === 2)
    queries.push({ OR: [
      { priceWashing: { gte: pgt } },
      { priceDrying: { gte: pgt } },
    ] });

  // Capacity query
  if (capacity)
    queries.push({ maxCapacity: { gte: capacity } });

  const machines = await db.machine.findMany({
    where: { AND: queries },
    include: { address: true },
  });

  res.json(machines);
}

export async function create(req, res, next) {
  const { success, data, error } = createMachine.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  // Check address exists

  const machine = await db.machine.create({
    data: {
      ...data,
      userId: req.user.id,
    },
  });

  res.json(machine);
}

export async function getOne(req, res) {
  const machine = await db.machine.findUnique({
    where: { id: parseInt(req.params.machineId) },
  });
  // If the machine doesn't exist, return 404
  if (!machine) {
    res.status(404).json({ message: 'Machine not found' });
    return;
  }
  res.json(machine);
}
