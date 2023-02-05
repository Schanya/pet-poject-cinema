import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Schema } from 'src/core/schema/domain/schema.entity';

import { RequestedSeatDto } from '../presentation/requested-seat.dto';
import { RequestedSeat } from './requested-seat.entity';

@Injectable()
export class RequestedSeatService {
	constructor(
		@InjectModel(RequestedSeat)
		private requestedSeatRepository: typeof RequestedSeat,
	) {}

	public async findAllByHall(options: any): Promise<any[]> {
		return await this.requestedSeatRepository.findAll({
			include: [{ model: Schema, required: false, right: false }],
		});
	}

	public async findAll(options: any): Promise<RequestedSeat[]> {
		return await this.requestedSeatRepository.findAll({
			where: { ...options },
			include: { all: true },
		});
	}

	public async findBy(options: any): Promise<RequestedSeat> {
		return await this.requestedSeatRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(
		requestedSeatDto: RequestedSeatDto,
		userId: number,
	): Promise<RequestedSeat> {
		const existingRequestedSeat = await this.findBy({
			schemaId: requestedSeatDto.schemaId,
			scheduleId: requestedSeatDto.scheduleId,
		});

		if (existingRequestedSeat) {
			throw new BadRequestException('Place already taken');
		}

		return await this.requestedSeatRepository.create({
			...requestedSeatDto,
			userId: userId,
		});
	}
}
