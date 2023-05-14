import { db } from '../database.js';

export async function findAllForMachine(req, res) {
    const machine = await db.machine.findUnique({ where: { id: Number(req.params.machineId) } });
    if (!machine) {
        return res.status(404).json({ message: 'Machine not found' });
    }

    const agenda = await db.agenda.findMany({
        where: { machineId: Number(req.params.machineId), timeSlot: { gt: new Date() } },
        orderBy: { timeSlot: 'asc' },
    });

    const schedule = agenda.map(timeSlot => ({
        id: timeSlot.id,
        timeSlot: timeSlot.timeSlot,
        isAvailable: !timeSlot.userId,
        machineType: timeSlot.machineType,
    }));

    res.json(schedule);
}

export async function create(req, res) {
    if (!req.body.timeSlot || !req.body.machineType) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const machine = await db.machine.findUnique({ where: { id: Number(req.params.machineId) }, });
    if (!machine) {
        return res.status(404).json({ message: 'Machine not found' });
    }

    if (machine.userId !== req.user.id) {
        return res.status(400).json({ message: 'You are not the owner of the machine' });
    }
    // I verify that the machine type is valid
    if (req.body.machineType !== "WASHANDDRY" && req.body.machineType !== "DRY" && req.body.machineType !== "WASH"){
        return res.status(400).json({ message: 'Invalid machine type' });
    }
    if(req.body.machineType === "WASHANDDRY" || req.body.machineType === "WASH"){
        req.body.machineType = "WASHING_MACHINE";
    } else {
        req.body.machineType = "DRYER";
    }

    if (new Date(req.body.timeSlot) < new Date()) {
        return res.status(400).json({ message: 'Invalid time slot' });
    }
    // I convert the time slot to a date
    req.body.timeSlot = new Date(req.body.timeSlot);
    // I create a new time slot
    const newTimeSlot = await db.agenda.create({
        data: {
            timeSlot: req.body.timeSlot,
            machineId: Number(req.params.machineId),
            machineType: req.body.machineType
        },
    });
    res.status(200).json(newTimeSlot);
}

export async function remove(req, res) {
    if (!req.params.timeSlotId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const timeSlot = await db.agenda.findUnique({
        where: { id: Number(req.params.timeSlotId) },
        include: { machine: true },
    });
    if (!timeSlot) {
        return res.status(404).json({ message: 'Time slot not found' });
    }

    if (timeSlot.machine.userId !== req.user.id) {
        return res.status(400).json({ message: 'You are not the owner of the machine' });
    }

    await db.agenda.delete({ where: { id: Number(req.body.timeSlotId) } });
    res.status(204).json();
}

