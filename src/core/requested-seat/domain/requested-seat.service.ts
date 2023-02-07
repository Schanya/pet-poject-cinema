import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import {
	RequestedSeatDto,
	RequestedSeatOptions,
} from '../presentation/requested-seat.dto';
import { RequestedSeat } from './requested-seat.entity';

@Injectable()
export class RequestedSeatService {
	constructor(
		@InjectModel(RequestedSeat)
		private requestedSeatRepository: typeof RequestedSeat,
	) {}

	public async findAll(
		options: RequestedSeatOptions,
	): Promise<RequestedSeat[]> {
		const suitableRequestedSeats = await this.requestedSeatRepository.findAll({
			where: { ...options },
			include: { all: true },
		});

		return suitableRequestedSeats;
	}

	public async findBy(options: RequestedSeatOptions): Promise<RequestedSeat> {
		const suitableRequestedSeat = await this.requestedSeatRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableRequestedSeat;
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

		const createdRequestedSeat = await this.requestedSeatRepository.create({
			...requestedSeatDto,
			userId: userId,
		});

		return createdRequestedSeat;
	}
}
