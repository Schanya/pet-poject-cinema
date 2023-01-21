import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { SchemaDto } from './dto/schema.dto';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
	constructor(readonly schemaService: SchemaService) {}

	@Get()
	async getAll() {
		return await this.schemaService.findBy({});
	}

	@Post()
	async create(@Body() schemaDto: SchemaDto) {
		return await this.schemaService.create(schemaDto);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() schemaDto: SchemaDto) {
		return await this.schemaService.update(id, schemaDto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.schemaService.delete(id);
	}
}
