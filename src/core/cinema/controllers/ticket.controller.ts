import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Res,
} from '@nestjs/common';
import { Response } from 'express';

import { TicketDto } from '../dto';
import { TicketService } from '../services';

@Controller('ticket')
export class TicketController {
	constructor(readonly ticketService: TicketService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const tickets = await this.ticketService.findAll({});

		res.status(HttpStatus.OK).send(tickets);
	}

	@Post()
	async create(@Body() ticketDto: TicketDto, @Res() res: Response) {
		const ticket = await this.ticketService.create(ticketDto);

		res
			.status(HttpStatus.OK)
			.send({ message: 'Ticket created successfully', ticket });
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() ticketDto: TicketDto,
		@Res() res: Response,
	) {
		const updatedTicket = await this.ticketService.update(id, ticketDto);

		res
			.status(HttpStatus.OK)
			.send({ message: 'Ticket created successfully', updatedTicket });
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		await this.ticketService.delete(id);

		res.status(HttpStatus.OK).send({ message: 'Ticket deleted successfully' });
	}
}
