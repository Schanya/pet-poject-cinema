import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ScheduleDto, ScheduleOptions } from '../presentation/schedule.dto';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectModel(Schedule) private scheduleRepository: typeof Schedule,
	) {}

	public async findAll(options: ScheduleOptions): Promise<Schedule[]> {
		const suitableSchedules = await this.scheduleRepository.findAll({
			where: { ...options },
			include: { all: true },
		});

		return suitableSchedules;
	}

	public async findBy(options: ScheduleOptions): Promise<Schedule> {
		const suitableSchedule = await this.scheduleRepository.findOne({
			where: { ...options },
			include: { all: true },
		});

		return suitableSchedule;
	}

	public async create(scheduleDto: ScheduleDto): Promise<Schedule> {
		const existingDateInSchedule = await this.findBy({
			date: scheduleDto.date,
		});

		if (existingDateInSchedule) {
			throw new BadRequestException('Such date in schedule has already exist');
		}

		const createdSchedule = await this.scheduleRepository.create(scheduleDto);

		return createdSchedule;
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

		const updatedSchedule = await this.findBy({ id: id });

		return updatedSchedule;
	}

	public async delete(id: string): Promise<number> {
		const numberOfDeletedRows = await this.scheduleRepository.destroy({
			where: { id },
		});

		return numberOfDeletedRows;
	}
}
