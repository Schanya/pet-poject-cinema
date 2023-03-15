import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

import { TicketDto, TicketOptions } from '../presentation/ticket.dto';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
	constructor(@InjectModel(Ticket) private ticketRepository: typeof Ticket) {}

	public async findAll(options: TicketOptions): Promise<ReadAllResult<Ticket>> {
		const { count, rows } = await this.ticketRepository.findAndCountAll({
			where: { ...options },
			include: { all: true },
		});

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: TicketOptions): Promise<Ticket> {
		const suitableTicket = await this.ticketRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableTicket;
	}

	public async create(ticketDto: TicketDto): Promise<Ticket> {
		const createdTicket = await this.ticketRepository.create(ticketDto);

		return createdTicket;
	}

	public async update(id: number, ticketDto: TicketDto): Promise<Ticket> {
		const ticket = await this.findBy({ id: id });

		if (!ticket) {
			throw new BadRequestException("Such ticket doesn't exist");
		}

		await this.ticketRepository.update(ticketDto, { where: { id } });

		const updatedTicket = await this.findBy({ id: id });

		return updatedTicket;
	}

	public async delete(id: string): Promise<number> {
		const numberOfDeletedRows = await this.ticketRepository.destroy({
			where: { id },
		});

		return numberOfDeletedRows;
	}
}
