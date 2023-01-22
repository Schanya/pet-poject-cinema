import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { TicketDto } from './dto/ticket.dto';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
	constructor(@InjectModel(Ticket) private ticketRepository: typeof Ticket) {}

	public async findBy(options: any): Promise<Ticket> {
		return await this.ticketRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(ticketDto: TicketDto): Promise<Ticket> {
		const ticket = await this.ticketRepository.create(ticketDto);

		return ticket;
	}

	public async update(id: number, ticketDto: TicketDto): Promise<Ticket> {
		await this.ticketRepository.update(ticketDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.ticketRepository.destroy({ where: { id } });
	}
}
