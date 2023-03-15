import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ReadAllResult } from 'src/common/types/read-all-result.type';
import { HallDto, HallOptions } from '../presentation/hall.dto';
import { Hall } from './hall.entity';

@Injectable()
export class HallService {
	constructor(@InjectModel(Hall) private hallRepository: typeof Hall) {}

	public async findAll(options: HallOptions): Promise<ReadAllResult<Hall>> {
		const { count, rows } = await this.hallRepository.findAndCountAll({
			where: { ...options },
			include: { all: true },
		});

		return {
			totalRecordsNumber: count,
			entities: rows,
		};
	}

	public async findBy(options: HallOptions): Promise<Hall> {
		const suitableHall = await this.hallRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableHall;
	}

	public async create(hallDto: HallDto): Promise<Hall> {
		const existingHall = await this.findBy({ name: hallDto.name });

		if (existingHall) {
			throw new BadRequestException('Such hall has already exist');
		}

		const createdHall = await this.hallRepository.create(hallDto);

		return createdHall;
	}

	public async update(id: number, hallDto: HallDto): Promise<Hall> {
		const hall = await this.findBy({ id: id });

		if (!hall) {
			throw new BadRequestException("Such hall doesn't exist");
		}

		const existingHall = await this.findBy({ name: hallDto.name });

		if (existingHall) {
			throw new BadRequestException('Such hall has already exist');
		}

		await this.hallRepository.update(hallDto, { where: { id } });

		const updatedHall = await this.findBy({ id: id });

		return updatedHall;
	}

	public async delete(id: string): Promise<number> {
		const numberDeletedRows = await this.hallRepository.destroy({
			where: { id },
		});

		return numberDeletedRows;
	}
}
