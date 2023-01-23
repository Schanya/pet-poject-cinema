import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Res,
} from '@nestjs/common';
import { Response } from 'express';

import { ScheduleDto } from '../dto/schedule.dto';
import { ScheduleService } from '../services/schedule.service';

@Controller('schedule')
export class ScheduleController {
	constructor(readonly scheduleService: ScheduleService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const schedules = await this.scheduleService.findAll({});

		res.status(HttpStatus.OK).send(schedules);
	}

	@Post()
	async create(@Body() scheduleDto: ScheduleDto, @Res() res: Response) {
		const schedule = await this.scheduleService.create(scheduleDto);

		res
			.status(HttpStatus.OK)
			.send({ mesage: `Schedule created successfully`, schedule });
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() scheduleDto: ScheduleDto,
		@Res() res: Response,
	) {
		const updatedSchedule = await this.scheduleService.update(id, scheduleDto);

		res
			.status(HttpStatus.OK)
			.send({ mesage: `Schedule updated successfully`, updatedSchedule });
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		await this.scheduleService.delete(id);

		res.status(HttpStatus.OK).send({ mesage: `Schedule deleted successfully` });
	}
}
