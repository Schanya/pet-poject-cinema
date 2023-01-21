import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { ScheduleDto } from './dto/schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
	constructor(readonly scheduleService: ScheduleService) {}

	@Get()
	async getAll() {
		return await this.scheduleService.findBy({});
	}

	@Post()
	async create(@Body() scheduleDto: ScheduleDto) {
		return await this.scheduleService.create(scheduleDto);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() scheduleDto: ScheduleDto) {
		return await this.scheduleService.update(id, scheduleDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.scheduleService.delete(id);
	}
}
