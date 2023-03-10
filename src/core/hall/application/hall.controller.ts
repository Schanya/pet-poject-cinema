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

import { HallService } from '../domain/hall.service';
import { HallDto } from '../presentation/hall.dto';

@Controller('hall')
export class HallController {
	constructor(readonly hallService: HallService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const halls = await this.hallService.findAll({});

		res.status(HttpStatus.OK).send(halls);
	}

	@Post()
	async create(@Body() hallDto: HallDto, @Res() res: Response) {
		const hall = await this.hallService.create(hallDto);

		res.status(HttpStatus.OK).send(`Hall ${hall.name} created successfully`);
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() hallDto: HallDto,
		@Res() res: Response,
	) {
		const editedHall = await this.hallService.update(id, hallDto);

		res
			.status(HttpStatus.OK)
			.send(`Hall ${editedHall.name} updated successfully`);
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		await this.hallService.delete(id);

		res.status(HttpStatus.OK).send(`Hall deleted successfully`);
	}
}
