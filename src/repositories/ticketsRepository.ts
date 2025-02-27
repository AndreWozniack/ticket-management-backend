import { Ticket } from "../types/Ticket";
import { tickets as db } from "../database/knexfile";

export class TicketsRepository {

    async getAllTickets(): Promise<Ticket[]> {
        return await db("tickets").select("*");
    }


    async getTicketById(id: string): Promise<Ticket | null> {
        const ticket = await db("tickets").where({ id }).first();
        return ticket || null;
    }


    async createTicket(ticketData: Omit<Ticket, "createdAt">): Promise<Ticket> {
        const newTicket: Ticket = {
            ...ticketData,
            createdAt: new Date().toISOString()
        };

        await db("tickets").insert(newTicket);
        return newTicket;
    }
    async updateTicket(ticket: Ticket): Promise<Ticket> {
        const { id, ...data } = ticket;
        const rowsAffected = await db("tickets").where({ id }).update(data);

        if (rowsAffected === 0) {
            throw new Error("Ticket not found");
        }


        const updatedTicket = await this.getTicketById(id);
        if (!updatedTicket) {
            throw new Error("Erro ao recuperar o ticket atualizado");
        }
        return updatedTicket;
    }

    async deleteTicket(id: string): Promise<void> {
        const rowsAffected = await db("tickets").where({ id }).delete();
        if (rowsAffected === 0) {
            throw new Error("Ticket not found");
        }
    }
}
