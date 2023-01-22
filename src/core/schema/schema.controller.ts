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

import { SchemaDto } from './dto/schema.dto';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
	constructor(readonly schemaService: SchemaService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const schemas = await this.schemaService.findBy({});

		res.status(HttpStatus.OK).send(schemas);
	}

	@Post()
	async create(@Body() schemaDto: SchemaDto, @Res() res: Response) {
		const schema = await this.schemaService.create(schemaDto);

		res
			.status(HttpStatus.OK)
			.send({ message: 'Schema created successfully', schema });
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() schemaDto: SchemaDto,
		@Res() res: Response,
	) {
		const updatedSchema = await this.schemaService.update(id, schemaDto);

		res
			.status(HttpStatus.OK)
			.send({ message: 'Schema updated successfully', updatedSchema });
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		await this.schemaService.delete(id);

		res.status(HttpStatus.OK).send({ message: 'Schema deleted successfully' });
	}
}
