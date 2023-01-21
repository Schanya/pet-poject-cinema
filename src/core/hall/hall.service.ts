import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { HallDto } from './dto/hall.dto';
import { Hall } from './hall.entity';

@Injectable()
export class HallService {
	constructor(@InjectModel(Hall) private hallRepository: typeof Hall) {}

	public async findBy(options: any): Promise<Hall> {
		return this.hallRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(hallDto: HallDto): Promise<Hall> {
		const hall = await this.hallRepository.create(hallDto);

		return hall;
	}

	public async update(id: number, hallDto: HallDto): Promise<Hall> {
		await this.hallRepository.update(hallDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return this.hallRepository.destroy({ where: { id } });
	}
}
