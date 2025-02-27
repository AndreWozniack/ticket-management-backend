import express from 'express';
import { Ticket } from '../types/Ticket';
import { getTickets, getTicketById, createTicket, updateTicket, deleteTicket } from '../services/ticketsService';

const ticketRouter = express.Router();

ticketRouter.get('/', async (req, res, next) => {
    try {
        const tickets = await getTickets();

        if (tickets.length === 0) {
            res.status(204).send("No tickets found");
        } else {
            res.status(200).json(tickets);
        }
    } catch (error) {
        next(error);
    }
});

ticketRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const ticket = await getTicketById(id);

        if (!ticket) {
            res.status(404).send("Ticket not found");
        } else {
            res.status(200).json(ticket);
        }
    } catch (error) {
        next(error);
    }
});

//Create a new ticket
ticketRouter.post('/', async (req, res, next) => {
    try {
        const ticketData = req.body as Ticket;
        const newTicket = createTicket(ticketData);
        res.status(201).json(newTicket);

    } catch (error) {
        next(error);
    }
});

ticketRouter.put('/:id', async (req, res, next) => {
    try {
        console.log(req.body);
        const ticketData = req.body as Ticket;
        const updatedTicket = await updateTicket(ticketData);
        res.status(200).json(updatedTicket);
    } catch (error) {
        next(error);
    }
});

ticketRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteTicket(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default ticketRouter;