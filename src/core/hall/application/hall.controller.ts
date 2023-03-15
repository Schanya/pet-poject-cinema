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
import { Hall } from '../domain/hall.entity';

import { HallService } from '../domain/hall.service';
import { HallDto } from '../presentation/hall.dto';

@Controller('hall')
export class HallController {
	constructor(readonly hallService: HallService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<ReadAllResult<Hall>> {
		const halls = await this.hallService.findAll({});

		return {
			totalRecordsNumber: halls.totalRecordsNumber,
			entities: halls.entities,
		};
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() hallDto: HallDto) {
		const hall = await this.hallService.create(hallDto);

		return hall;
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(@Param('id') id: number, @Body() hallDto: HallDto) {
		const editedHall = await this.hallService.update(id, hallDto);

		return editedHall;
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		await this.hallService.delete(id);

		return `Hall deleted successfully`;
	}
}
