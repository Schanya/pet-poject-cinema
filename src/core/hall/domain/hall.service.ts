import {
	BadRequestException,
	Injectable,
	UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Hall } from './hall.entity';
import { HallDto, HallOptions } from '../presentation/hall.dto';

@Injectable()
export class HallService {
	constructor(@InjectModel(Hall) private hallRepository: typeof Hall) {}

	public async findAll(options: HallOptions): Promise<Hall[]> {
		const suitableHalls = await this.hallRepository.findAll({
			where: { ...options },
			include: { all: true },
		});

		return suitableHalls;
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
