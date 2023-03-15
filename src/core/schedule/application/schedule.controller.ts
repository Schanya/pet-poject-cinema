import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ReadAllResult } from 'src/common/types/read-all-result.type';
import { Schedule } from '../domain/schedule.entity';

import { ScheduleService } from '../domain/schedule.service';
import { ScheduleDto } from '../presentation/schedule.dto';

@Controller('schedule')
export class ScheduleController {
	constructor(readonly scheduleService: ScheduleService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<ReadAllResult<Schedule>> {
		const schedules = await this.scheduleService.findAll({});

		return {
			totalRecordsNumber: schedules.totalRecordsNumber,
			entities: schedules.entities,
		};
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() scheduleDto: ScheduleDto) {
		const schedule = await this.scheduleService.create(scheduleDto);

		return schedule;
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(@Param('id') id: number, @Body() scheduleDto: ScheduleDto) {
		const updatedSchedule = await this.scheduleService.update(id, scheduleDto);

		return updatedSchedule;
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		await this.scheduleService.delete(id);

		return `Schedule deleted successfully`;
	}
}
