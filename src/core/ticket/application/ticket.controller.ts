import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { ReadAllResult } from 'src/common/types/read-all-result.type';
import { Ticket } from '../domain/ticket.entity';

import { TicketService } from '../domain/ticket.service';
import { TicketDto } from '../presentation/ticket.dto';

@Controller('ticket')
export class TicketController {
	constructor(readonly ticketService: TicketService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<ReadAllResult<Ticket>> {
		const tickets = await this.ticketService.findAll({});

		return {
			totalRecordsNumber: tickets.totalRecordsNumber,
			entities: tickets.entities,
		};
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() ticketDto: TicketDto) {
		const ticket = await this.ticketService.create(ticketDto);

		return ticket;
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(@Param('id') id: number, @Body() ticketDto: TicketDto) {
		const updatedTicket = await this.ticketService.update(id, ticketDto);

		return updatedTicket;
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		await this.ticketService.delete(id);

		return 'Ticket deleted successfully';
	}
}
