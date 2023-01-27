import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { UserService } from 'src/core/user/services';
// import { RequestedSeatService, TicketService, StatusService } from '.';
import { RequestedSeatService } from './requested-seat.service';
import { TicketService } from './ticket.service';
import { StatusService } from './status.service';

import { AddToBasketDto, SchemaDto } from '../dto';
import { Ticket, Schema, RequestedSeat, Basket } from '../entities';

@Injectable()
export class SchemaService {
	constructor(
		@InjectModel(Schema) private schemaRepository: typeof Schema,
		@InjectModel(Basket) private basketRepository: typeof Basket,
		readonly requestedSeatService: RequestedSeatService,
		readonly ticketService: TicketService,
		readonly userService: UserService,
		readonly statusService: StatusService,
	) {}

	public async addToBasket(
		addToBasketDto: AddToBasketDto,
		userId: number,
		transaction: Transaction,
	): Promise<Ticket[]> {
		const schemas: Schema[] = await this.findAllByHall({
			...addToBasketDto,
		});

		if (!schemas.length) {
			throw new BadRequestException('Seats in this room are not reserved');
		}

		const user = await this.userService.findBy({ id: userId });
		const status = await this.statusService.findBy({ name: 'RESERVED' });

		for (const schema of schemas) {
			const requestedSeat: RequestedSeat = schema.requestedSeats[0];
			const ticket = await this.ticketService.findBy({
				schemaId: requestedSeat.schemaId,
				scheduleId: requestedSeat.scheduleId,
			});

			if (!ticket) {
				throw new BadRequestException('No matching tickets');
			}

			await this.basketRepository.create(
				{ ticketId: ticket.id, statusId: status.id, userId: user.id },
				{ transaction },
			);

			user.tickets.push(ticket);
		}

		return user.tickets;
	}

	public async findAllByHall(addToBasketDto: AddToBasketDto): Promise<any[]> {
		return await this.schemaRepository.findAll({
			include: [
				{
					model: RequestedSeat,
					where: { scheduleId: addToBasketDto.scheduleId },
					right: true,
				},
			],
			where: { hallId: addToBasketDto.hallId },
		});
	}

	public async findAll(options: any): Promise<Schema[]> {
		return await this.schemaRepository.findAll({
			where: { ...options },
			include: { all: true },
		});
	}

	public async findBy(options: any): Promise<Schema> {
		return await this.schemaRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(schemaDto: SchemaDto): Promise<Schema> {
		const existingRowInSchema = await this.findBy({ row: schemaDto.row });

		if (existingRowInSchema) {
			throw new BadRequestException('Such row in schema has already exist');
		}

		return await this.schemaRepository.create(schemaDto);
	}

	public async update(id: number, schemaDto: SchemaDto): Promise<Schema> {
		const schema = await this.findBy({ id: id });

		if (!schema) {
			throw new BadRequestException("Such schema doesn't exist");
		}

		const existingRowInSchema = await this.findBy({ row: schemaDto.row });

		if (existingRowInSchema) {
			throw new BadRequestException('Such row in schema has already exist');
		}

		await this.schemaRepository.update(schemaDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.schemaRepository.destroy({ where: { id } });
	}
}
