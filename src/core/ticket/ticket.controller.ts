import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { TicketDto } from './dto/ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
	constructor(readonly ticketService: TicketService) {}

	@Get()
	async getAll() {
		return await this.ticketService.findBy({});
	}

	@Post()
	async create(@Body() ticketDto: TicketDto) {
		return await this.ticketService.create(ticketDto);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() ticketDto: TicketDto) {
		return await this.ticketService.update(id, ticketDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.ticketService.delete(id);
	}
}
