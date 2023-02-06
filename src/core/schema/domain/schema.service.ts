import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';

import { UserService } from 'src/core/user/domain/user.service';
import { RequestedSeatService } from '../../requested-seat/domain/requested-seat.service';
import { TicketService } from '../../ticket/domain/ticket.service';
import { StatusService } from '../../status/domain/status.service';

import { Schema } from './schema.entity';
import { Ticket } from 'src/core/ticket/domain/ticket.entity';
import { RequestedSeat } from 'src/core/requested-seat/domain/requested-seat.entity';

import {
	AddToBasketDto,
	SchemaDto,
	SchemaOptions,
} from '../presentation/schema.dto';
import { BasketService } from 'src/core/basket/domain/basket.service';

@Injectable()
export class SchemaService {
	constructor(
		@InjectModel(Schema) private schemaRepository: typeof Schema,
		readonly basketService: BasketService,
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

			await this.basketService.create(
				{ ticketId: ticket.id, statusId: status.id, userId: user.id },
				transaction,
			);

			user.tickets.push(ticket);
		}

		const addedTickets = user.tickets;

		return addedTickets;
	}

	public async findAllByHall(
		addToBasketDto: AddToBasketDto,
	): Promise<Schema[]> {
		const suitableSchema = await this.schemaRepository.findAll({
			include: [
				{
					model: RequestedSeat,
					where: { scheduleId: addToBasketDto.scheduleId },
					right: true,
				},
			],
			where: { hallId: addToBasketDto.hallId },
		});

		return suitableSchema;
	}

	public async findAll(options: SchemaOptions): Promise<Schema[]> {
		const suitableSchemas = await this.schemaRepository.findAll({
			where: { ...options },
			include: { all: true },
		});

		return suitableSchemas;
	}

	public async findBy(options: SchemaOptions): Promise<Schema> {
		const suitableSchema = await this.schemaRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableSchema;
	}

	public async create(schemaDto: SchemaDto): Promise<Schema> {
		const existingRowInSchema = await this.findBy({ row: schemaDto.row });

		if (existingRowInSchema) {
			throw new BadRequestException('Such row in schema has already exist');
		}

		const createdSchema = await this.schemaRepository.create(schemaDto);

		return createdSchema;
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

		const updatedSchema = await this.findBy({ id: id });

		return updatedSchema;
	}

	public async delete(id: string): Promise<number> {
		const numberOfDeletedRows = await this.schemaRepository.destroy({
			where: { id },
		});

		return numberOfDeletedRows;
	}
}
