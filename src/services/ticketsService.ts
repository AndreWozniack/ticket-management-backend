import { Ticket } from "../types/Ticket";
import { TicketsRepository } from "../repositories/ticketsRepository";

const ticketsRepository = new TicketsRepository();

export async function getTickets() {
    return await ticketsRepository.getAllTickets();
}

export async function getTicketById(id: string) {
    return await ticketsRepository.getTicketById(id);
}

export async function createTicket(ticketData: Ticket) {
    return await ticketsRepository.createTicket(ticketData);
}

export async function updateTicket(ticket: Ticket) {
    return await ticketsRepository.updateTicket(ticket);
}

export async function deleteTicket(id: string) {
    return await ticketsRepository.deleteTicket(id);
}