import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ScheduleDto } from './dto/schedule.dto';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectModel(Schedule) private scheduleRepository: typeof Schedule,
	) {}

	public async findBy(options: any): Promise<Schedule> {
		return await this.scheduleRepository.findOne({
			where: { ...options },
			include: { all: true },
		});
	}

	public async create(scheduleDto: ScheduleDto): Promise<Schedule> {
		const schedule = await this.scheduleRepository.create(scheduleDto);

		return schedule;
	}

	public async update(id: number, scheduleDto: ScheduleDto): Promise<Schedule> {
		await this.scheduleRepository.update(scheduleDto, { where: { id } });

		return await this.findBy({ id: id });
	}

	public async delete(id: string): Promise<any> {
		return await this.scheduleRepository.destroy({ where: { id } });
	}
}
