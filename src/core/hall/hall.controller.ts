import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { HallDto } from './dto/hall.dto';
import { HallService } from './hall.service';

@Controller('hall')
export class HallController {
	constructor(readonly hallService: HallService) {}

	@Get()
	async getAll() {
		return await this.hallService.findBy({});
	}

	@Post()
	async create(@Body() hallDto: HallDto) {
		return await this.hallService.create(hallDto);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() hallDto: HallDto) {
		return await this.hallService.update(id, hallDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.hallService.delete(id);
	}
}
