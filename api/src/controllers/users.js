import { db } from '../database.js';
import { safeUnknownUser } from '../utils/safeUser.js';

export async function findOne(req, res) {
  const user = await db.user.findUnique({
    where: { id: Number(req.params.userId) },
    include: {
      Machine: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(safeUnknownUser(user));
}

export async function findAll(req, res) {
  const users = await db.user.findMany({
    include: {
      Machine: true,
    },
  });

  res.json(users.map(safeUnknownUser));
}
