import { db } from '../database.js';

export async function create(req, res) {
  if (!req.body.typeOfProduct || Number.isNaN(Number(req.params.agendaId))) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const agenda = await db.agenda.findUnique({
    where: { id: Number(req.params.agendaId) },
    include: { machine: true },
  });

  if (!agenda) {
    return res.status(404).json({ message: 'Time slot not found' });
  }

  if (agenda.userId != null) {
    return res.status(400).json({ message: 'Machine not available' });
  }

  const price = req.body.typeOfProduct === 'WASH'
    ? agenda.machine.priceWashing
    : req.body.typeOfProduct === 'DRY'
      ? agenda.machine.priceDrying
      : agenda.machine.priceWashingDrying;

  if (req.user.balance < price) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }

  if (agenda.machine.userId === req.user.id) {
    return res.status(400).json({ message: 'You cannot reserve your own machine' });
  }

  const [slot] = await db.$transaction([
    db.agenda.update({
      where: { id: Number(req.params.agendaId) },
      data: { userId: req.user.id },
    }),
    db.user.update({
      where: { id: req.user.id },
      data: {
        balance: { decrement: price },
      }
    }),
    db.user.update({
      where: { id: agenda.machine.userId },
      data: {
        balance: { increment: price },
      }
    }),
  ]);

  res.status(200).json(slot);
}

export async function findAllForSelf(req, res) {
  const reservations = await db.agenda.findMany({
    where: {
      userId: req.user.id,
      timeSlot: { gt: new Date() }
    },
    include: { machine: { include: { address: true } } },
    orderBy: { timeSlot: 'asc' }
  });

  res.json(reservations);
}

export async function remove(req, res) {
  if (Number.isNaN(Number(req.params.agendaId))) {
    return res.status(400).json({ message: 'Invalid time slot' });
  }

  const agenda = await db.agenda.findUnique({
    where: { id: Number(req.params.agendaId) },
    include: { machine: true },
  });

  if (!agenda) {
    return res.status(404).json({ message: 'Time slot not found' });
  }

  if (!agenda.userId
    || (agenda.userId !== req.user.id && agenda.machine.userId !== req.user.id)
    || new Date(agenda.timeSlot) < new Date()) {
    return res.status(400).json({ message: 'You cannot cancel this reservation' });
  }

  const price = agenda.machineType === 'WASH'
    ? agenda.machine.priceWashing
    : agenda.machine.priceDrying;

  const [slot] = await db.$transaction([
    db.agenda.update({
      where: { id: Number(req.params.agendaId) },
      data: { userId: null },
    }),
    db.user.update({
      where: { id: agenda.userId },
      data: {
        balance: { increment: price },
      }
    }),
    db.user.update({
      where: { id: agenda.machine.userId },
      data: {
        balance: { decrement: price },
      }
    }),
  ]);

  res.status(200).json(slot);
}
