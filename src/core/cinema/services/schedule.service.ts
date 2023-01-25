import {
	BadRequestException,
	Injectable,
	UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ScheduleDto } from '../dto';
import { Schedule } from '../entities';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectModel(Schedule) private scheduleRepository: typeof Schedule,
	) {}

	public async findAll(options: any): Promise<Schedule[]> {
		return await this.scheduleRepository.findAll({
			where: { ...options },
			include: { all: true },
		});
	}

	public async findBy(options: any): Promise<Schedule> {
		return await this.scheduleRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(scheduleDto: ScheduleDto): Promise<Schedule> {
		const existingDateInSchedule = await this.findBy({
			date: scheduleDto.date,
		});

		if (existingDateInSchedule) {
			throw new BadRequestException('Such date in schedule has already exist');
		}

		return await this.scheduleRepository.create(scheduleDto);
	}

	public async update(id: number, scheduleDto: ScheduleDto): Promise<Schedule> {
		const schedule = await this.findBy({ id: id });

		if (!schedule) {
			throw new BadRequestException("Such schedule doesn't exist");
		}

		const existingDateInSchedule = await this.findBy({
			date: scheduleDto.date,
		});

		if (existingDateInSchedule) {
			throw new BadRequestException('Such date in schedule has already exist');
		}

		await this.scheduleRepository.update(scheduleDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.scheduleRepository.destroy({ where: { id } });
	}
}
