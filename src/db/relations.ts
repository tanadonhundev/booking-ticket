import { relations } from "drizzle-orm/relations";
import { user, account, ticket, booking, session } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
}));

export const bookingRelations = relations(booking, ({one}) => ({
	ticket: one(ticket, {
		fields: [booking.ticketId],
		references: [ticket.id]
	}),
}));

export const ticketRelations = relations(ticket, ({many}) => ({
	bookings: many(booking),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));