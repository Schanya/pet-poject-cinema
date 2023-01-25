import {
	BadRequestException,
	Injectable,
	UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { HallDto } from '../dto';
import { Hall } from '../entities';

@Injectable()
export class HallService {
	constructor(@InjectModel(Hall) private hallRepository: typeof Hall) {}

	public async findAll(options: any): Promise<Hall[]> {
		return await this.hallRepository.findAll({
			where: { ...options },
			include: { all: true },
		});
	}

	public async findBy(options: any): Promise<Hall> {
		return await this.hallRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(hallDto: HallDto): Promise<Hall> {
		const existingHall = await this.findBy({ name: hallDto.name });

		if (existingHall) {
			throw new BadRequestException('Such hall has already exist');
		}

		return await this.hallRepository.create(hallDto);
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

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.hallRepository.destroy({ where: { id } });
	}
}
