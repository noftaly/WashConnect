import { db } from '../database.js';
import axios from 'axios';

export async function getScheduleForMachine(req, res){
    // I verify that the machine exists
    const machine = await db.Machine.findUnique({ where: { id: Number(req.params.machineId) }, });
    if (!machine) {
        return res.status(404).json({ message: 'Machine not found' });
    }
    // SELECT * FROM agenda WHERE timeSlot > NOW() AND machineId=
    const agenda = await db.Agenda.findMany({
        where: {machineId: Number(req.params.machineId), timeSlot: {gt: new Date()}},
        orderBy: {timeSlot: 'asc'}
    });
    //We we return a new propeerty isAvailable and remove userId, createdAt and updatedAt
    res.json(agenda.map(timeSlot => ({id: timeSlot.id,
        timeSlot: timeSlot.timeSlot,
        isAvailable: timeSlot.userId === null,
        machine_type: timeSlot.machineType})));
}

export async function makeReservation(req, res){
    // I verify if I'm authenticated
    const user = await db.User.findUnique({ where: { id: req.user.id }, });
    
    if (!req.body.typeOfProduct || !req.body.agendaId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    /// I get the machineId from agenda
    const agenda = await db.Agenda.findUnique({ where: { id: Number(req.body.agendaId) }, });
    // I verify that the machine exists
    const machine = await db.Machine.findUnique({ where: { id: agenda.machineId }, });
    let priceToPay;
    if (req.body.typeOfProduct === "WASHANDDRY"){
        priceToPay = machine.priceWashingDrying;
    } else if (req.body.typeOfProduct === "DRY"){
        priceToPay = machine.priceDrying;
    } else if (req.body.typeOfProduct === "WASH"){
        priceToPay = machine.priceWashing;
    } else {
        return res.status(400).json({ message: 'Invalid type of product' });
    }
    // I verify that the user has enough money
    if (user.balance < priceToPay){
        return res.status(400).json({ message: 'Insufficient funds' });
    }
    // I update the agenda by giving changing the null user id to the user id
    const updatedAgenda = await db.Agenda.update({
        where: { id: Number(req.body.agendaId) },
        data: { userId: req.user.id },
    });
    // WARNING: The funds are not taken away
    //I respond 200
    res.status(200).json({ message: 'Reservation made' });
}

export async function getCurrentReservations(req, res){
    //I get the set of reservations which are not passed
    const setOfReservations = await db.Agenda.findMany({
        where: {userId: req.user.id, timeSlot: {gt: new Date()}},
        orderBy: {timeSlot: 'asc'}
    });
    //I get the machine I've reserved
    const machines = await db.Machine.findMany({
        where: {id: {in: setOfReservations.map(reservation => reservation.machineId)}}
    });
    // I display the set of reservation with their ids and their date
    res.json(setOfReservations.map(reservation => ({machineID: reservation.id,
        timeSlot: reservation.timeSlot
    })));
}