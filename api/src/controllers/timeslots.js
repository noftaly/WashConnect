import { db } from '../database.js';
import * as auth from './auth.js';
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
    // i verify that the machine is available
    if (agenda.userId !== null){
        return res.status(400).json({ message: 'Machine not available' });
    }
    // I get the id of the machine's owner
    const machineOwner = await db.Machine.findUnique({ where: { id: agenda.machineId }, select: { userId: true } });
    // I verify that the user is not the owner of the machine
    if (machineOwner.userId === req.user.id){
        return res.status(400).json({ message: 'You cannot reserve your own machine' });
    }
    // I update the agenda by giving changing the null user id to the user id
    const updatedAgenda = await db.Agenda.update({
        where: { id: Number(req.body.agendaId) },
        data: { userId: req.user.id },
    });
    // I take away the funds by calling topup in auth.topUpBalance and wait for the response
    await auth.topUpBalance(req, res, -priceToPay);
    // I update the user id of the machine's owner
    req.user.id = machineOwner.userId;
    // I add the funds to the owner of the machine
    auth.topUpBalance(req, res, priceToPay)

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

// This will create a new available time slot for a machine
export async function createNewTimeSlot(req, res){
    // I verify that I do have 
    if (!req.body.machineId || !req.body.timeSlot || !req.body.machineType) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // I verify that the machine exists
    const machine = await db.Machine.findUnique({ where: { id: Number(req.body.machineId) }, });
    if (!machine) {
        return res.status(404).json({ message: 'Machine not found' });
    }
    // I verify that the user is the owner of the machine
    if (machine.userId !== req.user.id){
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
    // I verify time slot is a valid date and time in the future
    
    if (new Date(req.body.timeSlot) < new Date()){
        return res.status(400).json({ message: 'Invalid time slot' });
    }
    // I convert the time slot to a date
    req.body.timeSlot = new Date(req.body.timeSlot);
    // I create a new time slot
    const newTimeSlot = await db.Agenda.create({
        data: {
            timeSlot: req.body.timeSlot,
            machineId: req.body.machineId,
            machineType: req.body.machineType
        },
    });
    res.status(200).json({ message: 'Time slot created' });
}

// This will delete a time slot
export async function deleteTimeSlot(req, res){
    // I verify the time slot id is present
    if (!req.body.timeslotId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // I verify that the time slot exists
    const timeSlot = await db.Agenda.findUnique({ where: { id: Number(req.body.timeslotId) }, });
    if (!timeSlot) {
        return res.status(404).json({ message: 'Time slot not found' });
    }
    // I verify that the user is the owner of the machine
    const machine = await db.Machine.findUnique({ where: { id: timeSlot.machineId }, });
    if (machine.userId !== req.user.id){
        return res.status(400).json({ message: 'You are not the owner of the machine' });
    }
    // I delete the time slot
    const deletedTimeSlot = await db.Agenda.delete({
        where: { id: Number(req.body.timeslotId) },
    });
    res.status(200).json({ message: 'Time slot deleted' });
}

